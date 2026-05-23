import { supabase } from "@/lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { AuthContext } from "../_hooks/use-auth-context";

export default function AuthProvider({ children }: PropsWithChildren) {
     const [claims, setClaims] = useState<
          Record<string, any> | undefined | null
     >();
     const [profile, setProfile] = useState<any>();
     const [isLoading, setIsLoading] = useState<boolean>(true);
     const [activePark, setActivePark] = useState<any>();

     let profile_changes_listener = useRef<RealtimeChannel>(undefined);

     useEffect(() => {
          const fetchClaims = async () => {
               setIsLoading(true);
               const { data, error } = await supabase.auth.getClaims();
               if (error) {
                    console.error("Error fetching claims:", error);
               }
               setClaims(data?.claims ?? null);
               setIsLoading(false);
          };
          fetchClaims();

          const {
               data: { subscription },
          } = supabase.auth.onAuthStateChange(async (_event, _session) => {
               console.log("Auth state changed:", { event: _event });
               setTimeout(async () => {
                    const { data, error } = await supabase.auth.getClaims();
                    setClaims(data?.claims ?? null);
                    await supabase.realtime.setAuth();
               }, 0);
          });

          // Cleanup subscription on unmount
          return () => {
               subscription.unsubscribe();
               if (profile_changes_listener.current)
                    profile_changes_listener.current.unsubscribe();
          };
     }, []);

     useEffect(() => {
          const fetchProfile = async () => {
               setIsLoading(true);
               if (claims) {
                    const { data } = await supabase
                         .from("profiles")
                         .select("*")
                         .eq("id", claims.sub)
                         .single();
                    // console.log(data);
                    setProfile(data);

                    if (profile_changes_listener.current)
                         profile_changes_listener.current.unsubscribe();
                    profile_changes_listener.current = supabase
                         .channel(`topic:${claims.sub}`, {
                              config: { private: true },
                         })
                         .on("broadcast", { event: "UPDATE" }, (payload) => {
                              console.log(payload.payload.record);
                              if (payload.payload.record) {
                                   console.log("executed");
                                   setProfile(payload.payload.record);
                              }
                         })
                         .subscribe();
               } else {
                    if (profile_changes_listener.current)
                         profile_changes_listener.current.unsubscribe();
                    setProfile(null);
               }
               setIsLoading(false);
          };
          fetchProfile();
     }, [claims]);

     // console.log("Claims", claims);
     // console.log("Profile", profile);
     return (
          <AuthContext.Provider
               value={{
                    claims,
                    isLoading,
                    profile,
                    isLoggedIn: claims != null,
               }}
          >
               {children}
          </AuthContext.Provider>
     );
}
