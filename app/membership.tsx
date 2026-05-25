import { MembershipBadge } from "@/components/MembershipBadge";
import { Colors, Radius, Spacing, Typography } from "@/constants/theme";
import { useStore } from "@/store/useStore";
import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2 } from 'lucide-react-native';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BENEFITS = [
  'Akses gerbang otomatis (Frictionless Exit)',
  'Parkir gratis di semua zona ITB',
  'Prioritas ketersediaan slot parkir',
  'Bebas biaya admin top-up',
];

const TIERS = [
  { name: 'Bulanan', price: 'Rp 150.000', period: '/bulan' },
  { name: 'Semesteran', price: 'Rp 800.000', period: '/6 bulan', highlight: true },
  { name: 'Tahunan', price: 'Rp 1.500.000', period: '/12 bulan' },
];

export default function MembershipScreen() {
  const router = useRouter();
  const { user } = useStore();
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.textDark} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Membership</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {user.membershipActive && (
          <View style={styles.badgeContainer}>
            <MembershipBadge expiryDate={user.membershipExpiry} />
          </View>
        )}

        <View style={styles.benefitsCard}>
          <Text style={styles.sectionTitle}>Keuntungan Member</Text>
          {BENEFITS.map((benefit, idx) => (
            <View key={idx} style={styles.benefitRow}>
              <CheckCircle2 color={Colors.success} size={20} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Pilih Paket Perpanjangan</Text>
        
        <View style={styles.tiersContainer}>
          {TIERS.map((tier, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={[
                styles.tierCard,
                tier.highlight && styles.tierCardHighlight,
                selectedTierIndex === idx && styles.tierCardSelected,
              ]}
              activeOpacity={0.8}
              onPress={() => setSelectedTierIndex(idx)}
            >
              {tier.highlight && (
                <View style={styles.highlightBadge}>
                  <Text style={styles.highlightText}>Terpopuler</Text>
                </View>
              )}
              <Text style={styles.tierName}>{tier.name}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.tierPrice}>{tier.price}</Text>
                <Text style={styles.tierPeriod}>{tier.period}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
          <Text style={styles.primaryButtonText}>
            {selectedTierIndex !== null ? `Perpanjang ${TIERS[selectedTierIndex].name}` : 'Pilih Paket Terlebih Dahulu'}
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    paddingBottom: 100,
  },
  badgeContainer: {
    marginBottom: Spacing.xl,
  },
  benefitsCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.m,
    borderRadius: Radius.card,
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    ...Typography.h2,
    marginBottom: Spacing.m,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
    marginBottom: Spacing.s,
  },
  benefitText: {
    ...Typography.body,
    flex: 1,
  },
  tiersContainer: {
    gap: Spacing.m,
    marginBottom: Spacing.xxl,
  },
  tierCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.l,
    borderRadius: Radius.card,
    borderWidth: 1,
    borderColor: Colors.divider,
    position: 'relative',
  },
  tierCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#EFF5FF',
  },
  tierCardHighlight: {
    borderColor: Colors.accent,
    borderWidth: 2,
  },
  highlightBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.s,
    paddingVertical: 4,
    borderRadius: Radius.full,
  },
  highlightText: {
    ...Typography.caption,
    color: Colors.surface,
    fontWeight: '700',
  },
  tierName: {
    ...Typography.body,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  tierPrice: {
    ...Typography.h1,
    color: Colors.primary,
  },
  tierPeriod: {
    ...Typography.caption,
    marginBottom: 4,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.m,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  primaryButtonText: {
    ...Typography.button,
  },
});
