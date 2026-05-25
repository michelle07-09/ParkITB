import { Colors, Spacing, Typography } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SecurityScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.primary} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Keamanan</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <ShieldCheck color={Colors.primary} size={52} />
        <Text style={styles.title}>Keamanan Akun Anda</Text>
        <Text style={styles.description}>
          ParkITB melindungi data Anda dengan enkripsi dan otentikasi yang aman. Pastikan selalu menggunakan password kuat dan jangan bagikan akun Anda kepada orang lain.
        </Text>
        <View style={styles.bulletList}>
          <Text style={styles.bulletItem}>• Enkripsi data pengguna</Text>
          <Text style={styles.bulletItem}>• Otentikasi dua faktor (coming soon)</Text>
          <Text style={styles.bulletItem}>• Proteksi sesi dan logout otomatis</Text>
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
  bulletList: {
    width: '100%',
    gap: Spacing.s,
  },
  bulletItem: {
    ...Typography.body,
    color: Colors.textDark,
  },
});
