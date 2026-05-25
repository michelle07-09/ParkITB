import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MapPin } from "lucide-react-native";
import { Colors, Radius, Spacing, Typography } from "@/constants/theme";
import { useAuthContext } from "@/hooks/use-auth-context";

export default function SplashScreen() {
     console.log("inex");
     const router = useRouter();
     const { isLoggedIn, isLoading } = useAuthContext();

     useEffect(() => {
          if (!isLoading) {
               if (isLoggedIn) {
                    router.replace("/(tabs)");
               }
          }
     }, [isLoggedIn, isLoading]);

     if (isLoading) {
          return (
               <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
                    <ActivityIndicator size="large" color={Colors.surface} />
               </SafeAreaView>
          );
     }

     return (
          <SafeAreaView style={styles.container}>
               <View style={styles.content}>
                    <View style={styles.logoContainer}>
                         <MapPin color={Colors.accent} size={64} />
                         <Text style={styles.wordmark}>ParkITB</Text>
                    </View>
                    <Text style={styles.tagline}>Parkir cerdas, kampus lancar.</Text>
               </View>

               <View style={styles.footer}>
                    <TouchableOpacity
                         style={styles.button}
                         onPress={() => router.push("/(auth)/login")}
                    >
                         <Text style={styles.buttonText}>Mulai Sekarang</Text>
                    </TouchableOpacity>
               </View>
          </SafeAreaView>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.primary,
     },
     content: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: Spacing.xl,
     },
     logoContainer: {
          alignItems: "center",
          marginBottom: Spacing.m,
     },
     wordmark: {
          ...Typography.h1,
          color: Colors.surface,
          fontSize: 40,
          marginTop: Spacing.m,
     },
     tagline: {
          ...Typography.body,
          color: "rgba(255,255,255,0.8)",
          textAlign: "center",
          fontSize: 16,
     },
     footer: {
          padding: Spacing.xl,
          paddingBottom: Spacing.xxl,
     },
     button: {
          backgroundColor: Colors.surface,
          paddingVertical: Spacing.m,
          borderRadius: Radius.full,
          alignItems: "center",
     },
     buttonText: {
          ...Typography.button,
          color: Colors.primary,
          fontSize: 16,
     },
});
