import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { ArrowLeft, Info } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.primary} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tentang Aplikasi</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Info color={Colors.primary} size={52} />
        <Text style={styles.title}>ParkITB</Text>
        <Text style={styles.description}>
          ParkITB adalah aplikasi parkir pintar untuk pengguna kampus ITB. Nikmati pengalaman parkir otomatis, top-up cepat, dan manajemen kendaraan yang mudah.
        </Text>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>Versi Aplikasi</Text>
          <Text style={styles.detailValue}>1.0.0</Text>
        </View>
        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>Dikembangkan oleh</Text>
          <Text style={styles.detailValue}>Tim ParkITB</Text>
        </View>
      </View>
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
  },
  backButton: {
    padding: Spacing.s,
  },
  headerTitle: {
    ...Typography.h2,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    ...Typography.h2,
    marginTop: Spacing.l,
    marginBottom: Spacing.m,
    textAlign: 'center',
  },
  description: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  detailCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: Spacing.l,
    marginBottom: Spacing.m,
  },
  detailLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  detailValue: {
    ...Typography.body,
    color: Colors.textDark,
  },
});
