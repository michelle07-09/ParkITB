import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Radius, Spacing } from "@/constants/theme";
import { Award } from 'lucide-react-native';

interface MembershipBadgeProps {
  expiryDate: string;
}

export const MembershipBadge: React.FC<MembershipBadgeProps> = ({ expiryDate }) => {
  return (
    <LinearGradient
      colors={['#F5A623', '#F7B733']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Award color={Colors.surface} size={24} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>MEMBER AKTIF</Text>
        <Text style={styles.expiry}>Berlaku s.d. {expiryDate}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.m,
    borderRadius: Radius.card,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: Spacing.s,
    borderRadius: Radius.full,
    marginRight: Spacing.m,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.body,
    color: Colors.surface,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  expiry: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
});
