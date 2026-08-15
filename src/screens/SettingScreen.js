import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS } from "../constants/theme";
import { supabase } from "../config/supabase";
import { useAuth } from "../context/AuthContext";

// ─────────────────────────────────────────────
// Reusable setting row
// ─────────────────────────────────────────────
const SettingItem = ({ icon, title, subtitle, value, onToggle, type = "link", onPress, danger }) => (
  <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.itemLeft}>
      <View style={[styles.iconWrapper, danger && styles.iconWrapperDanger]}>
        <Ionicons name={icon} size={20} color={danger ? (COLORS.error || '#BA1A1A') : COLORS.primary} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={[styles.itemTitle, danger && styles.itemTitleDanger]}>{title}</Text>
        {subtitle && <Text style={styles.itemSubtitle}>{subtitle}</Text>}
      </View>
    </View>
    {type === "switch" ? (
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: COLORS.surfaceContainerHighest, true: COLORS.primaryContainer }}
        thumbColor={value ? COLORS.primary : COLORS.outline}
        ios_backgroundColor={COLORS.surfaceContainerLowest}
      />
    ) : (
      <Ionicons
        name="chevron-forward"
        size={18}
        color={danger ? (COLORS.error || '#BA1A1A') : COLORS.outline}
      />
    )}
  </TouchableOpacity>
);

// ─────────────────────────────────────────────
// Screen
// ─────────────────────────────────────────────
const SettingScreen = ({ navigation }) => {
  const [offlineMode, setOfflineMode] = useState(false);
  const [hifiAudio, setHifiAudio] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // Pull user from global AuthContext — no individual Supabase call needed
  const { user } = useAuth();
  const meta = user?.user_metadata || {};
  const username = meta.username || meta.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const avatarChar = username.charAt(0).toUpperCase();

  const handleLogOut = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: async () => {
            setLoggingOut(true);
            try {
              await supabase.auth.signOut();
              // AuthContext's onAuthStateChange will clear user state;
              // navigate explicitly to Login to reset the stack
              navigation.replace('Login');
            } catch {
              Alert.alert('Error', 'Failed to log out. Please try again.');
            } finally {
              setLoggingOut(false);
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* ── User profile card ── */}
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Profile')}
        >
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>{avatarChar}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{username}</Text>
            <Text style={styles.profileEmail} numberOfLines={1}>{userEmail}</Text>
            <Text style={styles.profilePlan}>Premium Parlor Member</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.outline} style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* ── Audio Experience ── */}
        <Text style={styles.sectionTitle}>Audio Experience</Text>
        <SettingItem
          icon="musical-notes-outline"
          title="Streaming Quality"
          subtitle="Hi-Fi Lossless Acoustics"
        />
        <SettingItem
          icon="cloud-download-outline"
          title="Download Quality"
          subtitle="Very High (320kbps)"
        />
        <SettingItem
          icon="volume-high-outline"
          title="Enable Hi-Fi Master Audio"
          type="switch"
          value={hifiAudio}
          onToggle={setHifiAudio}
        />

        {/* ── Storage & Offline ── */}
        <Text style={styles.sectionTitle}>Storage & Offline</Text>
        <SettingItem
          icon="trash-outline"
          title="Clear Cache"
          subtitle="Free up space (Currently 124 MB)"
        />
        <SettingItem
          icon="cloud-offline-outline"
          title="Offline Mode"
          subtitle="Only play downloaded content"
          type="switch"
          value={offlineMode}
          onToggle={setOfflineMode}
        />

        {/* ── Preferences ── */}
        <Text style={styles.sectionTitle}>Preferences</Text>
        <SettingItem
          icon="notifications-outline"
          title="Push Notifications"
          type="switch"
          value={notifications}
          onToggle={setNotifications}
        />
        <SettingItem
          icon="shield-checkmark-outline"
          title="Privacy & Security"
        />

        {/* ── Account ── */}
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingItem
          icon="person-outline"
          title="Profile Details"
          subtitle="Edit your name and info"
          onPress={() => navigation.navigate('Profile')}
        />
        <SettingItem
          icon="log-out-outline"
          title={loggingOut ? 'Logging out…' : 'Log Out'}
          onPress={handleLogOut}
          danger
        />

        <View style={styles.footer}>
          <Text style={styles.footerVersion}>MoodTune v1.0.0 (Artisanal Build)</Text>
          <Text style={styles.footerCredits}>Designed with Love for Acoustic Lovers</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainer,
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  // Profile card — now tappable
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: SPACING.sm,
  },
  profileAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    color: COLORS.onPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: SPACING.sm,
    flex: 1,
  },
  profileName: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    marginTop: 1,
  },
  profilePlan: {
    color: COLORS.primary,
    fontSize: 11,
    marginTop: 3,
    fontWeight: '500',
  },
  sectionTitle: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.surfaceContainer,
  },
  itemLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  iconWrapperDanger: {
    backgroundColor: 'rgba(186, 26, 26, 0.1)',
  },
  textWrapper: { flex: 1 },
  itemTitle: { color: COLORS.onSurface, fontSize: 14, fontWeight: "600" },
  itemTitleDanger: { color: COLORS.error || '#BA1A1A' },
  itemSubtitle: { color: COLORS.outline, fontSize: 11, marginTop: 2 },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    paddingVertical: SPACING.md,
  },
  footerVersion: {
    color: COLORS.outline,
    fontSize: 11,
    fontWeight: '600',
  },
  footerCredits: {
    color: COLORS.outlineVariant,
    fontSize: 10,
    marginTop: 4,
  },
});

export default SettingScreen;
