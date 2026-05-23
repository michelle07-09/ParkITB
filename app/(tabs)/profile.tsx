import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../_constants/theme';
import { useStore } from '../_store/useStore';
import { ChevronRight, CreditCard, Shield, HelpCircle, Info, Car, Award } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const MENU_ITEMS = [
  { icon: <Car size={20} color={Colors.textDark} />, title: 'Kendaraan Saya', id: 'vehicles' },
  { icon: <CreditCard size={20} color={Colors.textDark} />, title: 'Metode Pembayaran', id: 'payment' },
  { icon: <Award size={20} color={Colors.textDark} />, title: 'Membership', id: 'membership' },
  { icon: <Shield size={20} color={Colors.textDark} />, title: 'Keamanan', id: 'security' },
  { icon: <HelpCircle size={20} color={Colors.textDark} />, title: 'Bantuan', id: 'help' },
  { icon: <Info size={20} color={Colors.textDark} />, title: 'Tentang Aplikasi', id: 'about' },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useStore();

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    // Basic mock logout
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil Saya</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(user.name)}</Text>
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.studentId}>{user.studentId}</Text>
          
          <View style={styles.platesContainer}>
            {user.plates.map((plate) => (
              <View key={plate} style={styles.plateChip}>
                <Text style={styles.plateText}>{plate}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.menuSection}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                if (item.id === 'vehicles') router.push('/vehicles');
                else if (item.id === 'payment') router.push('/payment-methods');
                else if (item.id === 'membership') router.push('/membership');
              }}
            >
              <View style={styles.menuLeft}>
                {item.icon}
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <ChevronRight color={Colors.textMuted} size={20} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Keluar</Text>
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
  scrollContent: {
    padding: Spacing.xl,
    paddingBottom: 100,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    ...Typography.h1,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.m,
  },
  avatarText: {
    ...Typography.h1,
    color: Colors.surface,
    fontSize: 32,
  },
  name: {
    ...Typography.h2,
    marginBottom: 4,
  },
  studentId: {
    ...Typography.body,
    color: Colors.textMuted,
    marginBottom: Spacing.m,
  },
  platesContainer: {
    flexDirection: 'row',
    gap: Spacing.s,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  plateChip: {
    backgroundColor: 'rgba(45, 125, 210, 0.1)',
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: 'rgba(45, 125, 210, 0.2)',
  },
  plateText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: '600',
  },
  menuSection: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    overflow: 'hidden',
    marginBottom: Spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
  },
  menuTitle: {
    ...Typography.body,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: Spacing.m,
    alignItems: 'center',
  },
  logoutText: {
    ...Typography.button,
    color: Colors.error,
  },
});
