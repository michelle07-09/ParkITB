import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Radius } from '../_constants/theme';
import { TransactionListItem, TransactionType } from '../_components/TransactionListItem';

const MOCK_TRANSACTIONS = [
  { id: '1', dateGroup: 'Hari ini', type: 'parking', title: 'Parkir Barat ITB', time: '14:30 WIB', amount: 3000 },
  { id: '2', dateGroup: 'Hari ini', type: 'topup', title: 'Top-Up BCA', time: '09:00 WIB', amount: 50000 },
  { id: '3', dateGroup: 'Kemarin', type: 'parking', title: 'Parkir Timur ITB', time: '18:15 WIB', amount: 5000 },
  { id: '4', dateGroup: 'Kemarin', type: 'membership', title: 'Perpanjang Membership', time: '10:00 WIB', amount: 150000 },
  { id: '5', dateGroup: '12 Apr 2026', type: 'parking', title: 'Parkir Selatan ITB', time: '12:00 WIB', amount: 7000 },
];

const FILTERS = ['Semua', 'Parkir', 'Top-Up', 'Membership'];

export default function HistoryScreen() {
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filteredData = MOCK_TRANSACTIONS.filter(t => {
    if (activeFilter === 'Semua') return true;
    if (activeFilter === 'Parkir') return t.type === 'parking';
    if (activeFilter === 'Top-Up') return t.type === 'topup';
    if (activeFilter === 'Membership') return t.type === 'membership';
    return true;
  });

  // Group by dateGroup
  const groupedData = filteredData.reduce((acc, curr) => {
    if (!acc[curr.dateGroup]) {
      acc[curr.dateGroup] = [];
    }
    acc[curr.dateGroup].push(curr);
    return acc;
  }, {} as Record<string, typeof MOCK_TRANSACTIONS>);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Transaksi</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {FILTERS.map((f) => (
            <TouchableOpacity 
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
        {Object.keys(groupedData).length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Tidak ada riwayat transaksi.</Text>
          </View>
        ) : (
          Object.keys(groupedData).map((date) => (
            <View key={date} style={styles.groupContainer}>
              <Text style={styles.dateHeader}>{date}</Text>
              <View style={styles.cardContainer}>
                {groupedData[date].map((t) => (
                  <TransactionListItem 
                    key={t.id}
                    type={t.type as TransactionType}
                    title={t.title}
                    date={t.time}
                    amount={t.amount}
                  />
                ))}
              </View>
            </View>
          ))
        )}
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
    padding: Spacing.xl,
    paddingBottom: Spacing.m,
  },
  headerTitle: {
    ...Typography.h1,
  },
  filterContainer: {
    marginBottom: Spacing.m,
  },
  filterScroll: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.s,
  },
  filterChip: {
    paddingHorizontal: Spacing.m,
    paddingVertical: Spacing.s,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  filterTextActive: {
    color: Colors.surface,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: 100,
  },
  groupContainer: {
    marginBottom: Spacing.l,
  },
  dateHeader: {
    ...Typography.body,
    fontWeight: '700',
    color: Colors.textMuted,
    marginBottom: Spacing.s,
  },
  cardContainer: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.card,
    paddingHorizontal: Spacing.m,
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.xxl,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
  },
});
