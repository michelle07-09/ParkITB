import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography, Radius, Spacing } from "@/constants/theme";
import { Car, Wallet, Award } from 'lucide-react-native';

export type TransactionType = 'parking' | 'topup' | 'membership';

interface TransactionListItemProps {
  type: TransactionType;
  title: string;
  date: string;
  amount: number;
}

export const TransactionListItem: React.FC<TransactionListItemProps> = ({ type, title, date, amount }) => {
  const getIcon = () => {
    switch (type) {
      case 'parking': return <Car color={Colors.primary} size={20} />;
      case 'topup': return <Wallet color={Colors.success} size={20} />;
      case 'membership': return <Award color={Colors.accent} size={20} />;
    }
  };

  const getIconBackground = () => {
    switch (type) {
      case 'parking': return 'rgba(26, 60, 110, 0.1)';
      case 'topup': return 'rgba(52, 199, 89, 0.1)';
      case 'membership': return 'rgba(245, 166, 35, 0.1)';
    }
  };

  const isDeduction = type === 'parking' || type === 'membership';
  
  const formatCurrency = (val: number) => {
    return 'Rp ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: getIconBackground() }]}>
        {getIcon()}
      </View>
      
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>

      <Text style={[
        styles.amount, 
        { color: isDeduction ? Colors.textDark : Colors.success }
      ]}>
        {isDeduction ? '-' : '+'}{formatCurrency(amount)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
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
  title: {
    ...Typography.body,
    fontWeight: '600',
    marginBottom: 2,
  },
  date: {
    ...Typography.caption,
  },
  amount: {
    ...Typography.body,
    fontWeight: '700',
  },
});
