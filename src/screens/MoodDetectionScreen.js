import React, { useState } from 'react';                                                                                                                                                                                                                                                                                                                                                                                                                                      
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { MOCK_REFLECTIONS } from '../constants/mockData';

const MoodDetectionScreen = ({ navigation }) => {
  const [reflectionText, setReflectionText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const startScan = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('Reflective & Calm (72%)');
    }, 2000);
  };

  const handleConnect = () => {
    // Navigate to Curated Soul Playlist
    navigation.navigate('Playlist');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mood Reflection</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.introSection}>
          <Text style={styles.title}>A Moment for Yourself</Text>
          <Text style={styles.subtitle}>Reflect on your mood through sight and words.</Text>
        </View>

        {/* Visual Reflection Camera Mock Card */}
        <View style={styles.cameraCard}>
          <View style={styles.cameraHeader}>
            <Ionicons name="eye-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cameraTitle}>Look Within</Text>
          </View>
          
          <View style={styles.cameraViewMock}>
            {isScanning ? (
              <View style={styles.scannerOverlay}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.scannerText}>Analyzing facial acoustics...</Text>
              </View>
            ) : scanResult ? (
              <View style={styles.scannerOverlay}>
                <Ionicons name="checkmark-circle-outline" size={48} color={COLORS.secondary} />
                <Text style={styles.scanResultText}>{scanResult}</Text>
              </View>
            ) : (
              <View style={styles.scannerOverlay}>
                <Ionicons name="camera-outline" size={48} color={COLORS.outline} />
                <Text style={styles.cameraPlaceholderText}>Ready for reflection scan</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.scanBtn}
            onPress={startScan}
            disabled={isScanning}
          >
            <Text style={styles.scanBtnText}>
              {isScanning ? 'Scanning...' : 'Capture Your Reflection'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Word Entry Input Area */}
        <View style={styles.inputSection}>
          <View style={styles.inputHeader}>
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
            <Text style={styles.inputTitle}>Express in Words</Text>
          </View>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            placeholder="An entry for today..."
            placeholderTextColor={COLORS.outline}
            value={reflectionText}
            onChangeText={setReflectionText}
          />
          <View style={styles.gentleNoteContainer}>
            <Ionicons name="information-circle-outline" size={16} color={COLORS.outline} style={{ marginRight: 6 }} />
            <Text style={styles.gentleNoteText}>
              Be gentle with yourself. Sharing your true self—both in sight and word—helps us find the music that speaks to you best.
            </Text>
          </View>
        </View>

        {/* Connect Action Button */}
        <TouchableOpacity
          style={styles.connectBtn}
          onPress={handleConnect}
          activeOpacity={0.8}
        >
          <Text style={styles.connectBtnText}>Connect with Music</Text>
          <Ionicons name="musical-note" size={18} color={COLORS.onPrimary} style={{ marginLeft: 8 }} />
        </TouchableOpacity>

        {/* Past Reflections Section */}
        <View style={styles.pastSection}>
          <Text style={styles.pastTitle}>Past Reflections</Text>
          <FlatList
            data={MOCK_REFLECTIONS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.reflectionItem}>
                <View style={styles.reflectionIconWrapper}>
                  <Ionicons name={item.icon} size={20} color={COLORS.secondary} />
                </View>
                <View style={styles.reflectionTextWrapper}>
                  <View style={styles.reflectionHeaderRow}>
                    <Text style={styles.reflectionMood}>{item.mood}</Text>
                    <Text style={styles.reflectionDate}>{item.date}</Text>
                  </View>
                  <Text style={styles.reflectionNote}>{item.note}</Text>
                </View>
              </View>
            )}
          />
        </View>

        {/* Padding spacer */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
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
    paddingBottom: SPACING.md,
  },
  introSection: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 26,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  cameraCard: {
    marginHorizontal: SPACING.md,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainer,
    marginBottom: SPACING.md,
  },
  cameraHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  cameraTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  cameraViewMock: {
    height: 180,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
  },
  scannerOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
  },
  scannerText: {
    color: COLORS.primary,
    fontSize: 13,
    marginTop: SPACING.xs,
  },
  scanResultText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: SPACING.xs,
  },
  cameraPlaceholderText: {
    color: COLORS.outline,
    fontSize: 13,
    marginTop: SPACING.xs,
  },
  scanBtn: {
    backgroundColor: COLORS.surfaceContainerHighest,
    paddingVertical: 12,
    borderRadius: BORDER_RADIUS.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  scanBtnText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
  inputSection: {
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  inputTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: SPACING.xs,
  },
  textInput: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.sm,
    color: COLORS.onSurface,
    fontSize: 14,
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  gentleNoteContainer: {
    flexDirection: 'row',
    marginTop: SPACING.xs,
    paddingHorizontal: SPACING.xs,
  },
  gentleNoteText: {
    flex: 1,
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    lineHeight: 16,
  },
  connectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    marginHorizontal: SPACING.md,
    paddingVertical: 14,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: SPACING.lg,
  },
  connectBtnText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  pastSection: {
    paddingHorizontal: SPACING.md,
  },
  pastTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: SPACING.sm,
  },
  reflectionItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainer,
    marginBottom: SPACING.xs,
  },
  reflectionIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.sm,
  },
  reflectionTextWrapper: {
    flex: 1,
  },
  reflectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  reflectionMood: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: '600',
  },
  reflectionDate: {
    color: COLORS.outline,
    fontSize: 10,
  },
  reflectionNote: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
  },
});

export default MoodDetectionScreen;
