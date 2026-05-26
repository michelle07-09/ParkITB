import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from './_constants/theme';
import { useStore } from './_store/useStore';

const BENEFITS = [
  {
    title: "Prioritas Slot Parkir",
    desc: "Akses zona parkir eksklusif dekat pintu masuk.",
  },
  {
    title: "Bebas Biaya Per Jam",
    desc: "Parkir tanpa batas waktu tanpa biaya tambahan.",
  },
  {
    title: "Layanan Valet Gratis",
    desc: "2x penggunaan valet setiap bulannya.",
  },
];

const TIERS = [
  { duration: "1 Bulan", discount: "-", total: "Rp 150.000", bg: "#FFFFFF", borderLeft: false },
  { duration: "6 Bulan", discount: "15%", total: "Rp 765.000", bg: "transparent", borderLeft: false },
  { duration: "12 Bulan", discount: "25%", total: "Rp 1.350.000", bg: "#FFFFFF", borderLeft: true },
];

export default function MembershipScreen() {
  const router = useRouter();
  const { user } = useStore();

  const formattedExpiry = user.membershipExpiry || "31 Juli 2025";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.textDark} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Membership</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Membership Badge Card */}
        <LinearGradient
          colors={["#002653", "#1A3C6E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.badgeCard}
        >
          <View style={styles.cardHeader}>
            <View style={styles.tierCapsule}>
              <Text style={styles.tierText}>PREMIUM TIER</Text>
            </View>
            <Star color="#FFB955" size={32} fill="#FFB955" />
          </View>
          
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>MEMBER AKTIF</Text>
            <Text style={styles.cardSubtitle}>Aktif hingga {formattedExpiry}</Text>
          </View>
        </LinearGradient>

        {/* Benefits Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>KEUNTUNGAN ANDA</Text>
          <View style={styles.benefitsList}>
            {BENEFITS.map((benefit, idx) => (
              <View key={idx} style={styles.benefitCard}>
                <View style={styles.iconCircle}>
                  <CheckCircle2 color={Colors.secondary} size={22} />
                </View>
                <View style={styles.benefitTextContainer}>
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDesc}>{benefit.desc}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity 
          style={styles.ctaButton} 
          activeOpacity={0.85}
          onPress={() => router.push("/extend-membership")}
        >
          <Text style={styles.ctaButtonText}>Perpanjang Membership</Text>
        </TouchableOpacity>

        {/* Pricing Tiers Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.sectionTitle}>OPSI PAKET</Text>
            <Text style={styles.tableSubtitle}>HARGA DALAM RUPIAH</Text>
          </View>

          <View style={styles.tableContainer}>
            {/* Table Columns Title */}
            <View style={styles.columnTitles}>
              <Text style={styles.colTitleLeft}>DURASI</Text>
              <Text style={styles.colTitleCenter}>DISKON</Text>
              <Text style={styles.colTitleRight}>TOTAL</Text>
            </View>

            {/* Table Rows */}
            <View style={styles.tableBody}>
              {TIERS.map((tier, idx) => (
                <View 
                  key={idx} 
                  style={[
                    styles.tableRow,
                    { backgroundColor: tier.bg },
                    tier.borderLeft && styles.highlightedRow,
                  ]}
                >
                  <Text style={styles.rowDuration}>{tier.duration}</Text>
                  <Text style={[
                    styles.rowDiscount,
                    tier.discount !== "-" ? styles.activeDiscount : styles.mutedDiscount
                  ]}>
                    {tier.discount}
                  </Text>
                  <Text style={styles.rowTotal}>{tier.total}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Perpanjang Membership</Text>
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
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.l,
    paddingBottom: Spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.02)",
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    ...Typography.h2,
    fontWeight: "700",
  },
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: 120,
  },
  badgeCard: {
    borderRadius: Radius.card,
    padding: Spacing.xl,
    marginBottom: Spacing.xxl,
    position: "relative",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  tierCapsule: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: Spacing.m,
    paddingVertical: 4,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  tierText: {
    ...Typography.caption,
    color: "#D7E3FF",
    fontWeight: "800",
    letterSpacing: 1,
  },
  cardBody: {
    gap: Spacing.xs,
  },
  cardTitle: {
    ...Typography.h1,
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  cardSubtitle: {
    ...Typography.body,
    color: "#abc7ff",
    fontWeight: "600",
  },
  sectionContainer: {
    marginBottom: Spacing.xxl,
  },
  sectionTitle: {
    ...Typography.caption,
    fontWeight: "700",
    color: Colors.textMuted,
    letterSpacing: 1.5,
    marginBottom: Spacing.m,
  },
  benefitsList: {
    gap: Spacing.m,
  },
  benefitCard: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.l,
    borderRadius: Radius.card,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.m,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.01)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: Radius.full,
    backgroundColor: "rgba(45, 125, 210, 0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  benefitTextContainer: {
    flex: 1,
    gap: 2,
  },
  benefitTitle: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.primary,
  },
  benefitDesc: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 12,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.l,
    borderRadius: Radius.card,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: Spacing.xxl,
  },
  ctaButtonText: {
    ...Typography.button,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  tableHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: Spacing.s,
  },
  tableSubtitle: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  tableContainer: {
    backgroundColor: "#F2F4F6",
    borderRadius: Radius.card,
    overflow: "hidden",
  },
  columnTitles: {
    flexDirection: "row",
    backgroundColor: "#E7E8EA",
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.m,
  },
  colTitleLeft: {
    flex: 1.2,
    ...Typography.caption,
    fontWeight: "700",
    color: Colors.textMuted,
    fontSize: 10,
    letterSpacing: 0.5,
  },
  colTitleCenter: {
    flex: 1,
    ...Typography.caption,
    fontWeight: "700",
    color: Colors.textMuted,
    fontSize: 10,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  colTitleRight: {
    flex: 1.2,
    ...Typography.caption,
    fontWeight: "700",
    color: Colors.textMuted,
    fontSize: 10,
    letterSpacing: 0.5,
    textAlign: "right",
  },
  tableBody: {
    gap: 1,
  },
  tableRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.l,
    alignItems: "center",
    position: "relative",
  },
  highlightedRow: {
    borderLeftWidth: 4,
    borderLeftColor: "#FFB955",
  },
  rowDuration: {
    flex: 1.2,
    ...Typography.body,
    fontWeight: "700",
    color: Colors.primary,
  },
  rowDiscount: {
    flex: 1,
    ...Typography.caption,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },
  activeDiscount: {
    color: "#e4980e",
  },
  mutedDiscount: {
    color: Colors.textMuted,
  },
  rowTotal: {
    flex: 1.2,
    ...Typography.body,
    fontWeight: "800",
    color: Colors.primary,
    textAlign: "right",
  },
});
