import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS } from "../constants/theme";

const SettingItem = ({ icon, title, subtitle, value, onToggle, type = "link" }) => (
  <TouchableOpacity style={styles.item} activeOpacity={0.7}>
    <View style={styles.itemLeft}>
      <View style={styles.iconWrapper}>
        <Ionicons name={icon} size={20} color={COLORS.primary} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.itemTitle}>{title}</Text>
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
      <Ionicons name="chevron-forward" size={18} color={COLORS.outline} />
    )}
  </TouchableOpacity>
);

const SettingScreen = () => {
  const [offlineMode, setOfflineMode] = useState(false);
  const [hifiAudio, setHifiAudio] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* User profile brief */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.avatarText}>A</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Alex</Text>
            <Text style={styles.profilePlan}>Premium Parlor Member</Text>
          </View>
        </View>

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

        <Text style={styles.sectionTitle}>Account</Text>
        <SettingItem icon="person-outline" title="Profile Details" />
        <SettingItem icon="log-out-outline" title="Log Out" />

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
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: COLORS.onPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    marginLeft: SPACING.sm,
  },
  profileName: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilePlan: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
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
  textWrapper: {
    flex: 1,
  },
  itemTitle: { color: COLORS.onSurface, fontSize: 14, fontWeight: "600" },
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
