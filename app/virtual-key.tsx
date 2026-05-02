import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from './_constants/theme';
import { ArrowLeft, Info } from 'lucide-react-native';
import { VirtualKeyToggle } from './_components/VirtualKeyToggle';
import { useStore } from './_store/useStore';

export default function VirtualKeyScreen() {
  const router = useRouter();
  const { virtualKeyLocked, setVirtualKeyLocked } = useStore();

  // ANNOTATION: Virtual key state would normally sync via REST API polling (3s interval) 
  // or Supabase realtime to ensure the gate and the app are in sync.

  const handleToggle = () => {
    setVirtualKeyLocked(!virtualKeyLocked);
  };

  const lastUpdated = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' WIB';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.textDark} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Virtual Key</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.toggleContainer}>
          <VirtualKeyToggle 
            isLocked={virtualKeyLocked}
            onToggle={handleToggle}
            size="large"
          />
        </View>

        <Text style={styles.timestamp}>Terakhir diperbarui: {lastUpdated}</Text>

        <View style={styles.noteCard}>
          <Info color={Colors.primary} size={24} />
          <Text style={styles.noteText}>
            Virtual key hanya dapat dibuka setelah pembayaran dikonfirmasi atau status membership aktif.
          </Text>
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
    paddingBottom: Spacing.m,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    ...Typography.h2,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    marginBottom: Spacing.xl,
  },
  timestamp: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.xxl,
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 60, 110, 0.05)',
    padding: Spacing.m,
    borderRadius: Radius.card,
    gap: Spacing.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(26, 60, 110, 0.1)',
  },
  noteText: {
    flex: 1,
    ...Typography.caption,
    color: Colors.primary,
    lineHeight: 18,
  },
});
