import { supabase } from "@/lib/supabase";
import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "../_hooks/use-auth-context";

export default function AuthProvider({ children }: PropsWithChildren) {
     const [claims, setClaims] = useState<
          Record<string, any> | undefined | null
     >();
     const [profile, setProfile] = useState<any>();
     const [isLoading, setIsLoading] = useState<boolean>(true);

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
                    console.log("kontol");
                    setClaims(data?.claims ?? null);
               }, 0);

               // console.log(error);
               // console.log("dih", data?.claims);
          });
          // Cleanup subscription on unmount
          return () => {
               subscription.unsubscribe();
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
               } else {
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
