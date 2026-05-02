import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Radius } from './_constants/theme';
import { MapPin } from 'lucide-react-native';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <MapPin color={Colors.accent} size={64} />
          <Text style={styles.wordmark}>ParkITB</Text>
        </View>
        <Text style={styles.tagline}>Parkir cerdas, kampus lancar.</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.buttonText}>Mulai Sekarang</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.m,
  },
  wordmark: {
    ...Typography.h1,
    color: Colors.surface,
    fontSize: 40,
    marginTop: Spacing.m,
  },
  tagline: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontSize: 16,
  },
  footer: {
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  button: {
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.m,
    borderRadius: Radius.full,
    alignItems: 'center',
  },
  buttonText: {
    ...Typography.button,
    color: Colors.primary,
    fontSize: 16,
  },
});
