import { QRCodeDisplay } from "@/components/QRCodeDisplay";
import { Colors, Radius, Spacing, Typography } from "@/constants/theme";
import { useAuthContext } from "@/hooks/use-auth-context";
import { useRouter } from "expo-router";
import { Car, X } from "lucide-react-native";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function ActiveParkingScreen() {
     const router = useRouter();
     const { profile, activePark } = useAuthContext();

     // ANNOTATION: This component would typically subscribe to Supabase Realtime
     // to listen for 'parking_sessions' table updates on the current user's active session.

     if (activePark == null) {
          return (
               <SafeAreaView style={styles.container}>
                    <View style={styles.emptyState}>
                         <Car color={Colors.textMuted} size={64} />
                         <Text style={styles.emptyTitle}>
                              Tidak Ada Parkir Aktif
                         </Text>
                         <Text style={styles.emptyDesc}>
                              Anda sedang tidak berada di dalam area parkir ITB.
                         </Text>
                    </View>
               </SafeAreaView>
          );
     }

     const formatCurrency = (amount: number) => {
          return (
               "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          );
     };

     const formattedEntryTime = activePark.entry_time
          ? new Date(activePark.entry_time).toLocaleTimeString("id-ID", {
                 hour: "2-digit",
                 minute: "2-digit",
            }) + " WIB"
          : "--:--";

     console.log(formattedEntryTime);

     const now = new Date().getTime();
     const duration = (now - new Date(activePark.entry_time).getTime()) / 1000;
     const hours = Math.floor(duration / 3600);
     const minutes = Math.floor((duration % 3600) / 60);
     const seconds = Math.floor(duration % 60);
     const formattedDuration = [
          hours.toString().padStart(2, "0"),
          minutes.toString().padStart(2, "0"),
          seconds.toString().padStart(2, "0"),
     ].join(":");

     const feeHours = Math.max(1, Math.ceil(duration / 3600));
     const fee = 3000 + Math.max(0, feeHours - 1) * 2000;

     return (
          <SafeAreaView style={styles.container}>
               <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Header */}
                    <View style={styles.header}>
                         <Text style={styles.headerTitle}>
                              Tiket Parkir Digital
                         </Text>
                         <TouchableOpacity
                              onPress={() => router.push("/(tabs)")}
                         >
                              <X color={Colors.textDark} size={24} />
                         </TouchableOpacity>
                    </View>

                    {/* Plate Number Chip */}
                    <View style={styles.chipContainer}>
                         <View style={styles.plateChip}>
                              <Car color={Colors.primary} size={16} />
                              <Text style={styles.plateText}>
                                   {activePark.vehicle}
                              </Text>
                         </View>
                    </View>

                    {/* Info Cards */}
                    <View style={styles.infoRow}>
                         <View style={styles.infoBox}>
                              <Text style={styles.infoLabel}>Masuk</Text>
                              <Text style={styles.infoValue}>
                                   {formattedEntryTime}
                              </Text>
                         </View>
                         <View style={styles.infoBox}>
                              <Text style={styles.infoLabel}>Durasi</Text>
                              <Text style={styles.infoValueHighlight}>
                                   {formattedDuration}
                              </Text>
                         </View>
                    </View>

                    <View style={styles.feeCard}>
                         <Text style={styles.feeLabel}>Estimasi Biaya</Text>
                         <Text style={styles.feeAmount}>
                              ~{formatCurrency(fee)}
                         </Text>
                    </View>

                    {/* QR Section */}
                    <View style={styles.qrSection}>
                         <Text style={styles.qrLabel}>QR Keluar</Text>
                         <QRCodeDisplay
                              transactionId={`TX-${new Date().getTime().toString().slice(-6)}`}
                         />
                    </View>

                    {/* Actions */}
                    <View style={styles.actionSection}>
                         <TouchableOpacity
                              style={styles.primaryButton}
                              onPress={() => router.push("/payment")}
                         >
                              <Text style={styles.primaryButtonText}>
                                   Bayar Sekarang
                              </Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.ghostButton}>
                              <Text style={styles.ghostButtonText}>
                                   Perpanjang
                              </Text>
                         </TouchableOpacity>
                    </View>
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
     emptyState: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: Spacing.xl,
     },
     emptyTitle: {
          ...Typography.h2,
          marginTop: Spacing.m,
          marginBottom: Spacing.s,
     },
     emptyDesc: {
          ...Typography.body,
          color: Colors.textMuted,
          textAlign: "center",
     },
     header: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: Spacing.l,
     },
     headerTitle: {
          ...Typography.h1,
     },
     chipContainer: {
          alignItems: "center",
          marginBottom: Spacing.l,
     },
     plateChip: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "rgba(26, 60, 110, 0.1)",
          paddingHorizontal: Spacing.m,
          paddingVertical: Spacing.s,
          borderRadius: Radius.full,
          gap: Spacing.xs,
     },
     plateText: {
          ...Typography.body,
          color: Colors.primary,
          fontWeight: "700",
          letterSpacing: 1,
     },
     infoRow: {
          flexDirection: "row",
          gap: Spacing.m,
          marginBottom: Spacing.m,
     },
     infoBox: {
          flex: 1,
          backgroundColor: Colors.surface,
          padding: Spacing.m,
          borderRadius: Radius.card,
          alignItems: "center",
          borderWidth: 1,
          borderColor: Colors.divider,
     },
     infoLabel: {
          ...Typography.caption,
          marginBottom: 4,
     },
     infoValue: {
          ...Typography.body,
          fontWeight: "600",
     },
     infoValueHighlight: {
          ...Typography.body,
          fontWeight: "700",
          color: Colors.primary,
     },
     feeCard: {
          backgroundColor: Colors.primary,
          padding: Spacing.m,
          borderRadius: Radius.card,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: Spacing.xl,
     },
     feeLabel: {
          ...Typography.body,
          color: Colors.surface,
     },
     feeAmount: {
          ...Typography.h2,
          color: Colors.accent,
     },
     qrSection: {
          alignItems: "center",
          marginBottom: Spacing.xl,
     },
     qrLabel: {
          ...Typography.h2,
          marginBottom: Spacing.m,
     },
     actionSection: {
          gap: Spacing.m,
     },
     primaryButton: {
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.m,
          borderRadius: Radius.full,
          alignItems: "center",
     },
     primaryButtonText: {
          ...Typography.button,
     },
     ghostButton: {
          paddingVertical: Spacing.m,
          borderRadius: Radius.full,
          alignItems: "center",
     },
     ghostButtonText: {
          ...Typography.button,
          color: Colors.textMuted,
     },
});
