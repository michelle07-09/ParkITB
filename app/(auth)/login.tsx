import { useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../_constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleLogin = async () => {
    // Validate inputs
    if (!email.trim()) {
      Alert.alert('Error', 'Email tidak boleh kosong');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Format email tidak valid');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Password tidak boleh kosong');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password minimal 8 karakter');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication success
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Error', 'Terjadi kesalahan saat login. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <MapPin color={Colors.primary} size={48} />
            <Text style={styles.title}>Masuk ke ParkITB</Text>
            <Text style={styles.subtitle}>Gunakan email kampus Anda</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="email@students.itb.ac.id"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Lupa Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, loading && styles.loginButtonDisabled]} 
              onPress={handleLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? 'Memproses...' : 'Masuk'}
              </Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>atau</Text>
              <View style={styles.divider} />
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Belum punya akun? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text style={styles.registerLink}>Daftar sekarang</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  title: {
    ...Typography.h1,
    marginTop: Spacing.m,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  form: {
    gap: Spacing.m,
  },
  inputContainer: {
    gap: Spacing.xs,
  },
  label: {
    ...Typography.caption,
    color: Colors.textDark,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.divider,
    borderRadius: Radius.input,
    padding: Spacing.m,
    ...Typography.body,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.m,
    borderRadius: Radius.full,
    alignItems: 'center',
    marginTop: Spacing.m,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    ...Typography.button,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.l,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.divider,
  },
  dividerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    paddingHorizontal: Spacing.m,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  registerLink: {
    ...Typography.body,
    color: Colors.secondary,
    fontWeight: '600',
  },
});
