import { Tables } from "@/lib/park-type";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
     Colors,
     Radius,
     Shadows,
     Spacing,
     Typography,
} from "../_constants/theme";

const URL_TARIF = 'https://xfrsjvaewbcukazxcwvv.supabase.co/functions/v1/tarif';
type ParkingCardProps = {
     activePark: Tables<'active_transaction'> & {type: string, campus: string};
};

type Tarif = {
     // motor: {
     base: number;
     hourly: number;
     max: number;
     inap: number;
     // };
     // mobil: {
     //      base: number;
     //      hourly: number;
     //      max: number;
     //      inap: number;
     // };
};

export const ParkingStatusCard = ({activePark}: ParkingCardProps) => {
     const router = useRouter();
     //  const { activeParking, updateParkingDuration } = useStore();
     const [liveDuration, setLiveDuration] = useState("00:00:00");
     const [duration, setDuration] = useState<number>(
          new Date().getTime() -
               new Date(activePark.entry_time).getTime(),
     );
     const [fee, setFee] = useState<number>(3000);
     const [tarif, setTarif] = useState<Tarif>();

     useEffect(() => {
          const fetchTarif = async () => {
               try {
                    
                    // return;
                    const response = await axios.get<Tarif>(`${URL_TARIF}?campus=${activePark.campus}&tipe_kendaraan=${activePark.type}`)
                    console.log(response.data);
                    setTarif(response.data);
               } catch (error) {
                    if (axios.isAxiosError(error)) {
                         console.log("Axios Error: ", error.toJSON());
                    } else {
                         console.log("Unexpected Error: ", error);
                    }
               }
          };

          fetchTarif();
     }, [activePark]);

     useEffect(() => {
          // if (!activeParking.isParking || !activeParking.entryTime) return;

          // Simulate duration counter
          const entryDate = new Date(activePark.entry_time);
          console.log(entryDate);
          const entryTime = entryDate.getTime();

          const nextMidnight = new Date(entryDate);
          nextMidnight.setDate(entryDate.getDate() + 1);
          nextMidnight.setHours(0);
          nextMidnight.setMinutes(0);
          nextMidnight.setSeconds(0);

          console.log("Entry date:",entryDate.toLocaleString('id-ID'));
          console.log("Next Midnight:", nextMidnight.toLocaleString('id-ID'));

          

          const timeTillMidnight = Math.floor((nextMidnight.getTime() - entryTime) / 1000);
          console.log("Time till midnight:", timeTillMidnight, "seconds");
          

          const interval = setInterval(() => {
               if (!tarif) return;
               const now = new Date().getTime();
               const diffInSeconds = Math.floor((now - entryTime) / 1000);

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
               let feeTime = diffInSeconds;
               console.log("Parking Duration:", feeTime, "seconds");
               const midnightPassed = Math.max(Math.floor((feeTime - timeTillMidnight) / 86400) + 1, 0);
               feeTime -= Math.max(timeTillMidnight + 86400 * (midnightPassed - 1), 0);

               const feeBase = 2000;
               const feeHourly = 2000;
               const feeMax = 2000;
               const feeHours = Math.max(1, Math.ceil(feeTime / 3600));
               console.log("Remaining non-inap duration:", feeTime, 'seconds');
               console.log("Remaining non-inap hours:", feeHours, 'hours');

               console.log("Midnight passed:",midnightPassed);

               // const tarifInap = feeDays * tarif.inap;
               const newFee = midnightPassed * tarif.inap + Math.min(feeBase + feeHourly * (feeHours - 1), feeMax);

               // Update store less frequently in real app, but for demo we can just update it
               //  updateParkingDuration(diffInSeconds, newFee);
               setDuration((a) => a + diffInSeconds);

               setFee(newFee);
          }, 1000);

          return () => clearInterval(interval);
     }, [activePark.entry_time, tarif]);

     if (!activePark || !tarif) {
          return null; // Or empty state handled by parent
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
