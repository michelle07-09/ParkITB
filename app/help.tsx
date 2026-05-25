import { Colors, Radius, Spacing, Typography } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { ArrowLeft, HelpCircle } from 'lucide-react-native';
import React from 'react';
import { Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HelpScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.primary} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Bantuan</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <HelpCircle color={Colors.primary} size={52} />
        <Text style={styles.title}>Butuh Bantuan?</Text>
        <Text style={styles.description}>
          Jika Anda mengalami kendala, silakan hubungi tim dukungan ParkITB.
        </Text>
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Email</Text>
          <Text style={styles.contactText}>support@parkitb.app</Text>
        </View>
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Telepon</Text>
          <Text style={styles.contactText}>+62 811 2233 4455</Text>
        </View>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => Linking.openURL('mailto:support@parkitb.app')}
        >
          <Text style={styles.linkButtonText}>Kirim Email ke Dukungan</Text>
        </TouchableOpacity>
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
  contactCard: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: Spacing.l,
    marginBottom: Spacing.m,
  },
  contactTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  contactText: {
    ...Typography.body,
    color: Colors.textDark,
  },
  linkButton: {
    marginTop: Spacing.l,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.m,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.full,
  },
  linkButtonText: {
    ...Typography.button,
    color: Colors.surface,
  },
});
