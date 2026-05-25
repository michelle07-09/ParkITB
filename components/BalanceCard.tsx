import {
     Colors,
     Radius,
     Shadows,
     Spacing,
     Typography,
} from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Landmark, PlusCircle } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BalanceCardProps {
     balance: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ balance }) => {
     const router = useRouter();

     const formatCurrency = (amount: number) => {
          return (
               "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          );
     };

     return (
          <LinearGradient
               colors={[Colors.primary, Colors.secondary]}
               start={{ x: 0, y: 0 }}
               end={{ x: 1, y: 1 }}
               style={styles.container}
          >
               <View style={styles.watermark}>
                    <Landmark color="rgba(255,255,255,0.1)" size={120} />
               </View>

               <View style={styles.content}>
                    <View>
                         <Text style={styles.label}>Saldo ParkITB</Text>
                         <Text style={styles.balance}>
                              {formatCurrency(balance ?? 0)}
                         </Text>
                    </View>

                    <TouchableOpacity
                         style={styles.topUpButton}
                         onPress={() => router.push("/top-up")}
                    >
                         <PlusCircle color={Colors.primary} size={16} />
                         <Text style={styles.topUpText}>Top-Up</Text>
                    </TouchableOpacity>
               </View>
          </LinearGradient>
     );
};

const styles = StyleSheet.create({
     container: {
          borderRadius: Radius.card,
          padding: Spacing.l,
          overflow: "hidden",
          ...Shadows.soft,
     },
     watermark: {
          position: "absolute",
          right: -20,
          bottom: -20,
     },
     content: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1,
     },
     label: {
          ...Typography.caption,
          color: "rgba(255,255,255,0.8)",
          marginBottom: Spacing.xs,
     },
     balance: {
          ...Typography.h1,
          color: Colors.surface,
          fontSize: 28,
     },
     topUpButton: {
          backgroundColor: Colors.surface,
          paddingHorizontal: Spacing.m,
          paddingVertical: Spacing.s,
          borderRadius: Radius.full,
          flexDirection: "row",
          alignItems: "center",
          gap: Spacing.xs,
     },
     topUpText: {
          ...Typography.button,
          color: Colors.primary,
          fontSize: 14,
     },
});
