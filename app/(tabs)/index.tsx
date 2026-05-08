import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { Bell, Image as ImageIcon } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
     SafeAreaView,
     ScrollView,
     StyleSheet,
     Text,
     TouchableOpacity,
     View,
} from "react-native";
import { BalanceCard } from "../_components/BalanceCard";
import { ParkingStatusCard } from "../_components/ParkingStatusCard";
import { SlotAvailabilityBar } from "../_components/SlotAvailabilityBar";
import { VirtualKeyToggle } from "../_components/VirtualKeyToggle";
import {
     Colors,
     Radius,
     Shadows,
     Spacing,
     Typography,
} from "../_constants/theme";
import { useAuthContext } from "../_hooks/use-auth-context";
import { useStore } from "../_store/useStore";

type HomeDashboardProps = {
     activePark: any | null;
};

export default function HomeDashboard() {
     const { profile } = useAuthContext();
     const router = useRouter();

     const [activePark, setActivePark] = useState<any | null>();
     const [refresh, setRefresh] = useState(0);

     useEffect(() => {
          async function fetchData() {
               const { data, error } = await supabase
                    .from("active_transaction")
                    .select();

               setActivePark(data != null ? data[0] : null);
          }

          fetchData();
     }, [refresh]);

     const {
          user,
          virtualKeyLocked,
          setVirtualKeyLocked,
          activeParking,
          slotAvailability,
     } = useStore();

     const formattedDate = new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
     });

     return (
          <ScrollView style={styles.container} bounces={false}>
               {/* Navy Header Section */}
               <View style={styles.headerBackground}>
                    <SafeAreaView>
                         <View style={styles.headerContent}>
                              <View>
                                   <Text style={styles.greeting}>
                                        Selamat datang, {profile?.nama ?? ""}
                                   </Text>
                                   <Text style={styles.date}>
                                        {formattedDate}
                                   </Text>
                              </View>
                              <TouchableOpacity
                                   onPress={() => router.push("/notifications")}
                                   style={styles.notificationBtn}
                              >
                                   <Bell color={Colors.surface} size={24} />
                                   <View style={styles.notificationDot} />
                              </TouchableOpacity>
                         </View>
                    </SafeAreaView>
               </View>

               <View style={styles.content}>
                    {/* Balance Card overlaps the header slightly */}
                    <View style={styles.overlapCard}>
                         <BalanceCard balance={user.balance} />
                    </View>

                    {/* Virtual Key Toggle Card */}
                    <View style={styles.virtualKeyCard}>
                         <Text style={styles.sectionTitle}>Virtual Key</Text>
                         <View style={styles.virtualKeyContent}>
                              <VirtualKeyToggle
                                   isLocked={virtualKeyLocked}
                                   onToggle={() =>
                                        setVirtualKeyLocked(!virtualKeyLocked)
                                   }
                              />
                              <View style={styles.virtualKeyText}>
                                   <Text style={styles.vkTitle}>
                                        Akses Gerbang
                                   </Text>
                                   <Text style={styles.vkDesc}>
                                        {virtualKeyLocked
                                             ? "Ketuk untuk membuka gerbang."
                                             : "Gerbang dapat dilalui."}
                                   </Text>
                              </View>
                         </View>
                    </View>

                    {/* Active Parking Section */}
                    <View style={styles.section}>
                         <Text style={styles.sectionTitle}>Parkir Aktif</Text>
                         {activePark ? (
                              <ParkingStatusCard activePark={activePark} />
                         ) : (
                              <View style={styles.emptyState}>
                                   <ImageIcon
                                        color={Colors.textMuted}
                                        size={48}
                                   />
                                   <Text style={styles.emptyStateText}>
                                        Belum ada parkir aktif
                                   </Text>
                                   <TouchableOpacity
                                        onPress={() =>
                                             setRefresh((r) => (r + 1) % 10)
                                        }
                                        style={{ marginTop: 10 }}
                                   >
                                        <Text
                                             style={{
                                                  ...Typography.caption,
                                                  color: Colors.secondary,
                                             }}
                                        >
                                             Refresh
                                        </Text>
                                   </TouchableOpacity>
                              </View>
                         )}
                    </View>

                    {/* Slot Availability Section */}
                    <View style={styles.section}>
                         <Text style={styles.sectionTitle}>
                              Ketersediaan Slot
                         </Text>
                         <View style={styles.slotCard}>
                              <SlotAvailabilityBar
                                   zoneName="Parkir Barat"
                                   percentage={slotAvailability.west}
                              />
                              <SlotAvailabilityBar
                                   zoneName="Parkir Timur"
                                   percentage={slotAvailability.east}
                              />
                              <SlotAvailabilityBar
                                   zoneName="Parkir Selatan"
                                   percentage={slotAvailability.south}
                              />
                         </View>
                    </View>
               </View>
          </ScrollView>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.background,
     },
     headerBackground: {
          backgroundColor: Colors.primary,
          paddingBottom: 60, // Space for overlap
          paddingTop: 40,
     },
     headerContent: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: Spacing.xl,
          paddingTop: Spacing.m,
     },
     greeting: {
          ...Typography.h2,
          color: Colors.surface,
          marginBottom: 4,
     },
     date: {
          ...Typography.caption,
          color: "rgba(255,255,255,0.8)",
     },
     notificationBtn: {
          position: "relative",
          padding: Spacing.xs,
     },
     notificationDot: {
          position: "absolute",
          top: 4,
          right: 4,
          width: 8,
          height: 8,
          backgroundColor: Colors.error,
          borderRadius: Radius.full,
          borderWidth: 1,
          borderColor: Colors.primary,
     },
     content: {
          paddingHorizontal: Spacing.xl,
     },
     overlapCard: {
          marginTop: -40,
          marginBottom: Spacing.xl,
     },
     section: {
          marginBottom: Spacing.xl,
     },
     sectionTitle: {
          ...Typography.h2,
          marginBottom: Spacing.m,
     },
     virtualKeyCard: {
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
          padding: Spacing.m,
          marginBottom: Spacing.xl,
          ...Shadows.soft,
     },
     virtualKeyContent: {
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.l,
          marginTop: Spacing.xs,
     },
     virtualKeyText: {
          flex: 1,
     },
     vkTitle: {
          ...Typography.body,
          fontWeight: "600",
          marginBottom: 4,
     },
     vkDesc: {
          ...Typography.caption,
     },
     emptyState: {
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
          padding: Spacing.xl,
          alignItems: "center",
          justifyContent: "center",
          borderStyle: "dashed",
          borderWidth: 1,
          borderColor: Colors.divider,
     },
     emptyStateText: {
          ...Typography.body,
          color: Colors.textMuted,
          marginTop: Spacing.m,
     },
     slotCard: {
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
          padding: Spacing.m,
          ...Shadows.soft,
     },
});
