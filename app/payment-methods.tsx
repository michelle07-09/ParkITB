import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, Radius } from "@/constants/theme";
import {
  ArrowLeft,
  Plus,
  PlusCircle,
  QrCode,
  CreditCard,
  Shield,
  ChevronRight,
  Award,
  X,
  Landmark,
  Smartphone,
} from 'lucide-react-native';
import { useStore } from "@/store/useStore";

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const { user, addPaymentMethod, setDefaultPaymentMethod } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newMethodType, setNewMethodType] = useState<'bank' | 'card' | 'ewallet'>('bank');
  const [newMethodName, setNewMethodName] = useState('');
  const [newMethodNumber, setNewMethodNumber] = useState('');

  const formatCurrency = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const bankMethods = user.paymentMethods.filter((m) => m.type === 'bank');
  const cardMethods = user.paymentMethods.filter((m) => m.type === 'card');
  const hasNoPaymentMethods = user.paymentMethods.length === 0;
  const placeholderBanks = ['Bank Mandiri', 'Bank BRI', 'Bank BCA', 'Bank BTN'];

  const linkedAccountItems = hasNoPaymentMethods
    ? placeholderBanks.map((bank) => (
        <View key={bank} style={styles.bankPlaceholderCard}>
          <View style={styles.bankLogoPlaceholder} />
          <View style={styles.bankInfoPlaceholder}>
            <Text style={styles.bankNamePlaceholder}>{bank}</Text>
            <Text style={styles.bankNumberPlaceholder}>Tambahkan metode pembayaran</Text>
          </View>
        </View>
      ))
    : bankMethods.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={styles.bankCard}
          onPress={() => setDefaultPaymentMethod(method.id)}
          activeOpacity={0.7}
        >
          <View style={[styles.bankLogo, { backgroundColor: method.brandColor }]}> 
            <Text style={styles.bankLogoText}>
              {method.name.split(' ')[0].substring(0, 3).toUpperCase()}
            </Text>
          </View>
          <View style={styles.bankInfo}>
            <Text style={styles.bankName}>{method.name}</Text>
            <Text style={styles.bankNumber}>**** {method.lastFour}</Text>
          </View>
          {method.isDefault ? (
            <View style={styles.checkCircle}>
              <View style={styles.checkCircleInner} />
            </View>
          ) : (
            <View style={styles.radioEmpty} />
          )}
        </TouchableOpacity>
      ));

  const handleAddPaymentMethod = () => {
    if (!newMethodName.trim() || !newMethodNumber.trim()) {
      Alert.alert('Error', 'Harap isi semua field.');
      return;
    }
    const lastFour = newMethodNumber.trim().slice(-4);
    const brandColors: Record<string, string> = {
      bank: '#0047AB',
      card: '#1A3C6E',
      ewallet: '#34C759',
    };
    addPaymentMethod({
      type: newMethodType,
      name: newMethodName.trim(),
      lastFour: lastFour,
      brandColor: brandColors[newMethodType],
      isDefault: false,
    });
    setNewMethodName('');
    setNewMethodNumber('');
    setNewMethodType('bank');
    setShowAddModal(false);
  };

  const getInitials = (name: string) => {
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft color={Colors.primary} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
        <View style={styles.profileAvatar}>
          <Text style={styles.profileAvatarText}>{getInitials(user.name)}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>PAYMENT ECOSYSTEM</Text>
          <Text style={styles.pageTitle}>Metode Pembayaran</Text>
        </View>

        {/* Balance Card */}
        <LinearGradient
          colors={['#002653', '#1A3C6E']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          {/* Noise overlay effect */}
          <View style={styles.noiseOverlay} />

          <View style={styles.balanceTop}>
            <View>
              <Text style={styles.balanceLabel}>AVAILABLE BALANCE</Text>
              <View style={styles.balanceAmountRow}>
                <Text style={styles.balanceCurrency}>Rp</Text>
                <Text style={styles.balanceValue}>{formatCurrency(user.balance)}</Text>
              </View>
            </View>
            <View style={styles.tierBadge}>
              <Award color="#291800" size={14} />
              <Text style={styles.tierBadgeText}>Gold Tier</Text>
            </View>
          </View>

          <View style={styles.balanceBottom}>
            <View>
              <Text style={styles.vaLabel}>PARKITB VIRTUAL ACCOUNT</Text>
              <Text style={styles.vaNumber}>8801 • 0123 • 4567 • 8901</Text>
            </View>
            <TouchableOpacity
              style={styles.topUpButton}
              onPress={() => router.push('/top-up')}
            >
              <PlusCircle color="#FFFFFF" size={14} />
              <Text style={styles.topUpButtonText}>Top Up</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* QRIS Row */}
        <TouchableOpacity style={styles.qrisCard} activeOpacity={0.7}>
          <View style={styles.qrisLeft}>
            <View style={styles.qrisIconBox}>
              <QrCode color={Colors.primary} size={28} />
            </View>
            <View>
              <Text style={styles.qrisTitle}>QRIS Pembayaran</Text>
              <Text style={styles.qrisSubtitle}>Pay instantly with any digital wallet</Text>
            </View>
          </View>
          <ChevronRight color="#747780" size={22} />
        </TouchableOpacity>

        {/* Linked Accounts + Cards Grid */}
        <View style={styles.paymentGrid}>
          {/* Linked Accounts */}
          <View style={styles.linkedSection}>
            <Text style={styles.subSectionLabel}>LINKED ACCOUNTS</Text>
            {linkedAccountItems}
          </View>

          {/* Cards */}
          {cardMethods.length > 0 && (
            <View style={styles.cardsSection}>
              <Text style={styles.subSectionLabel}>CARDS</Text>
              {cardMethods.map((card) => (
                <View key={card.id} style={styles.creditCard}>
                  {/* Decorative circle */}
                  <View style={styles.creditCardDecoration} />
                  <View style={styles.creditCardTop}>
                    <CreditCard color={Colors.primary} size={22} />
                    <Text style={styles.creditCardBrand}>{card.name}</Text>
                  </View>
                  <View style={styles.creditCardBottom}>
                    <Text style={styles.creditCardNumber}>**** **** **** {card.lastFour}</Text>
                    <Text style={styles.creditCardHolder}>{user.name.toUpperCase()}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Add Payment Method Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowAddModal(true)}
        >
          <Plus color="#43474F" size={22} />
          <Text style={styles.addButtonText}>Add New Payment Method</Text>
        </TouchableOpacity>

        {/* Security Banner */}
        <View style={styles.securityBanner}>
          <Shield color="#392200" size={22} />
          <View style={styles.securityTextContainer}>
            <Text style={styles.securityTitle}>Secure Transactions</Text>
            <Text style={styles.securityDescription}>
              Your payment information is encrypted with bank-grade security protocols through the ParkITB Gateway.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Add Payment Method Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowAddModal(false)}
          />
          <View style={styles.modalContent}>
            {/* Modal Handle */}
            <View style={styles.modalHandle} />

            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tambah Metode Pembayaran</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X color={Colors.textMuted} size={24} />
              </TouchableOpacity>
            </View>

            {/* Payment Type Selector */}
            <Text style={styles.fieldLabel}>Jenis Pembayaran</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[styles.typeOption, newMethodType === 'bank' && styles.typeOptionActive]}
                onPress={() => setNewMethodType('bank')}
              >
                <Landmark
                  color={newMethodType === 'bank' ? Colors.primary : Colors.textMuted}
                  size={20}
                />
                <Text
                  style={[styles.typeOptionText, newMethodType === 'bank' && styles.typeOptionTextActive]}
                >
                  Bank
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeOption, newMethodType === 'card' && styles.typeOptionActive]}
                onPress={() => setNewMethodType('card')}
              >
                <CreditCard
                  color={newMethodType === 'card' ? Colors.primary : Colors.textMuted}
                  size={20}
                />
                <Text
                  style={[styles.typeOptionText, newMethodType === 'card' && styles.typeOptionTextActive]}
                >
                  Kartu
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeOption, newMethodType === 'ewallet' && styles.typeOptionActive]}
                onPress={() => setNewMethodType('ewallet')}
              >
                <Smartphone
                  color={newMethodType === 'ewallet' ? Colors.primary : Colors.textMuted}
                  size={20}
                />
                <Text
                  style={[
                    styles.typeOptionText,
                    newMethodType === 'ewallet' && styles.typeOptionTextActive,
                  ]}
                >
                  E-Wallet
                </Text>
              </TouchableOpacity>
            </View>

            {/* Method Name */}
            <Text style={styles.fieldLabel}>
              {newMethodType === 'bank' ? 'Nama Bank' : newMethodType === 'card' ? 'Nama Kartu' : 'Nama E-Wallet'}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={
                newMethodType === 'bank'
                  ? 'Contoh: Bank Mandiri'
                  : newMethodType === 'card'
                  ? 'Contoh: Visa Platinum'
                  : 'Contoh: GoPay'
              }
              value={newMethodName}
              onChangeText={setNewMethodName}
              placeholderTextColor={Colors.textMuted}
            />

            {/* Account / Card Number */}
            <Text style={styles.fieldLabel}>
              {newMethodType === 'bank' ? 'Nomor Rekening' : newMethodType === 'card' ? 'Nomor Kartu' : 'Nomor Telepon'}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={
                newMethodType === 'bank'
                  ? 'Contoh: 1234567890'
                  : newMethodType === 'card'
                  ? 'Contoh: 4111111111118821'
                  : 'Contoh: 08123456789'
              }
              value={newMethodNumber}
              onChangeText={setNewMethodNumber}
              keyboardType="numeric"
              placeholderTextColor={Colors.textMuted}
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleAddPaymentMethod}>
              <Text style={styles.submitButtonText}>Tambah Metode Pembayaran</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.l,
    height: 64,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
  },
  backButton: {
    padding: Spacing.s,
    borderRadius: Radius.full,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: '#E7E8EA',
    borderWidth: 2,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileAvatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: Colors.primary,
  },
  scrollContent: {
    paddingHorizontal: Spacing.l,
    paddingBottom: 120,
    paddingTop: Spacing.l,
  },

  // Section Header
  sectionHeader: {
    marginBottom: Spacing.l,
  },
  sectionLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#747780',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  pageTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    color: '#002653',
    letterSpacing: -0.8,
  },

  // Balance Card
  balanceCard: {
    borderRadius: 24,
    padding: Spacing.l + 8,
    marginBottom: Spacing.m,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 38, 83, 0.15)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 8,
  },
  noiseOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.02,
  },
  balanceTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 48,
  },
  balanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(171, 199, 255, 0.7)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  balanceAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  balanceCurrency: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: 'rgba(171, 199, 255, 0.8)',
  },
  balanceValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  tierBadge: {
    backgroundColor: '#FFDDB4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tierBadgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#291800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  balanceBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  vaLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(171, 199, 255, 0.7)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  vaNumber: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  topUpButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  topUpButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#FFFFFF',
  },

  // QRIS Card
  qrisCard: {
    backgroundColor: '#FFFFFF',
    padding: Spacing.l,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 208, 0.15)',
    shadowColor: 'rgba(0, 38, 83, 0.04)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 2,
  },
  qrisLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  qrisIconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#EDEEF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrisTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#002653',
  },
  qrisSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#43474F',
    marginTop: 2,
  },

  // Payment Grid
  paymentGrid: {
    gap: Spacing.m,
    marginBottom: Spacing.m,
  },
  linkedSection: {
    gap: Spacing.m,
  },
  subSectionLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    color: '#747780',
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginLeft: 4,
  },

  // Bank Cards
  bankCard: {
    backgroundColor: '#FFFFFF',
    padding: Spacing.m,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 208, 0.15)',
    shadowColor: 'rgba(0, 38, 83, 0.02)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 1,
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  bankLogoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 11,
    color: '#FFFFFF',
  },
  bankInfo: {
    flex: 1,
  },
  bankName: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: Colors.textDark,
  },
  bankNumber: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#43474F',
    marginTop: 2,
  },
  bankPlaceholderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
    backgroundColor: '#F3F5F9',
    padding: Spacing.m,
    borderRadius: 16,
    marginBottom: Spacing.m,
  },
  bankLogoPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#D9DDE6',
  },
  bankInfoPlaceholder: {
    flex: 1,
  },
  bankNamePlaceholder: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#6C7284',
  },
  bankNumberPlaceholder: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9AA1B5',
    marginTop: 2,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkCircleInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  radioEmpty: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C4C6D0',
  },

  // Credit Card
  cardsSection: {
    gap: Spacing.m,
  },
  creditCard: {
    backgroundColor: '#F2F4F6',
    padding: Spacing.m,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(196, 198, 208, 0.1)',
    overflow: 'hidden',
    aspectRatio: 1.6,
    justifyContent: 'space-between',
  },
  creditCardDecoration: {
    position: 'absolute',
    top: -32,
    right: -32,
    width: 96,
    height: 96,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(0, 38, 83, 0.05)',
  },
  creditCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  creditCardBrand: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#747780',
    opacity: 0.6,
  },
  creditCardBottom: {
    zIndex: 10,
  },
  creditCardNumber: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#43474F',
    letterSpacing: 2,
  },
  creditCardHolder: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: Colors.primary,
    textTransform: 'uppercase',
    marginTop: 4,
  },

  // Add Button
  addButton: {
    width: '100%',
    paddingVertical: Spacing.m,
    borderRadius: 20,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#C4C6D0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: Spacing.l,
  },
  addButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#43474F',
  },

  // Security Banner
  securityBanner: {
    backgroundColor: 'rgba(86, 54, 0, 0.1)',
    padding: 20,
    borderRadius: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#392200',
    flexDirection: 'row',
    gap: Spacing.m,
  },
  securityTextContainer: {
    flex: 1,
  },
  securityTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#392200',
    marginBottom: 2,
  },
  securityDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#43474F',
    lineHeight: 18,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: Spacing.l,
    paddingBottom: Spacing.xxl + 20,
    paddingTop: Spacing.m,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C4C6D0',
    alignSelf: 'center',
    marginBottom: Spacing.l,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.l,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  fieldLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#43474F',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.s,
    marginTop: Spacing.m,
  },
  typeSelector: {
    flexDirection: 'row',
    gap: Spacing.s,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.divider,
    backgroundColor: '#F8F9FB',
  },
  typeOptionActive: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(26, 60, 110, 0.05)',
  },
  typeOptionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: Colors.textMuted,
  },
  typeOptionTextActive: {
    color: Colors.primary,
  },
  textInput: {
    backgroundColor: '#F8F9FB',
    borderWidth: 1.5,
    borderColor: Colors.divider,
    borderRadius: 12,
    paddingHorizontal: Spacing.m,
    paddingVertical: 14,
    fontFamily: 'Inter-Regular',
    fontSize: 15,
    color: Colors.textDark,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.m,
    borderRadius: Radius.full,
    alignItems: 'center',
    marginTop: Spacing.l,
  },
  submitButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: '#FFFFFF',
  },
});
