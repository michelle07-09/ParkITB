import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors, Radius, Spacing, Typography } from "@/constants/theme";

export default function LoginScreen() {
     const router = useRouter();
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const showAlert = (title: string, message: string, buttons?: any[]) => {
          if (Platform.OS === "web") {
               alert(`${title}: ${message}`);
               if (buttons && buttons.length > 0) {
                    const defaultBtn = buttons.find((b: any) => b.style === "default") || buttons[0];
                    if (defaultBtn && defaultBtn.onPress) {
                         defaultBtn.onPress();
                    }
               }
          } else {
               Alert.alert(title, message, buttons);
          }
     };

     const handleLogin = async () => {
          console.log("dagv");

          const validateEmail = (email: string) => {
               return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          };

          // Validate inputs
          if (!email.trim()) {
               showAlert("Error", "Email tidak boleh kosong");
               return;
          }
          if (!validateEmail(email)) {
               showAlert("Error", "Format email tidak valid");
               return;
          }
          if (!password.trim()) {
               showAlert("Error", "Password tidak boleh kosong");
               return;
          }
          if (password.length < 8) {
               showAlert("Error", "Password minimal 8 karakter");
               return;
          }

          // Basic authentication
          const { data, error } = await supabase.auth.signInWithPassword({
               email: email,
               password: password,
          });

          if (error) {
               showAlert("Login Gagal", error.message);
          } else {
               router.replace("/(tabs)");
          }
     };

     return (
          <SafeAreaView style={styles.container}>
               <KeyboardAvoidingView
                    style={styles.keyboardView}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
               >
                    <View style={styles.content}>
                         <View style={styles.header}>
                              <MapPin color={Colors.primary} size={48} />
                              <Text style={styles.title}>Masuk ke ParkITB</Text>
                              <Text style={styles.subtitle}>
                                   Gunakan email kampus Anda
                              </Text>
                         </View>

                         <View style={styles.form}>
                              <View style={styles.inputContainer}>
                                   <Text style={styles.label}>Email</Text>
                                   <TextInput
                                        style={styles.input}
                                        placeholder="email@students.itb.ac.id"
                                        placeholderTextColor={Colors.textMuted}
                                        value={email}
                                        onChangeText={setEmail}
                                        autoCapitalize="none"
                                        keyboardType="email-address"
                                   />
                              </View>

                              <View style={styles.inputContainer}>
                                   <Text style={styles.label}>Password</Text>
                                   <TextInput
                                        style={styles.input}
                                        placeholder="••••••••"
                                        placeholderTextColor={Colors.textMuted}
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                   />
                              </View>

                              <TouchableOpacity style={styles.forgotPassword}>
                                   <Text style={styles.forgotPasswordText}>
                                        Lupa Password?
                                   </Text>
                              </TouchableOpacity>

                              <TouchableOpacity
                                   style={styles.loginButton}
                                   onPress={handleLogin}
                              >
                                   <Text style={styles.loginButtonText}>
                                        Masuk
                                   </Text>
                              </TouchableOpacity>

                              <View style={styles.dividerContainer}>
                                   <View style={styles.divider} />
                                   <Text style={styles.dividerText}>atau</Text>
                                   <View style={styles.divider} />
                              </View>

                              <View style={styles.registerContainer}>
                                   <Text style={styles.registerText}>
                                        Belum punya akun?{" "}
                                   </Text>
                                   <TouchableOpacity
                                        onPress={() =>
                                             router.push("/(auth)/register")
                                        }
                                   >
                                        <Text style={styles.registerLink}>
                                             Daftar sekarang
                                        </Text>
                                   </TouchableOpacity>
                              </View>
                         </View>
                    </View>
               </KeyboardAvoidingView>
          </SafeAreaView>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.background,
     },
     keyboardView: {
          flex: 1,
     },
     content: {
          flex: 1,
          padding: Spacing.xl,
          justifyContent: "center",
     },
     header: {
          alignItems: "center",
          marginBottom: Spacing.xxl,
     },
     title: {
          ...Typography.h1,
          marginTop: Spacing.m,
          marginBottom: Spacing.xs,
     },
     subtitle: {
          ...Typography.body,
          color: Colors.textMuted,
     },
     form: {
          gap: Spacing.m,
     },
     inputContainer: {
          gap: Spacing.xs,
     },
     label: {
          ...Typography.caption,
          color: Colors.textDark,
          fontWeight: "600",
     },
     input: {
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: Colors.divider,
          borderRadius: Radius.input,
          padding: Spacing.m,
          ...Typography.body,
     },
     forgotPassword: {
          alignSelf: "flex-end",
     },
     forgotPasswordText: {
          ...Typography.caption,
          color: Colors.secondary,
          fontWeight: "600",
     },
     loginButton: {
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.m,
          borderRadius: Radius.full,
          alignItems: "center",
          marginTop: Spacing.m,
     },
     loginButtonDisabled: {
          opacity: 0.6,
     },
     loginButtonText: {
          ...Typography.button,
     },
     dividerContainer: {
          flexDirection: "row",
          alignItems: "center",
          marginVertical: Spacing.l,
     },
     divider: {
          flex: 1,
          height: 1,
          backgroundColor: Colors.divider,
     },
     dividerText: {
          ...Typography.caption,
          color: Colors.textMuted,
          paddingHorizontal: Spacing.m,
     },
     registerContainer: {
          flexDirection: "row",
          justifyContent: "center",
     },
     registerText: {
          ...Typography.body,
          color: Colors.textMuted,
     },
     registerLink: {
          ...Typography.body,
          color: Colors.secondary,
          fontWeight: "600",
     },
});
