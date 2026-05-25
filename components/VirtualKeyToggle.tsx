import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Lock, Unlock } from 'lucide-react-native';
import { Colors, Typography, Spacing, Shadows } from "@/constants/theme";

interface VirtualKeyToggleProps {
  isLocked: boolean;
  onToggle: () => void;
  size?: 'normal' | 'large';
  disabled?: boolean;
}

export const VirtualKeyToggle: React.FC<VirtualKeyToggleProps> = ({ 
  isLocked, 
  onToggle, 
  size = 'normal',
  disabled = false
}) => {
  const isLarge = size === 'large';
  const diameter = isLarge ? 120 : 60;
  const iconSize = isLarge ? 48 : 24;

  const backgroundColor = isLocked ? Colors.error : Colors.success;
  const label = isLocked ? 'TERKUNCI' : 'TERBUKA';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          {
            width: diameter,
            height: diameter,
            borderRadius: diameter / 2,
            backgroundColor: disabled ? Colors.textMuted : backgroundColor,
          }
        ]}
        onPress={onToggle}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {isLocked ? (
          <Lock color={Colors.surface} size={iconSize} />
        ) : (
          <Unlock color={Colors.surface} size={iconSize} />
        )}
      </TouchableOpacity>
      <Text style={[styles.label, isLarge && styles.labelLarge]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing.s,
  },
  toggleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.soft,
  },
  label: {
    ...Typography.caption,
    color: Colors.textDark,
    fontWeight: '600',
  },
  labelLarge: {
    ...Typography.h2,
    marginTop: Spacing.s,
  },
});
