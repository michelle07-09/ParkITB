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
import { Colors, Typography, Spacing, Radius, Shadows } from './_constants/theme';
import { ArrowLeft, Car, Bike, Plus, Edit2, CheckCircle, Info, X, RefreshCw } from 'lucide-react-native';
import { useStore } from './_store/useStore';

export default function VehiclesScreen() {
  const router = useRouter();
  const { user, setVehicle, clearVehicle } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [newVehicleName, setNewVehicleName] = useState('');
  const [newVehiclePlate, setNewVehiclePlate] = useState('');
  const [newVehicleType, setNewVehicleType] = useState<'car' | 'motorcycle'>('car');
  const [isEditing, setIsEditing] = useState(false);

  const hasVehicle = user.vehicle !== null;

  const openAddModal = () => {
    setIsEditing(false);
    setNewVehicleName('');
    setNewVehiclePlate('');
    setNewVehicleType('car');
    setShowModal(true);
  };

  const openEditModal = () => {
    if (user.vehicle) {
      setIsEditing(true);
      setNewVehicleName(user.vehicle.name);
      setNewVehiclePlate(user.vehicle.plate);
      setNewVehicleType(user.vehicle.type);
      setShowModal(true);
    }
  };

  const handleSubmitVehicle = () => {
    if (!newVehicleName.trim() || !newVehiclePlate.trim()) {
      Alert.alert('Error', 'Harap isi semua field.');
      return;
    }
    setVehicle({
      name: newVehicleName.trim(),
      plate: newVehiclePlate.trim().toUpperCase(),
      type: newVehicleType,
      isPrimary: true,
      isVerified: false,
      lastUsed: isEditing ? (user.vehicle?.lastUsed || 'Baru diubah') : 'Baru ditambahkan',
    });
    setNewVehicleName('');
    setNewVehiclePlate('');
    setNewVehicleType('car');
    setShowModal(false);
  };

  const handleTryAdd = () => {
    if (hasVehicle) {
      Alert.alert(
        'Kendaraan Sudah Terdaftar',
        'Anda hanya dapat mendaftarkan 1 kendaraan. Apakah Anda ingin mengubah kendaraan yang sudah terdaftar?',
        [
          { text: 'Batal', style: 'cancel' },
          { text: 'Ubah Kendaraan', onPress: openEditModal },
        ]
      );
    } else {
      openAddModal();
    }
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
        <TouchableOpacity style={styles.moreButton}>
          <Text style={{ color: Colors.textMuted, fontSize: 20 }}>⋮</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Editorial Header */}
        <View style={styles.editorialHeader}>
          <Text style={styles.pageTitle}>Kendaraan Saya</Text>
          <Text style={styles.pageDescription}>
            Kelola kendaraan Anda untuk kemudahan akses parkir otomatis di seluruh area kampus.
          </Text>
        </View>

        {/* Vehicle Card or Empty State */}
        {hasVehicle && user.vehicle ? (
          <View style={styles.vehicleList}>
            {/* Vehicle Card */}
            <View style={styles.primaryCardWrapper}>
              <LinearGradient
                colors={['#1A3C6E', '#002653']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryCard}
              >
                <View style={styles.primaryCardTop}>
                  <View style={styles.primaryCardInfo}>
                    <View style={styles.primaryIconBox}>
                      {user.vehicle.type === 'motorcycle' ? (
                        <Bike color="#FFFFFF" size={28} strokeWidth={2} />
                      ) : (
                        <Car color="#FFFFFF" size={28} strokeWidth={2} />
                      )}
                    </View>
                    <View>
                      <View style={styles.primaryNameRow}>
                        <Text style={styles.primaryVehicleName}>{user.vehicle.name}</Text>
                        <View style={styles.primaryBadge}>
                          <Text style={styles.primaryBadgeText}>Terdaftar</Text>
                        </View>
                      </View>
                      <Text style={styles.primaryPlate}>{user.vehicle.plate}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={openEditModal}>
                    <Edit2 color="rgba(138, 168, 224, 0.8)" size={20} />
                  </TouchableOpacity>
                </View>

                <View style={styles.primaryCardBottom}>
                  <View>
                    <Text style={styles.primaryMetaLabel}>Status Verifikasi</Text>
                    <View style={styles.verifiedRow}>
                      {user.vehicle.isVerified ? (
                        <>
                          <CheckCircle color="#5FA6FD" size={14} />
                          <Text style={styles.verifiedText}>Terverifikasi</Text>
                        </>
                      ) : (
                        <Text style={styles.pendingText}>Menunggu verifikasi</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.primaryMetaRight}>
                    <Text style={styles.primaryMetaLabel}>Terakhir Digunakan</Text>
                    <Text style={styles.primaryMetaValue}>{user.vehicle.lastUsed}</Text>
                  </View>
                </View>
              </LinearGradient>

              {/* Decorative blur element */}
              <View style={styles.decorativeBlur} />
            </View>

            {/* Change Vehicle Button */}
            <TouchableOpacity
              style={styles.changeButton}
              onPress={openEditModal}
            >
              <RefreshCw color={Colors.primary} size={18} />
              <Text style={styles.changeButtonText}>Ubah Kendaraan</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Empty State — No Vehicle Registered */
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Car color={Colors.textMuted} size={40} />
            </View>
            <Text style={styles.emptyTitle}>Belum Ada Kendaraan</Text>
            <Text style={styles.emptyDescription}>
              Daftarkan kendaraan Anda untuk memulai akses parkir otomatis di kampus.
            </Text>
          </View>
        )}

        {/* Add / Register Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={hasVehicle ? handleTryAdd : openAddModal}
        >
          <View style={styles.addIconCircle}>
            {hasVehicle ? (
              <RefreshCw color={Colors.textMuted} size={22} />
            ) : (
              <Plus color={Colors.textMuted} size={24} />
            )}
          </View>
          <Text style={styles.addButtonTitle}>
            {hasVehicle ? 'Ganti Kendaraan' : 'Daftarkan Kendaraan'}
          </Text>
          <Text style={styles.addButtonSubtitle}>Maksimal 1 Kendaraan</Text>
        </TouchableOpacity>

        {/* Information Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <Info color="#E4980E" size={22} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Ketentuan Plat Nomor</Text>
              <Text style={styles.infoDescription}>
                Pastikan plat nomor sesuai dengan STNK yang berlaku. Perubahan data kendaraan membutuhkan waktu verifikasi maksimal 1x24 jam oleh tim operasional parkir.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add/Edit Vehicle Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowModal(false)}
          />
          <View style={styles.modalContent}>
            {/* Modal Handle */}
            <View style={styles.modalHandle} />

            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEditing ? 'Ubah Kendaraan' : 'Daftarkan Kendaraan'}
              </Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <X color={Colors.textMuted} size={24} />
              </TouchableOpacity>
            </View>

            {/* Vehicle Type Selector */}
            <Text style={styles.fieldLabel}>Jenis Kendaraan</Text>
            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[styles.typeOption, newVehicleType === 'car' && styles.typeOptionActive]}
                onPress={() => setNewVehicleType('car')}
              >
                <Car
                  color={newVehicleType === 'car' ? Colors.primary : Colors.textMuted}
                  size={24}
                />
                <Text
                  style={[styles.typeOptionText, newVehicleType === 'car' && styles.typeOptionTextActive]}
                >
                  Mobil
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeOption, newVehicleType === 'motorcycle' && styles.typeOptionActive]}
                onPress={() => setNewVehicleType('motorcycle')}
              >
                <Bike
                  color={newVehicleType === 'motorcycle' ? Colors.primary : Colors.textMuted}
                  size={24}
                />
                <Text
                  style={[
                    styles.typeOptionText,
                    newVehicleType === 'motorcycle' && styles.typeOptionTextActive,
                  ]}
                >
                  Motor
                </Text>
              </TouchableOpacity>
            </View>

            {/* Vehicle Name */}
            <Text style={styles.fieldLabel}>Nama Kendaraan</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: Honda Civic RS"
              value={newVehicleName}
              onChangeText={setNewVehicleName}
              placeholderTextColor={Colors.textMuted}
            />

            {/* Plate Number */}
            <Text style={styles.fieldLabel}>Plat Nomor</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: D 1234 ABC"
              value={newVehiclePlate}
              onChangeText={setNewVehiclePlate}
              autoCapitalize="characters"
              placeholderTextColor={Colors.textMuted}
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitVehicle}>
              <Text style={styles.submitButtonText}>
                {isEditing ? 'Simpan Perubahan' : 'Daftarkan Kendaraan'}
              </Text>
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
  moreButton: {
    padding: Spacing.s,
  },
  scrollContent: {
    paddingHorizontal: Spacing.l,
    paddingBottom: 120,
    paddingTop: Spacing.l,
  },
  editorialHeader: {
    marginBottom: Spacing.xl,
  },
  pageTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: Colors.primary,
    letterSpacing: -0.8,
    marginBottom: Spacing.s,
  },
  pageDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#43474F',
    lineHeight: 20,
    maxWidth: 300,
  },
  vehicleList: {
    gap: Spacing.m,
  },

  // Primary Vehicle Card
  primaryCardWrapper: {
    position: 'relative',
    overflow: 'visible',
  },
  primaryCard: {
    borderRadius: 16,
    padding: Spacing.l,
    gap: Spacing.l,
    zIndex: 10,
  },
  primaryCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  primaryCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.m,
  },
  primaryIconBox: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 12,
  },
  primaryNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.s,
    marginBottom: 4,
  },
  primaryVehicleName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    color: 'rgba(138, 168, 224, 1)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  primaryBadge: {
    backgroundColor: '#FFDDB4',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.full,
  },
  primaryBadgeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 10,
    color: '#291800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  primaryPlate: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#FFFFFF',
    letterSpacing: -2,
  },
  primaryCardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: Spacing.m,
  },
  primaryMetaLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(138, 168, 224, 0.6)',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  pendingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFB955',
  },
  primaryMetaRight: {
    alignItems: 'flex-end',
  },
  primaryMetaValue: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  decorativeBlur: {
    position: 'absolute',
    right: -48,
    top: -48,
    width: 192,
    height: 192,
    backgroundColor: '#2D7DD2',
    borderRadius: Radius.full,
    opacity: 0.2,
    zIndex: 1,
  },

  // Change Vehicle Button
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.s,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary,
    ...Shadows.soft,
  },
  changeButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: Colors.primary,
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.l,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#C4C6D0',
    marginBottom: Spacing.m,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: Radius.full,
    backgroundColor: '#EDEEF0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.m,
  },
  emptyTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  emptyDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#43474F',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 260,
  },

  // Add Button
  addButton: {
    marginTop: Spacing.l,
    width: '100%',
    paddingVertical: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#C4C6D0',
    alignItems: 'center',
    gap: Spacing.s,
  },
  addIconCircle: {
    width: 48,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: '#EDEEF0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: Colors.primary,
    letterSpacing: -0.3,
  },
  addButtonSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: '#43474F',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },

  // Info Card
  infoCard: {
    marginTop: Spacing.xxl,
    backgroundColor: 'rgba(86, 54, 0, 0.1)',
    padding: Spacing.l,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(57, 34, 0, 0.1)',
  },
  infoCardContent: {
    flexDirection: 'row',
    gap: Spacing.m,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: '#E4980E',
    marginBottom: 4,
  },
  infoDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#43474F',
    lineHeight: 20,
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
    gap: Spacing.m,
  },
  typeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.s,
    paddingVertical: Spacing.m,
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
    fontSize: 14,
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
