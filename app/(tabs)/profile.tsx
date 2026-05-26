import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import {
     Award,
     Car,
     ChevronRight,
     CreditCard,
     HelpCircle,
     Info,
     Shield,
} from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
     SafeAreaView,
     ScrollView,
     StyleSheet,
     Text,
     TouchableOpacity,
     View,
} from "react-native";
import { Colors, Radius, Spacing, Typography } from "../_constants/theme";
import { useAuthContext } from "../_hooks/use-auth-context";

const MENU_ITEMS = [
     {
          icon: <Car size={20} color={Colors.textDark} />,
          title: "Kendaraan Saya",
          id: "vehicles",
     },
     {
          icon: <CreditCard size={20} color={Colors.textDark} />,
          title: "Metode Pembayaran",
          id: "payment",
     },
     {
          icon: <Shield size={20} color={Colors.textDark} />,
          title: "Keamanan",
          id: "security",
     },
     {
          icon: <HelpCircle size={20} color={Colors.textDark} />,
          title: "Bantuan",
          id: "help",
     },
     {
          icon: <Info size={20} color={Colors.textDark} />,
          title: "Tentang Aplikasi",
          id: "about",
     },
     {
          icon: <Award size={20} color={Colors.textDark} />,
          title: "Membership",
          id: 'membership'
     }
];

export default function ProfileScreen() {
     const router = useRouter();
     const { profile } = useAuthContext();

     const [plates, setPlates] = useState<any[]>([]);

     useEffect(() => {
          const fetchPlates = async () => {
               const { data, error } = await supabase.from("vehicles").select();

               if (error) {
                    console.log(error.toJSON());
               }

               console.log(
                    "With the marrow of three tungs in my hand, behold the sahur falls.",
               );
               console.log(data);
               setPlates(data ?? []);
          };

          fetchPlates();
     }, []);

     // const { user } = useStore();

     const getInitials = (name: string) => {
          return name.substring(0, 2).toUpperCase();
     };

     const handleLogout = async () => {
          // Basic mock logout
          const { error } = await supabase.auth.signOut();

          if (error) {
               console.error("Error signing out:", error);
          }

          // router.replace('/(auth)/login');
     };

     return (
          <SafeAreaView style={styles.container}>
               <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                         <Text style={styles.headerTitle}>Profil Saya</Text>
                    </View>

                    <View style={styles.profileSection}>
                         <View style={styles.avatar}>
                              <Text style={styles.avatarText}>
                                   {getInitials(profile?.nama ?? "")}
                              </Text>
                         </View>
                         <Text style={styles.name}>{profile?.nama ?? ""}</Text>
                         {/* <Text style={styles.studentId}>{user.studentId}</Text> */}

                         <View style={styles.platesContainer}>
                              {plates.map((plate) => (
                                   <View key={plate} style={styles.plateChip}>
                                        <Text style={styles.plateText}>
                                             {plate.plat_nomor}
                                        </Text>
                                   </View>
                              ))}
                         </View>
                    </View>

                    <View style={styles.menuSection}>
                         {MENU_ITEMS.map((item, index) => (
                              <TouchableOpacity
                                   key={item.id}
                                   style={styles.menuItem}
                                   onPress={() => {
                                        if (item.id === "vehicles") {
                                             router.push("/vehicles");
                                        } else if (item.id === "payment") {
                                             router.push("/payment-methods");
                                        } else if (item.id === "membership") {
                                             router.push("/membership");
                                        } else {
                                             router.push(`/${item.id}` as any);
                                        }
                                   }}
                              >
                                   <View style={styles.menuLeft}>
                                        {item.icon}
                                        <Text style={styles.menuTitle}>
                                             {item.title}
                                        </Text>
                                   </View>
                                   <ChevronRight
                                        color={Colors.textMuted}
                                        size={20}
                                   />
                              </TouchableOpacity>
                         ))}
                    </View>

                    <TouchableOpacity
                         style={styles.logoutButton}
                         onPress={handleLogout}
                    >
                         <Text style={styles.logoutText}>Keluar</Text>
                    </TouchableOpacity>
               </ScrollView>
          </SafeAreaView>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.background,
     },
     scrollContent: {
          padding: Spacing.xl,
          paddingBottom: 100,
     },
     header: {
          marginBottom: Spacing.xl,
     },
     headerTitle: {
          ...Typography.h1,
     },
     profileSection: {
          alignItems: "center",
          marginBottom: Spacing.xxl,
     },
     avatar: {
          width: 80,
          height: 80,
          borderRadius: Radius.full,
          backgroundColor: Colors.primary,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: Spacing.m,
     },
     avatarText: {
          ...Typography.h1,
          color: Colors.surface,
          fontSize: 32,
     },
     name: {
          ...Typography.h2,
          marginBottom: 4,
     },
     studentId: {
          ...Typography.body,
          color: Colors.textMuted,
          marginBottom: Spacing.m,
     },
     platesContainer: {
          flexDirection: "row",
          gap: Spacing.s,
          flexWrap: "wrap",
          justifyContent: "center",
     },
     plateChip: {
          backgroundColor: "rgba(45, 125, 210, 0.1)",
          paddingHorizontal: Spacing.m,
          paddingVertical: Spacing.xs,
          borderRadius: Radius.full,
          borderWidth: 1,
          borderColor: "rgba(45, 125, 210, 0.2)",
     },
     plateText: {
          ...Typography.caption,
          color: Colors.secondary,
          fontWeight: "600",
     },
     menuSection: {
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
          overflow: "hidden",
          marginBottom: Spacing.xl,
     },
     menuItem: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: Spacing.m,
          borderBottomWidth: 1,
          borderBottomColor: Colors.divider,
     },
     menuLeft: {
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.m,
     },
     menuTitle: {
          ...Typography.body,
          fontWeight: "500",
     },
     logoutButton: {
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
          padding: Spacing.m,
          alignItems: "center",
     },
     logoutText: {
          ...Typography.button,
          color: Colors.error,
     },
});
