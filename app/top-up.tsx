import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { ArrowLeft, Landmark, QrCode, Smartphone } from "lucide-react-native";
import React, { useState } from "react";
import {
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
import { Colors, Radius, Spacing, Typography } from "./_constants/theme";
import { useAuthContext } from "./_hooks/use-auth-context";
import { useStore } from "./_store/useStore";

const QUICK_AMOUNTS = [10000, 25000, 50000, 100000];
const PAYMENT_METHODS = [
     {
          id: "transfer",
          name: "Bank Transfer",
          icon: <Landmark color={Colors.primary} size={24} />,
     },
     {
          id: "qris",
          name: "QRIS",
          icon: <QrCode color={Colors.primary} size={24} />,
     },
     {
          id: "ewallet",
          name: "E-Wallet",
          icon: <Smartphone color={Colors.primary} size={24} />,
     },
];

export default function TopUpScreen() {
     const router = useRouter();
     const { profile } = useAuthContext();
     const { user, topUp } = useStore();
     const [amount, setAmount] = useState<number | null>(null);
     const [customAmount, setCustomAmount] = useState("");
     const [selectedMethod, setSelectedMethod] = useState(
          PAYMENT_METHODS[0].id,
     );

     const formatCurrency = (val: number) => {
          return "Rp " + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
     };

     const handleAmountSelect = (val: number) => {
          setAmount(val);
          setCustomAmount("");
     };

     const handleCustomAmountChange = (text: string) => {
          const numericValue = parseInt(text.replace(/[^0-9]/g, ""), 10);
          if (!isNaN(numericValue)) {
               setCustomAmount(numericValue.toString());
               setAmount(numericValue);
          } else {
               setCustomAmount("");
               setAmount(null);
          }
     };

     const handleBankTransfer = async () => {
          const { data, error } = await supabase.functions.invoke("top-up", {
               body: {
                    bank: "mandiri",
                    amount: amount,
               },
          });

          if (error) {
               console.log(error);
               return;
          }

          console.log(data);
     };

     const handleContinue = async () => {
          if (amount) {
               // Simulate top-up success
               switch (selectedMethod) {
                    case "transfer":
                         handleBankTransfer();
                         break;
                    case "qris":
                         break;
                    case "e-wallet":
                         break;
               }

               // topUp(amount);
               // router.back();
          }
     };

     return (
          <SafeAreaView style={styles.container}>
               <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
               >
                    <View style={styles.header}>
                         <TouchableOpacity
                              onPress={() => router.back()}
                              style={styles.backButton}
                         >
                              <ArrowLeft color={Colors.textDark} size={24} />
                         </TouchableOpacity>
                         <Text style={styles.headerTitle}>Top-Up Saldo</Text>
                         <View style={{ width: 24 }} />
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContent}>
                         <View style={styles.balanceCard}>
                              <Text style={styles.balanceLabel}>
                                   Saldo Saat Ini
                              </Text>
                              <Text style={styles.balanceValue}>
                                   {formatCurrency(profile.saldo)}
                              </Text>
                         </View>

                         <Text style={styles.sectionTitle}>Pilih Nominal</Text>

                         <View style={styles.chipsContainer}>
                              {QUICK_AMOUNTS.map((val) => (
                                   <TouchableOpacity
                                        key={val}
                                        style={[
                                             styles.chip,
                                             amount === val &&
                                                  styles.chipActive,
                                        ]}
                                        onPress={() => handleAmountSelect(val)}
                                   >
                                        <Text
                                             style={[
                                                  styles.chipText,
                                                  amount === val &&
                                                       styles.chipTextActive,
                                             ]}
                                        >
                                             {formatCurrency(val)}
                                        </Text>
                                   </TouchableOpacity>
                              ))}
                         </View>

                         <View style={styles.inputContainer}>
                              <Text style={styles.inputPrefix}>Rp</Text>
                              <TextInput
                                   style={styles.input}
                                   placeholder="Nominal lainnya"
                                   keyboardType="numeric"
                                   value={customAmount}
                                   onChangeText={handleCustomAmountChange}
                              />
                         </View>

                         <Text style={styles.sectionTitle}>
                              Metode Pembayaran
                         </Text>

                         <View style={styles.methodsContainer}>
                              {PAYMENT_METHODS.map((method) => (
                                   <TouchableOpacity
                                        key={method.id}
                                        style={[
                                             styles.methodCard,
                                             selectedMethod === method.id &&
                                                  styles.methodCardActive,
                                        ]}
                                        onPress={() =>
                                             setSelectedMethod(method.id)
                                        }
                                   >
                                        <View
                                             style={styles.methodIconContainer}
                                        >
                                             {method.icon}
                                        </View>
                                        <Text style={styles.methodName}>
                                             {method.name}
                                        </Text>
                                        <View style={styles.radio}>
                                             {selectedMethod === method.id && (
                                                  <View
                                                       style={styles.radioInner}
                                                  />
                                             )}
                                        </View>
                                   </TouchableOpacity>
                              ))}
                         </View>
                    </ScrollView>

                    <View style={styles.footer}>
                         <TouchableOpacity
                              style={[
                                   styles.continueButton,
                                   !amount && styles.continueButtonDisabled,
                              ]}
                              disabled={!amount}
                              onPress={handleContinue}
                         >
                              <Text style={styles.continueText}>Lanjutkan</Text>
                         </TouchableOpacity>
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
     header: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: Spacing.xl,
          paddingBottom: Spacing.m,
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
     balanceCard: {
          backgroundColor: Colors.primary,
          padding: Spacing.l,
          borderRadius: Radius.card,
          alignItems: "center",
          marginBottom: Spacing.xl,
     },
     balanceLabel: {
          ...Typography.body,
          color: "rgba(255,255,255,0.8)",
          marginBottom: Spacing.xs,
     },
     balanceValue: {
          ...Typography.h1,
          color: Colors.surface,
     },
     sectionTitle: {
          ...Typography.h2,
          marginBottom: Spacing.m,
     },
     chipsContainer: {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: Spacing.m,
          marginBottom: Spacing.l,
     },
     chip: {
          width: "47%",
          backgroundColor: Colors.surface,
          paddingVertical: Spacing.m,
          borderRadius: Radius.chip,
          alignItems: "center",
          borderWidth: 1,
          borderColor: Colors.divider,
     },
     chipActive: {
          borderColor: Colors.primary,
          backgroundColor: "rgba(26, 60, 110, 0.05)",
     },
     chipText: {
          ...Typography.body,
          fontWeight: "600",
     },
     chipTextActive: {
          color: Colors.primary,
     },
     inputContainer: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.surface,
          borderWidth: 1,
          borderColor: Colors.divider,
          borderRadius: Radius.input,
          paddingHorizontal: Spacing.m,
          marginBottom: Spacing.xl,
     },
     inputPrefix: {
          ...Typography.body,
          fontWeight: "600",
          color: Colors.textMuted,
          marginRight: Spacing.s,
     },
     input: {
          flex: 1,
          paddingVertical: Spacing.m,
          ...Typography.body,
     },
     methodsContainer: {
          gap: Spacing.m,
     },
     methodCard: {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.surface,
          padding: Spacing.m,
          borderRadius: Radius.card,
          borderWidth: 1,
          borderColor: Colors.divider,
     },
     methodCardActive: {
          borderColor: Colors.primary,
     },
     methodIconContainer: {
          backgroundColor: "rgba(26, 60, 110, 0.05)",
          padding: Spacing.s,
          borderRadius: Radius.full,
          marginRight: Spacing.m,
     },
     methodName: {
          ...Typography.body,
          flex: 1,
          fontWeight: "500",
     },
     radio: {
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: Colors.divider,
          justifyContent: "center",
          alignItems: "center",
     },
     radioInner: {
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: Colors.primary,
     },
     footer: {
          padding: Spacing.xl,
          paddingBottom: Spacing.xxl,
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.divider,
     },
     continueButton: {
          backgroundColor: Colors.primary,
          paddingVertical: Spacing.m,
          borderRadius: Radius.full,
          alignItems: "center",
     },
     continueButtonDisabled: {
          backgroundColor: Colors.textMuted,
     },
     continueText: {
          ...Typography.button,
     },
});
