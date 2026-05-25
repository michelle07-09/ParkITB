import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Radius, Spacing } from '../_constants/theme';

interface SlotAvailabilityBarProps {
  zoneName: string;
  percentage: number; // 0 to 100
}

export const SlotAvailabilityBar: React.FC<SlotAvailabilityBarProps> = ({ zoneName, percentage }) => {
  const getBarColor = () => {
    if (percentage > 50) return Colors.success;
    if (percentage >= 20) return Colors.accent;
    return Colors.error;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.zoneName}>{zoneName}</Text>
        <Text style={styles.percentage}>{percentage}% Tersedia</Text>
      </View>
      
      <View style={styles.barBackground}>
        <View 
          style={[
            styles.barFill, 
            { width: `${percentage}%`, backgroundColor: getBarColor() }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.m,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  zoneName: {
    ...Typography.body,
    fontWeight: '600',
  },
  percentage: {
    ...Typography.caption,
    fontWeight: '500',
  },
  barBackground: {
    height: 8,
    backgroundColor: Colors.divider,
    borderRadius: Radius.full,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: Radius.full,
  },
});
