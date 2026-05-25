import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { QrCode, RefreshCw } from 'lucide-react-native';
import { Colors, Typography, Radius, Shadows, Spacing } from '../_constants/theme';

interface QRCodeDisplayProps {
  transactionId?: string;
  refreshIntervalMinutes?: number;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ 
  transactionId = 'TX-123456789',
  refreshIntervalMinutes = 5
}) => {
  const [timeLeft, setTimeLeft] = useState(refreshIntervalMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const intervalId = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleRefresh = () => {
    setTimeLeft(refreshIntervalMinutes * 60);
    // Add real refresh logic here if needed
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <View style={styles.container}>
      <View style={styles.qrPlaceholder}>
        <QrCode color={Colors.primary} size={160} strokeWidth={1} />
        <View style={styles.cornerTL} />
        <View style={styles.cornerTR} />
        <View style={styles.cornerBL} />
        <View style={styles.cornerBR} />
      </View>

      <Text style={styles.transactionId}>{transactionId}</Text>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Berlaku: {formattedTime}</Text>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <RefreshCw color={Colors.primary} size={16} />
        <Text style={styles.refreshText}>Refresh QR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    padding: Spacing.xl,
    alignItems: 'center',
    ...Shadows.soft,
  },
  qrPlaceholder: {
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.m,
    position: 'relative',
  },
  // Frame corners
  cornerTL: { position: 'absolute', top: 0, left: 0, width: 24, height: 24, borderTopWidth: 4, borderLeftWidth: 4, borderColor: Colors.primary },
  cornerTR: { position: 'absolute', top: 0, right: 0, width: 24, height: 24, borderTopWidth: 4, borderRightWidth: 4, borderColor: Colors.primary },
  cornerBL: { position: 'absolute', bottom: 0, left: 0, width: 24, height: 24, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: Colors.primary },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderBottomWidth: 4, borderRightWidth: 4, borderColor: Colors.primary },
  
  transactionId: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.s,
  },
  timerContainer: {
    backgroundColor: 'rgba(26, 60, 110, 0.1)',
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    marginBottom: Spacing.l,
  },
  timerText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  refreshText: {
    ...Typography.button,
    color: Colors.primary,
  },
});
