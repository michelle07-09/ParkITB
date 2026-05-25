import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";
import "react-native-url-polyfill/auto";
import { Database } from "./park-type";

const supabaseUrl = "https://xfrsjvaewbcukazxcwvv.supabase.co";
const supabasePublishableKey = "sb_publishable_P3Wzj3G_5kEyhMlEUrosCQ_5mi_wINe";

export const supabase = createClient<Database>(supabaseUrl, supabasePublishableKey, {
     auth: {
          ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
          lock: processLock,
     },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
if (Platform.OS !== "web") {
     AppState.addEventListener("change", (state) => {
          if (state === "active") {
               supabase.auth.startAutoRefresh();
          } else {
               supabase.auth.stopAutoRefresh();
          }
     });
}
