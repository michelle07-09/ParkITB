import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { ArrowLeft, Car, CreditCard, Wallet } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { QRCodeDisplay } from "./_components/QRCodeDisplay";
import { Colors, Radius, Spacing, Typography } from "./_constants/theme";
import { useStore } from "./_store/useStore";

export default function PaymentScreen() {
     const router = useRouter();
     const { payParking, endParking, setVirtualKeyLocked } = useStore();

     const [activePark, setActivePark] = useState<any | null>();

     const [activeMethod, setActiveMethod] = useState("QRIS");
     useEffect(() => {
          async function fetchData() {
               const { data, error } = await supabase
                    .from("active_transaction")
                    .select();

               setActivePark(data != null ? data[0] : null);
          }

          fetchData();
     }, []);

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

     const now = new Date().getTime();
     const duration = (now - new Date(activePark.entry_time).getTime()) / 1000;

     const feeHours = Math.max(1, Math.ceil(duration / 3600));
     const fee = 3000 + Math.max(0, feeHours - 1) * 2000;

     const formatCurrency = (amount: number) => {
          return (
               "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          );
     };

     const handlePayment = async () => {
          if (activeMethod === "Saldo") {
               const { data, error } =
                    await supabase.functions.invoke("bayar_saldo");
               if (error) {
                    console.log("Err: ", error);
               } else {
                    console.log("JEMBUT", data);
               }
          } else {
               // simulate qris success
               endParking();
               setVirtualKeyLocked(false);
               router.back();
          }
     };

     return (
          <SafeAreaView style={styles.container}>
               <View style={styles.header}>
                    <TouchableOpacity
                         onPress={() => router.back()}
                         style={styles.backButton}
                    >
                         <ArrowLeft color={Colors.textDark} size={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Pembayaran Parkir</Text>
                    <View style={{ width: 24 }} />
               </View>

               <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Fee Summary Card */}
                    <View style={styles.summaryCard}>
                         <Text style={styles.summaryTitle}>
                              Rincian Tagihan
                         </Text>
                         <View style={styles.summaryRow}>
                              <Text style={styles.summaryLabel}>
                                   Tarif Dasar (Jam Pertama)
                              </Text>
                              <Text style={styles.summaryValue}>Rp 3.000</Text>
                         </View>
                         <View style={styles.summaryRow}>
                              <Text style={styles.summaryLabel}>
                                   Tarif Berikutnya
                              </Text>
                              <Text style={styles.summaryValue}>
                                   Rp 2.000/jam
                              </Text>
                         </View>
                         <View style={styles.divider} />
                         <View style={styles.summaryRowTotal}>
                              <Text style={styles.totalLabel}>
                                   Total Tagihan
                              </Text>
                              <Text style={styles.totalValue}>
                                   {formatCurrency(fee || 3000)}
                              </Text>
                         </View>
                    </View>

                    {/* Payment Methods */}
                    <View style={styles.methodContainer}>
                         <TouchableOpacity
                              style={[
                                   styles.methodTab,
                                   activeMethod === "QRIS" &&
                                        styles.methodTabActive,
                              ]}
                              onPress={() => setActiveMethod("QRIS")}
                         >
                              <Text
                                   style={[
                                        styles.methodText,
                                        activeMethod === "QRIS" &&
                                             styles.methodTextActive,
                                   ]}
                              >
                                   QRIS
                              </Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                              style={[
                                   styles.methodTab,
                                   activeMethod === "Saldo" &&
                                        styles.methodTabActive,
                              ]}
                              onPress={() => setActiveMethod("Saldo")}
                         >
                              <Text
                                   style={[
                                        styles.methodText,
                                        activeMethod === "Saldo" &&
                                             styles.methodTextActive,
                                   ]}
                              >
                                   Saldo
                              </Text>
                         </TouchableOpacity>
                         <TouchableOpacity
                              style={[
                                   styles.methodTab,
                                   activeMethod === "E-Money" &&
                                        styles.methodTabActive,
                              ]}
                              onPress={() => setActiveMethod("E-Money")}
                         >
                              <Text
                                   style={[
                                        styles.methodText,
                                        activeMethod === "E-Money" &&
                                             styles.methodTextActive,
                                   ]}
                              >
                                   E-Money
                              </Text>
                         </TouchableOpacity>
                    </View>

                    {activeMethod === "QRIS" && (
                         <View style={styles.qrisSection}>
                              <QRCodeDisplay refreshIntervalMinutes={5} />
                              <Text style={styles.footnote}>
                                   Didukung oleh: GoPay, OVO, DANA, ShopeePay,
                                   LinkAja
                              </Text>
                         </View>
                    )}

                    {activeMethod === "Saldo" && (
                         <View style={styles.saldoSection}>
                              <Wallet color={Colors.primary} size={48} />
                              <Text style={styles.saldoText}>
                                   Bayar dengan Saldo ParkITB
                              </Text>
                              <Text style={styles.saldoAmount}>
                                   Saldo Anda:{" "}
                                   {formatCurrency(
                                        useStore.getState().user.balance,
                                   )}
                              </Text>
                         </View>
                    )}

                    {activeMethod === "E-Money" && (
                         <View style={styles.saldoSection}>
                              <CreditCard color={Colors.primary} size={48} />
                              <Text style={styles.saldoText}>
                                   Tap Kartu E-Money Anda
                              </Text>
                              <Text style={styles.footnote}>
                                   Silakan tap kartu pada reader di gerbang
                                   keluar.
                              </Text>
                         </View>
                    )}

                    {/* Simulate Payment Action for demo */}
                    <TouchableOpacity
                         style={styles.payButton}
                         onPress={handlePayment}
                    >
                         <Text style={styles.payButtonText}>Bayar</Text>
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
     header: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: Spacing.xl,
          paddingBottom: Spacing.m,
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
     backButton: {
          padding: Spacing.xs,
     },
     headerTitle: {
          ...Typography.h2,
     },
     scrollContent: {
          padding: Spacing.xl,
     },
     summaryCard: {
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
          padding: Spacing.m,
          marginBottom: Spacing.xl,
     },
     summaryTitle: {
          ...Typography.body,
          fontWeight: "600",
          marginBottom: Spacing.m,
     },
     summaryRow: {
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: Spacing.s,
     },
     summaryLabel: {
          ...Typography.caption,
     },
     summaryValue: {
          ...Typography.caption,
          fontWeight: "500",
     },
     divider: {
          height: 1,
          backgroundColor: Colors.divider,
          marginVertical: Spacing.m,
     },
     summaryRowTotal: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
     },
     totalLabel: {
          ...Typography.body,
          fontWeight: "700",
     },
     totalValue: {
          ...Typography.h2,
          color: Colors.accent,
     },
     methodContainer: {
          flexDirection: "row",
          backgroundColor: Colors.divider,
          borderRadius: Radius.full,
          padding: 4,
          marginBottom: Spacing.xl,
     },
     methodTab: {
          flex: 1,
          paddingVertical: Spacing.s,
          alignItems: "center",
          borderRadius: Radius.full,
     },
     methodTabActive: {
          backgroundColor: Colors.surface,
     },
     methodText: {
          ...Typography.button,
          color: Colors.textMuted,
          fontSize: 14,
     },
     methodTextActive: {
          color: Colors.primary,
     },
     qrisSection: {
          alignItems: "center",
     },
     footnote: {
          ...Typography.caption,
          color: Colors.textMuted,
          marginTop: Spacing.m,
          textAlign: "center",
     },
     saldoSection: {
          alignItems: "center",
          padding: Spacing.xxl,
          backgroundColor: Colors.surface,
          borderRadius: Radius.card,
     },
     saldoText: {
          ...Typography.h2,
          marginTop: Spacing.m,
          marginBottom: Spacing.xs,
     },
     saldoAmount: {
          ...Typography.body,
          color: Colors.textMuted,
     },
     payButton: {
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.m,
          borderRadius: Radius.full,
          alignItems: "center",
          marginTop: Spacing.xxl,
     },
     payButtonText: {
          ...Typography.button,
     },
});
