import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
     Colors,
     Radius,
     Shadows,
     Spacing,
     Typography,
} from "@/constants/theme";

type ParkingCardProps = {
     activePark: any | null;
};

export const ParkingStatusCard = (props: ParkingCardProps) => {
     const router = useRouter();
     //  const { activeParking, updateParkingDuration } = useStore();
     const [liveDuration, setLiveDuration] = useState("00:00:00");
     const [duration, setDuration] = useState<number>(
          props.activePark?.entry_time
               ? new Date().getTime() - new Date(props.activePark.entry_time).getTime()
               : 0
     );
     const [fee, setFee] = useState<number>(3000);

     useEffect(() => {
          if (!props.activePark?.entry_time) return;

          // Simulate duration counter
          const entryDate = new Date(props.activePark.entry_time).getTime();

          const interval = setInterval(() => {
               const now = new Date().getTime();
               const diffInSeconds = Math.floor((now - entryDate) / 1000);

               const hours = Math.floor(diffInSeconds / 3600);
               const minutes = Math.floor((diffInSeconds % 3600) / 60);
               const seconds = diffInSeconds % 60;

               const formatted = [
                    hours.toString().padStart(2, "0"),
                    minutes.toString().padStart(2, "0"),
                    seconds.toString().padStart(2, "0"),
               ].join(":");

               setLiveDuration(formatted);

               // Rough estimate: Rp 3000 first hour, Rp 2000 next hours
               const feeHours = Math.max(1, Math.ceil(diffInSeconds / 3600));
               const newFee = 3000 + Math.max(0, feeHours - 1) * 2000;

               setDuration(diffInSeconds * 1000);
               setFee(newFee);
          }, 1000);

          return () => clearInterval(interval);
     }, [props.activePark?.entry_time]);

     if (!props.activePark) {
          return null; // Or empty state handled by parent
     }

     const formatCurrency = (amount: number) => {
          return (
               "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          );
     };

     const formattedEntryTime = props.activePark.entry_time
          ? new Date(props.activePark.entry_time).toLocaleTimeString("id-ID", {
                 hour: "2-digit",
                 minute: "2-digit",
            }) + " WIB"
          : "--:--";

     return (
          <View style={styles.container}>
               <View style={styles.topSection}>
                    <View style={styles.infoLeft}>
                         <Text style={styles.label}>
                              Masuk: {formattedEntryTime}
                         </Text>
                         <Text style={styles.duration}>{liveDuration}</Text>
                    </View>
                    <View style={styles.infoRight}>
                         <Text style={styles.label}>Estimasi Biaya</Text>
                         <Text style={styles.fee}>~{formatCurrency(fee)}</Text>
                    </View>
               </View>

               <View style={styles.divider} />

               <View style={styles.actionSection}>
                    <TouchableOpacity
                         style={styles.secondaryButton}
                         onPress={() => router.push("/parking")}
                    >
                         <Text style={styles.secondaryButtonText}>
                              Lihat QR
                         </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                         style={styles.primaryButton}
                         onPress={() => router.push("/payment")}
                    >
                         <Text style={styles.primaryButtonText}>
                              Bayar Sekarang
                         </Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
          padding: Spacing.m,
          ...Shadows.soft,
     },
     topSection: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: Spacing.m,
     },
     infoLeft: {
          flex: 1,
     },
     infoRight: {
          flex: 1,
          alignItems: "flex-end",
     },
     label: {
          ...Typography.caption,
          marginBottom: Spacing.xs,
     },
     duration: {
          ...Typography.h1,
          color: Colors.primary,
     },
     fee: {
          ...Typography.h2,
          color: Colors.accent,
     },
     divider: {
          height: 1,
          backgroundColor: Colors.divider,
          marginBottom: Spacing.m,
     },
     actionSection: {
          flexDirection: "row",
          gap: Spacing.s,
     },
     primaryButton: {
          flex: 1,
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.s,
          borderRadius: Radius.chip,
          alignItems: "center",
     },
     primaryButtonText: {
          ...Typography.button,
     },
     secondaryButton: {
          flex: 1,
          borderWidth: 1,
          borderColor: Colors.primary,
          paddingVertical: Spacing.s,
          borderRadius: Radius.chip,
          alignItems: "center",
     },
     secondaryButtonText: {
          ...Typography.button,
          color: Colors.primary,
     },
});
