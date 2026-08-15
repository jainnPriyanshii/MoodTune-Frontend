import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { supabase } from '../config/supabase';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

// ─────────────────────────────────────────────
// Small stat pill used in the stats strip
// ─────────────────────────────────────────────
const StatPill = ({ icon, label, value }) => (
  <View style={styles.statPill}>
    <Ionicons name={icon} size={18} color={COLORS.primary} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// ─────────────────────────────────────────────
// Read-only info row
// ─────────────────────────────────────────────
const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconWrapper}>
      <Ionicons name={icon} size={18} color={COLORS.primary} />
    </View>
    <View style={styles.infoTextGroup}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '—'}</Text>
    </View>
  </View>
);

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────
const ProfileScreen = ({ navigation }) => {
  const { user } = useAuth();

  // Derive initial values from context
  const meta = user?.user_metadata || {};
  const initialUsername = meta.username || meta.full_name || user?.email?.split('@')[0] || '';
  const userEmail = user?.email || '';
  const createdAt = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';
  const avatarChar = initialUsername.charAt(0).toUpperCase() || '?';

  // Local edit state
  const [username, setUsername] = useState(initialUsername);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Subtle avatar pulse animation
  const [pulseAnim] = useState(new Animated.Value(1));
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.06, duration: 2000, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const handleSave = async () => {
    if (!username.trim()) {
      Alert.alert('Validation', 'Username cannot be empty.');
      return;
    }
    if (username.trim() === initialUsername) {
      Alert.alert('No Changes', 'Your username is already up to date.');
      return;
    }

    setSaving(true);
    setSaveSuccess(false);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { username: username.trim() },
      });

      if (error) {
        Alert.alert('Update Failed', error.message || 'Could not save changes.');
        return;
      }

      setSaveSuccess(true);
      // Auto-dismiss success badge after 2.5s
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const isDirty = username.trim() !== initialUsername;

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={22} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        {/* Spacer to center the title */}
        <View style={{ width: 38 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── Avatar Hero ── */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarGlow} />
          <Animated.View style={[styles.avatarOuter, { transform: [{ scale: pulseAnim }] }]}>
            <View style={styles.avatarInner}>
              <Text style={styles.avatarChar}>{avatarChar}</Text>
            </View>
          </Animated.View>
          <Text style={styles.displayName}>{username || userEmail}</Text>
          <Text style={styles.displayEmail}>{userEmail}</Text>

          {/* Member badge */}
          <View style={styles.badge}>
            <Ionicons name="musical-note" size={12} color={COLORS.onPrimary} />
            <Text style={styles.badgeText}>Premium Parlor Member</Text>
          </View>
        </View>

        {/* ── Stats Strip ── */}
        <View style={styles.statsStrip}>
          <StatPill icon="calendar-outline" label="Member Since" value={createdAt} />
          <View style={styles.statDivider} />
          <StatPill icon="person-circle-outline" label="Account" value="Premium" />
          <View style={styles.statDivider} />
          <StatPill icon="shield-checkmark-outline" label="Status" value="Active" />
        </View>

        {/* ── Edit Username ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Edit Profile</Text>
          <Text style={styles.cardSubtitle}>Update your display name</Text>

          <View style={styles.inputLabelContainer}>
            <Text style={styles.inputLabel}>Username</Text>
          </View>
          <View style={[styles.inputWrapper, isDirty && styles.inputWrapperActive]}>
            <Ionicons
              name="person-outline"
              size={18}
              color={isDirty ? COLORS.primary : COLORS.outline}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              placeholderTextColor={COLORS.outline}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              maxLength={30}
            />
            {isDirty && (
              <TouchableOpacity onPress={() => setUsername(initialUsername)} style={styles.clearBtn}>
                <Ionicons name="close-circle" size={18} color={COLORS.outline} />
              </TouchableOpacity>
            )}
          </View>

          {/* ── Save Button ── */}
          <TouchableOpacity
            style={[
              styles.saveBtn,
              !isDirty && styles.saveBtnDisabled,
              saveSuccess && styles.saveBtnSuccess,
            ]}
            onPress={handleSave}
            activeOpacity={0.8}
            disabled={saving || !isDirty}
          >
            {saving ? (
              <ActivityIndicator size="small" color={COLORS.onPrimary} />
            ) : saveSuccess ? (
              <>
                <Ionicons name="checkmark-circle" size={18} color={COLORS.onPrimary} style={{ marginRight: 8 }} />
                <Text style={styles.saveBtnText}>Saved!</Text>
              </>
            ) : (
              <>
                <Text style={styles.saveBtnText}>Save Changes</Text>
                <View style={styles.saveBtnIcon}>
                  <Ionicons name="checkmark" size={16} color={COLORS.onPrimary} />
                </View>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* ── Read-only Info ── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Details</Text>
          <Text style={styles.cardSubtitle}>Information from your account</Text>

          <InfoRow icon="mail-outline" label="Email Address" value={userEmail} />
          <InfoRow icon="calendar-outline" label="Member Since" value={createdAt} />
          <InfoRow icon="finger-print-outline" label="User ID" value={user?.id ? `…${user.id.slice(-8)}` : '—'} />
          <InfoRow icon="lock-closed-outline" label="Auth Provider" value="Email & Password" />
        </View>

        {/* ── Danger Zone ── */}
        <View style={[styles.card, styles.dangerCard]}>
          <Text style={[styles.cardTitle, styles.dangerTitle]}>Danger Zone</Text>
          <TouchableOpacity
            style={styles.dangerBtn}
            activeOpacity={0.8}
            onPress={() =>
              Alert.alert(
                'Change Password',
                'A password reset link will be sent to your email address.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Send Link',
                    onPress: async () => {
                      if (userEmail) {
                        await supabase.auth.resetPasswordForEmail(userEmail);
                        Alert.alert('Sent!', 'Check your inbox for the reset link.');
                      }
                    },
                  },
                ]
              )
            }
          >
            <Ionicons name="key-outline" size={18} color={COLORS.error || '#BA1A1A'} />
            <Text style={styles.dangerBtnText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.error || '#BA1A1A'} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainer,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: 'bold',
  },

  scrollContent: {
    paddingHorizontal: SPACING.sm,
    paddingTop: SPACING.md,
  },

  // Avatar Hero
  avatarSection: {
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  avatarGlow: {
    position: 'absolute',
    top: SPACING.lg,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(232, 191, 150, 0.12)',
  },
  avatarOuter: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: 'rgba(232, 191, 150, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  avatarInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  avatarChar: {
    color: COLORS.onPrimary,
    fontSize: 38,
    fontWeight: 'bold',
  },
  displayName: {
    color: COLORS.onSurface,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  displayEmail: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    marginBottom: SPACING.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 5,
    borderRadius: BORDER_RADIUS.full,
    gap: 5,
  },
  badgeText: {
    color: COLORS.onPrimary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // Stats Strip
  statsStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: SPACING.sm,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  statPill: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    color: COLORS.onSurface,
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
  statLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.outlineVariant,
  },

  // Cards
  card: {
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  cardTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    marginBottom: SPACING.sm,
  },

  // Input
  inputLabelContainer: {
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
    marginBottom: SPACING.sm,
  },
  inputWrapperActive: {
    borderColor: COLORS.primary,
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
  clearBtn: {
    padding: 4,
  },

  // Save button
  saveBtn: {
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
  },
  saveBtnDisabled: {
    opacity: 0.4,
  },
  saveBtnSuccess: {
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    gap: 8,
  },
  saveBtnText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 15,
    fontWeight: 'bold',
  },
  saveBtnIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Info rows
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.surfaceContainer,
  },
  infoIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  infoTextGroup: {
    flex: 1,
  },
  infoLabel: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    marginBottom: 2,
  },
  infoValue: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '500',
  },

  // Danger zone
  dangerCard: {
    borderColor: 'rgba(186, 26, 26, 0.3)',
  },
  dangerTitle: {
    color: COLORS.error || '#BA1A1A',
  },
  dangerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  dangerBtnText: {
    flex: 1,
    color: COLORS.error || '#BA1A1A',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ProfileScreen;
