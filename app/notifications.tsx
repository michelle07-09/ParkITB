import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius, Shadows } from "@/constants/theme";
import { ArrowLeft, Car, Wallet, Bell, Award } from 'lucide-react-native';

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'parking',
    title: 'Kendaraan Terdeteksi',
    desc: 'Mobil D 1234 ABC telah memasuki area Parkir Barat ITB.',
    time: 'Baru saja',
    isRead: false,
  },
  {
    id: '2',
    type: 'wallet',
    title: 'Pembayaran Berhasil',
    desc: 'Pembayaran parkir sebesar Rp 3.000 berhasil dikonfirmasi. Virtual key terbuka.',
    time: '1 jam yang lalu',
    isRead: false,
  },
  {
    id: '3',
    type: 'bell',
    title: 'Peringatan Saldo Rendah',
    desc: 'Saldo ParkITB Anda tersisa Rp 15.000. Segera lakukan top-up.',
    time: 'Kemarin',
    isRead: true,
  },
  {
    id: '4',
    type: 'membership',
    title: 'Membership Hampir Habis',
    desc: 'Masa aktif membership Anda akan berakhir dalam 7 hari. Perpanjang sekarang.',
    time: '2 hari yang lalu',
    isRead: true,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const getIcon = (type: string) => {
    switch (type) {
      case 'parking': return <Car color={Colors.primary} size={20} />;
      case 'wallet': return <Wallet color={Colors.success} size={20} />;
      case 'membership': return <Award color={Colors.accent} size={20} />;
      default: return <Bell color={Colors.secondary} size={20} />;
    }
  };

  const getIconBackground = (type: string) => {
    switch (type) {
      case 'parking': return 'rgba(26, 60, 110, 0.1)';
      case 'wallet': return 'rgba(52, 199, 89, 0.1)';
      case 'membership': return 'rgba(245, 166, 35, 0.1)';
      default: return 'rgba(45, 125, 210, 0.1)';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color={Colors.textDark} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifikasi</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {NOTIFICATIONS.map((notif) => (
          <View 
            key={notif.id} 
            style={[
              styles.notifCard, 
              notif.isRead ? styles.notifCardRead : styles.notifCardUnread
            ]}
          >
            <View style={[styles.iconContainer, { backgroundColor: getIconBackground(notif.type) }]}>
              {getIcon(notif.type)}
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{notif.title}</Text>
                <Text style={styles.time}>{notif.time}</Text>
              </View>
              <Text style={styles.desc}>{notif.desc}</Text>
            </View>
          </View>
        ))}

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
    paddingHorizontal: Spacing.m,
    paddingTop: Spacing.s,
    paddingBottom: 100,
  },
  notifCard: {
    flexDirection: 'row',
    padding: Spacing.m,
    borderRadius: Radius.card,
    marginBottom: Spacing.s,
  },
  notifCardRead: {
    backgroundColor: Colors.background,
  },
  notifCardUnread: {
    backgroundColor: Colors.surface,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    ...Shadows.soft,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.m,
  },
  contentContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    ...Typography.body,
    fontWeight: '700',
    flex: 1,
    marginRight: Spacing.s,
  },
  time: {
    ...Typography.caption,
  },
  desc: {
    ...Typography.body,
    color: Colors.textMuted,
    lineHeight: 20,
  },
});
