import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { supabase } from '../config/supabase';

const { width } = Dimensions.get('window');

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    // Basic validation
    if (!username.trim()) {
      setError('Please enter a username.');
      return;
    }
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Sign up — email confirmation disabled on Supabase dashboard, so session is returned immediately
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { username: username.trim() },
          // Pass emailRedirectTo as undefined to avoid triggering email flow
        },
      });

      if (signUpError) {
        setError(signUpError.message || 'Sign up failed. Please try again.');
        return;
      }

      // If session is immediately available, auto-login (email confirmation disabled)
      if (data?.session) {
        navigation.replace('MainTabs');
        return;
      }

      // Fallback: try signing in immediately after signup
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (loginError) {
        // If auto-login fails redirect to login to let the user sign in manually
        navigation.replace('Login');
        return;
      }

      navigation.replace('MainTabs');
    } catch (err) {
      setError('Something went wrong. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header section */}
          <View style={styles.header}>
            <View style={styles.logoWrapper}>
              <Ionicons name="musical-notes" size={36} color={COLORS.onPrimary} />
            </View>
            <Text style={styles.title}>MoodTune</Text>
            <Text style={styles.subtitle}>Begin your acoustic self-reflection</Text>
          </View>

          {/* Form Card */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>Create Account</Text>
            <Text style={styles.cardSubheader}>Join our sanctuary for musical soul-searching</Text>

            {/* Error Banner */}
            {error ? (
              <View style={styles.errorBanner}>
                <Ionicons name="alert-circle-outline" size={16} color={COLORS.error} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            {/* Input Username */}
            <View style={styles.inputLabelContainer}>
              <Text style={styles.inputLabel}>Username</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={18} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Choose a username"
                placeholderTextColor={COLORS.outline}
                value={username}
                onChangeText={(v) => { setUsername(v); setError(''); }}
                autoCapitalize="none"
              />
            </View>

            {/* Input Email */}
            <View style={styles.inputLabelContainer}>
              <Text style={styles.inputLabel}>Email Address</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={18} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.outline}
                keyboardType="email-address"
                value={email}
                onChangeText={(v) => { setEmail(v); setError(''); }}
                autoCapitalize="none"
              />
            </View>

            {/* Input Password */}
            <View style={styles.inputLabelContainer}>
              <Text style={styles.inputLabel}>Password</Text>
            </View>
            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={18} color={COLORS.outline} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Choose a strong password (min. 6 chars)"
                placeholderTextColor={COLORS.outline}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(v) => { setPassword(v); setError(''); }}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={18}
                  color={COLORS.outline}
                />
              </TouchableOpacity>
            </View>

            {/* Signup Action Button */}
            <TouchableOpacity
              style={[styles.signUpBtn, loading && styles.btnDisabled]}
              onPress={handleSignUp}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={COLORS.onPrimaryContainer} />
              ) : (
                <Text style={styles.signUpBtnText}>Create Account</Text>
              )}
              <View style={styles.arrowIconWrapper}>
                {loading ? (
                  <ActivityIndicator size="small" color={COLORS.onPrimary} />
                ) : (
                  <Ionicons name="arrow-forward" size={16} color={COLORS.onPrimary} />
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Login Link footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
              <Text style={styles.loginLinkText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  logoWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.xs,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    marginTop: 2,
  },
  card: {
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  cardHeader: {
    color: COLORS.onSurface,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardSubheader: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginBottom: SPACING.sm,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(186, 26, 26, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(186, 26, 26, 0.3)',
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 10,
    marginBottom: SPACING.sm,
    gap: 8,
  },
  errorText: {
    color: COLORS.error || '#BA1A1A',
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  inputLabelContainer: {
    marginTop: SPACING.xs + 2,
    marginBottom: 6,
  },
  inputLabel: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainer,
    height: 48,
    marginBottom: SPACING.xs,
  },
  inputIcon: {
    marginRight: SPACING.xs,
  },
  input: {
    flex: 1,
    color: COLORS.onSurface,
    fontSize: 14,
    height: '100%',
  },
  eyeBtn: {
    padding: 4,
  },
  signUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: SPACING.xs,
    paddingLeft: SPACING.md,
    paddingRight: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    height: 48,
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: SPACING.sm,
  },
  btnDisabled: {
    opacity: 0.7,
  },
  signUpBtnText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 15,
    fontWeight: 'bold',
  },
  arrowIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  footerText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
  },
  loginLinkText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
