import {
     Inter_400Regular,
     Inter_600SemiBold,
     Inter_700Bold,
     useFonts,
} from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useAuthContext } from "@/hooks/use-auth-context";
import AuthProvider from "@/providers/auth-provider";

// Prevent auto hide
SplashScreen.preventAutoHideAsync();

export function RootLayout() {
     const { isLoggedIn } = useAuthContext();

     const [loaded] = useFonts({
          "Inter-Regular": Inter_400Regular,
          "Inter-SemiBold": Inter_600SemiBold,
          "Inter-Bold": Inter_700Bold,
     });

     useEffect(() => {
          if (loaded) {
               SplashScreen.hideAsync();
          }
     }, [loaded]);

     if (!loaded) {
          return null;
     }

     return (
          <Stack screenOptions={{ headerShown: false }}>
               {/* Index screen is always accessible - it handles its own auth redirects */}
               <Stack.Screen name="index" />

               {/* Protected screens - only accessible when logged in */}
               <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen
                         name="payment"
                         options={{ presentation: "modal" }}
                    />
                    <Stack.Screen
                         name="virtual-key"
                         options={{ presentation: "modal" }}
                    />
                    <Stack.Screen name="membership" />
                    <Stack.Screen name="extend-membership" />
                    <Stack.Screen
                         name="top-up"
                         options={{ presentation: "modal" }}
                    />
                    <Stack.Screen name="notifications" />
                    <Stack.Screen name="vehicles" />
                    <Stack.Screen name="payment-methods" />
               </Stack.Protected>

               {/* Auth screens - only accessible when NOT logged in */}
               <Stack.Protected guard={!isLoggedIn}>
                    <Stack.Screen name="(auth)/login" />
                    <Stack.Screen name="(auth)/register" />
               </Stack.Protected>
          </Stack>
     );
}

export default function RootFR() {
     return (
          <AuthProvider>
               <RootLayout />
          </AuthProvider>
     );
}
