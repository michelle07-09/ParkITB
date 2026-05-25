import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import {
     Bike,
     Car,
     Eye,
     EyeOff,
     Lock,
     Mail,
     MapPin,
     PinIcon,
     User,
} from "lucide-react-native";
import React, { useState } from "react";
import {
     Alert,
     KeyboardAvoidingView,
     Platform,
     SafeAreaView,
     ScrollView,
     StyleSheet,
     Text,
     TextInput,
     TouchableOpacity,
     View,
} from "react-native";
import { Colors, Radius, Spacing, Typography } from "@/constants/theme";
import { useStore } from "@/store/useStore";

export default function RegisterScreen() {
     const router = useRouter();
     const { setUser, addPlate } = useStore();
     const [fullName, setFullName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");
     const [vehiclePlate, setVehiclePlate] = useState("");
     const [vehicleType, setVehicleType] = useState("motor"); // 'car' or 'bike'
     const [showPassword, setShowPassword] = useState(false);
     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
     const [loading, setLoading] = useState(false);

     const isAlphaNumeric = (text: string) => {
          let i;
          for (i = text.length - 1; i >= 0; --i) {
               const code = text.charCodeAt(i);
               if (
                    !(code > 47 && code < 58) &&
                    !(code > 64 && code < 91) &&
                    !(code > 96 && code < 123)
               ) {
                    return false;
               }
          }

          return true;
     };

     const isNumber = (char: string) => {
          if (!char) return false;
          const code = char.charCodeAt(0);
          return code > 47 && code < 58;
     };

     const isAlpha = (char: string) => {
          if (!char) return false;
          const code = char.charCodeAt(0);
          return (code > 64 && code < 91) || (code > 96 && code < 123);
     };

     const isPlatNomor = (text: string) => {
          if (!text) return false;

          let hcount = 0;
          let mcount = 0;
          let tcount = 0;

          let i;
          for (i = 0; i < text.length; ++i) {
               if (!isAlpha(text.charAt(i))) break;
               hcount++;
          }

          if (hcount === 0 || hcount > 2) return false;

          for (; i < text.length; ++i) {
               if (!isNumber(text.charAt(i))) break;
               mcount++;
          }

          if (mcount === 0 || mcount > 4) return false;

          for (; i < text.length; ++i) {
               if (!isAlpha(text.charAt(i))) break;
               tcount++;
          }

          if (tcount === 0 || tcount > 3) return false;

          return hcount + mcount + tcount === text.length;
     };

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

     const validateForm = () => {
          if (!fullName.trim()) {
               showAlert(
                    "Validation Error",
                    "Nama lengkap tidak boleh kosong",
               );
               return false;
          }
          if (!email.trim() || !email.includes("@")) {
               showAlert("Validation Error", "Email tidak valid");
               return false;
          }
          if (password.length < 8) {
               showAlert("Validation Error", "Password minimal 8 karakter");
               return false;
          }
          if (password !== confirmPassword) {
               showAlert("Validation Error", "Password tidak cocok");
               return false;
          }
          if (!vehiclePlate.trim()) {
               showAlert(
                    "Validation Error",
                    "Nomor plat kendaraan tidak boleh kosong",
               );
               return false;
          }

          if (!isPlatNomor(vehiclePlate)) {
               showAlert("Validation Error", "Plat Nomor tidak valid");
               return false;
          }
          return true;
     };

     const handleRegister = async () => {
          if (!validateForm()) return;

          setLoading(true);

          console.log(`tipe_kendaraan: ${vehicleType}`);

          const { data, error } = await supabase.auth.signUp({
               email: email,
               password: password,
               options: {
                    data: {
                         nama: fullName,
                         plat_nomor: vehiclePlate,
                         tipe_kendaraan: vehicleType,
                    },
               },
          });

          if (error) {
               setLoading(false);
               console.log(error.toJSON());
               return showAlert("Sign up error", error.message);
          }

          setLoading(false);

          // Save user data to store
          const newPlate = vehiclePlate.toUpperCase().trim();
          setUser({
               name: fullName,
          });

          // Check if plate doesn't already exist before adding
          const userState = useStore.getState();
          if (!userState.user.plates.includes(newPlate)) {
               addPlate(newPlate);
          }

          // Show success message and navigate to home tabs
          showAlert(
               "Pendaftaran Berhasil!",
               "Akun Anda telah dibuat. Selamat menggunakan ParkITB!",
               [
                    {
                         text: "Mulai Sekarang",
                         onPress: () => router.replace("/(tabs)"),
                         style: "default",
                    },
               ],
          );
     };

     return (
          <SafeAreaView style={styles.container}>
               <KeyboardAvoidingView
                    style={styles.keyboardView}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
               >
                    <ScrollView
                         contentContainerStyle={styles.scrollContent}
                         showsVerticalScrollIndicator={false}
                    >
                         <View style={styles.header}>
                              <MapPin color={Colors.primary} size={48} style={{ marginBottom: Spacing.s }} />
                              <Text style={styles.appTitle}>ParkITB</Text>
                              <Text style={styles.appSubtitle}>
                                   Sistem Parkir Institusi Terpadu
                              </Text>
                         </View>

                         <View style={styles.titleSection}>
                              <Text style={styles.mainTitle}>
                                   Daftar Akun Baru
                              </Text>
                              <Text style={styles.subtitle}>
                                   Lengkapi data diri Anda untuk mulai
                                   menggunakan ParkITB.
                              </Text>
                         </View>

                         <View style={styles.form}>
                              {/* Full Name Input */}
                              <View style={styles.inputContainer}>
                                   <Text style={styles.label}>
                                        Nama Lengkap
                                   </Text>
                                   <View style={styles.inputWrapper}>
                                        <User
                                             size={20}
                                             color={Colors.textMuted}
                                             style={styles.inputIcon}
                                        />
                                        <TextInput
                                             style={styles.input}
                                             placeholder="Contoh: Ganesha Putera"
                                             placeholderTextColor={
                                                  Colors.textMuted
                                             }
                                             value={fullName}
                                             onChangeText={setFullName}
                                             editable={!loading}
                                        />
                                   </View>
                              </View>

                              {/* Email Input */}
                              <View style={styles.inputContainer}>
                                   <Text style={styles.label}>
                                        Alamat Email
                                   </Text>
                                   <View style={styles.inputWrapper}>
                                        <Mail
                                             size={20}
                                             color={Colors.textMuted}
                                             style={styles.inputIcon}
                                        />
                                        <TextInput
                                             style={styles.input}
                                             placeholder="ganesha@itb.ac.id"
                                             placeholderTextColor={
                                                  Colors.textMuted
                                             }
                                             value={email}
                                             onChangeText={setEmail}
                                             keyboardType="email-address"
                                             autoCapitalize="none"
                                             editable={!loading}
                                        />
                                   </View>
                              </View>

                              {/* Password Input */}
                              <View style={styles.inputContainer}>
                                   <Text style={styles.label}>Kata Sandi</Text>
                                   <View style={styles.inputWrapper}>
                                        <Lock
                                             size={20}
                                             color={Colors.textMuted}
                                             style={styles.inputIcon}
                                        />
                                        <TextInput
                                             style={styles.input}
                                             placeholder="Min. 8 karakter"
                                             placeholderTextColor={
                                                  Colors.textMuted
                                             }
                                             value={password}
                                             onChangeText={setPassword}
                                             secureTextEntry={!showPassword}
                                             editable={!loading}
                                        />
                                        <TouchableOpacity
                                             style={styles.passwordToggle}
                                             onPress={() =>
                                                  setShowPassword(!showPassword)
                                             }
                                             disabled={loading}
                                        >
                                             {showPassword ? (
                                                  <EyeOff
                                                       size={20}
                                                       color={Colors.textMuted}
                                                  />
                                             ) : (
                                                  <Eye
                                                       size={20}
                                                       color={Colors.textMuted}
                                                  />
                                             )}
                                        </TouchableOpacity>
                                   </View>
                              </View>

                              {/* Confirm Password Input */}
                              <View style={styles.inputContainer}>
                                   <Text style={styles.label}>
                                        Konfirmasi Kata Sandi
                                   </Text>
                                   <View style={styles.inputWrapper}>
                                        <Lock
                                             size={20}
                                             color={Colors.textMuted}
                                             style={styles.inputIcon}
                                        />
                                        <TextInput
                                             style={styles.input}
                                             placeholder="Ulangi kata sandi"
                                             placeholderTextColor={
                                                  Colors.textMuted
                                             }
                                             value={confirmPassword}
                                             onChangeText={setConfirmPassword}
                                             secureTextEntry={
                                                  !showConfirmPassword
                                             }
                                             editable={!loading}
                                        />
                                        <TouchableOpacity
                                             style={styles.passwordToggle}
                                             onPress={() =>
                                                  setShowConfirmPassword(
                                                       !showConfirmPassword,
                                                  )
                                             }
                                             disabled={loading}
                                        >
                                             {showConfirmPassword ? (
                                                  <EyeOff
                                                       size={20}
                                                       color={Colors.textMuted}
                                                  />
                                             ) : (
                                                  <Eye
                                                       size={20}
                                                       color={Colors.textMuted}
                                                  />
                                             )}
                                        </TouchableOpacity>
                                   </View>
                              </View>

                              {/* Vehicle Type Toggle */}
                              <View style={styles.vehicleTypeSection}>
                                   <Text style={styles.label}>
                                        Tipe Kendaraan
                                   </Text>
                                   <View style={styles.vehicleTypeToggle}>
                                        <TouchableOpacity
                                             style={[
                                                  styles.vehicleTypeButton,
                                                  vehicleType === "mobil" &&
                                                       styles.vehicleTypeButtonActive,
                                             ]}
                                             onPress={() =>
                                                  setVehicleType("mobil")
                                             }
                                             disabled={loading}
                                        >
                                             <Car
                                                  size={18}
                                                  color={
                                                       vehicleType === "mobil"
                                                            ? Colors.primary
                                                            : Colors.textMuted
                                                  }
                                             />
                                             <Text
                                                  style={[
                                                       styles.vehicleTypeText,
                                                       vehicleType ===
                                                            "mobil" &&
                                                            styles.vehicleTypeTextActive,
                                                  ]}
                                             >
                                                  Mobil
                                             </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                             style={[
                                                  styles.vehicleTypeButton,
                                                  vehicleType === "motor" &&
                                                       styles.vehicleTypeButtonActive,
                                             ]}
                                             onPress={() =>
                                                  setVehicleType("motor")
                                             }
                                             disabled={loading}
                                        >
                                             <Bike
                                                  size={18}
                                                  color={
                                                       vehicleType === "motor"
                                                            ? Colors.primary
                                                            : Colors.textMuted
                                                  }
                                             />
                                             <Text
                                                  style={[
                                                       styles.vehicleTypeText,
                                                       vehicleType ===
                                                            "motor" &&
                                                            styles.vehicleTypeTextActive,
                                                  ]}
                                             >
                                                  Motor
                                             </Text>
                                        </TouchableOpacity>
                                   </View>
                              </View>

                              {/* Vehicle Plate Input */}
                              <View style={styles.inputContainer}>
                                   <Text style={styles.label}>
                                        Nomor Plat Kendaraan
                                   </Text>
                                   <View style={styles.inputWrapper}>
                                        <PinIcon
                                             size={20}
                                             color={Colors.textMuted}
                                             style={styles.inputIcon}
                                        />
                                        <TextInput
                                             style={[
                                                  styles.input,
                                                  styles.platInput,
                                             ]}
                                             placeholder="D 1234 ABC"
                                             placeholderTextColor={
                                                  Colors.textMuted
                                             }
                                             value={vehiclePlate}
                                             onChangeText={(text) => {
                                                  if (isAlphaNumeric(text)) {
                                                       setVehiclePlate(
                                                            text
                                                                 .trim()
                                                                 .toUpperCase(),
                                                       );
                                                  }
                                             }}
                                             maxLength={9}
                                             autoCapitalize="characters"
                                             editable={!loading}
                                        />
                                   </View>
                              </View>

                              {/* Register Button */}
                              <TouchableOpacity
                                   style={[
                                        styles.registerButton,
                                        loading &&
                                             styles.registerButtonDisabled,
                                   ]}
                                   onPress={handleRegister}
                                   disabled={loading}
                              >
                                   <Text style={styles.registerButtonText}>
                                        {loading
                                             ? "Mendaftar..."
                                             : "Daftar Sekarang"}
                                   </Text>
                              </TouchableOpacity>
                         </View>

                         {/* Footer: Login Link */}
                         <View style={styles.footer}>
                              <Text style={styles.footerText}>
                                   Sudah punya akun?{" "}
                              </Text>
                              <TouchableOpacity
                                   onPress={() =>
                                        router.replace("/(auth)/login")
                                   }
                                   disabled={loading}
                              >
                                   <Text style={styles.footerLink}>Masuk</Text>
                              </TouchableOpacity>
                         </View>
                    </ScrollView>
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
     scrollContent: {
          flexGrow: 1,
          padding: Spacing.m,
     },
     header: {
          alignItems: "center",
          marginBottom: Spacing.l,
          marginTop: Spacing.m,
     },
     headerIcon: {
          fontSize: 48,
          marginBottom: Spacing.s,
     },
     appTitle: {
          ...Typography.h1,
          marginBottom: Spacing.xs,
          color: Colors.primary,
     },
     appSubtitle: {
          ...Typography.caption,
          color: Colors.textMuted,
     },
     titleSection: {
          marginBottom: Spacing.l,
          paddingHorizontal: Spacing.s,
     },
     mainTitle: {
          ...Typography.h1,
          color: Colors.primary,
          marginBottom: Spacing.s,
          textAlign: "center",
     },
     subtitle: {
          ...Typography.body,
          color: Colors.textMuted,
          textAlign: "center",
          lineHeight: 20,
     },
     form: {
          gap: Spacing.m,
          marginBottom: Spacing.l,
     },
     inputContainer: {
          gap: Spacing.xs,
     },
     vehicleTypeSection: {
          gap: Spacing.s,
     },
     label: {
          ...Typography.caption,
          color: Colors.primary,
          fontWeight: "600",
          paddingHorizontal: Spacing.s,
     },
     inputWrapper: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.surface,
          borderRadius: Radius.input,
          borderWidth: 1,
          borderColor: Colors.divider,
          paddingHorizontal: Spacing.m,
     },
     inputIcon: {
          marginRight: Spacing.s,
     },
     input: {
          flex: 1,
          ...Typography.body,
          paddingVertical: Spacing.m,
     },
     platInput: {
          textTransform: "uppercase",
          letterSpacing: 1,
          fontWeight: "600",
     },
     passwordToggle: {
          padding: Spacing.s,
     },
     vehicleTypeToggle: {
          flexDirection: "row",
          gap: Spacing.s,
          backgroundColor: Colors.surface,
          padding: Spacing.s,
          borderRadius: Radius.input,
          borderWidth: 1,
          borderColor: Colors.divider,
     },
     vehicleTypeButton: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: Spacing.m,
          paddingHorizontal: Spacing.s,
          borderRadius: Radius.chip,
          backgroundColor: Colors.background,
          gap: Spacing.xs,
     },
     vehicleTypeButtonActive: {
          backgroundColor: Colors.primary,
     },
     vehicleTypeText: {
          ...Typography.caption,
          color: Colors.textMuted,
          fontWeight: "600",
     },
     vehicleTypeTextActive: {
          color: Colors.surface,
     },
     registerButton: {
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.l,
          borderRadius: Radius.full,
          alignItems: "center",
          justifyContent: "center",
          marginTop: Spacing.m,
     },
     registerButtonDisabled: {
          opacity: 0.6,
     },
     registerButtonText: {
          ...Typography.button,
          fontSize: 16,
          fontWeight: "700",
     },
     footer: {
          flexDirection: "row",
          justifyContent: "center",
          paddingVertical: Spacing.l,
          marginTop: Spacing.l,
          borderTopWidth: 1,
          borderTopColor: Colors.divider,
     },
     footerText: {
          ...Typography.body,
          color: Colors.textMuted,
     },
     footerLink: {
          ...Typography.body,
          color: Colors.primary,
          fontWeight: "700",
     },
});
