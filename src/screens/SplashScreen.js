import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONTS } from '../constants/theme';
import { useAuth } from '../context/AuthContext';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const [progress] = useState(new Animated.Value(0));
  const [animDone, setAnimDone] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(1));

  // Session is already resolved by AuthContext (loading=false by the time
  // SplashScreen renders), so we just read it directly — no async call needed.
  const { session } = useAuth();
  const destination = session ? 'MainTabs' : 'Login';

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      setAnimDone(true);
    });
  }, []);

  const handleBegin = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      navigation.replace(destination);
    });
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <SafeAreaView style={styles.content}>
        {/* Ambient Glow */}
        <View style={styles.glow} />

        {/* Branding Group */}
        <View style={styles.brandContainer}>
          <View style={styles.logoWrapper}>
            <View style={styles.logoCircleOuter}>
              <View style={styles.logoCircleInner}>
                <Ionicons name="musical-notes" size={54} color={COLORS.onPrimary} />
              </View>
            </View>
          </View>
          <Text style={styles.title}>MoodTune</Text>
          <Text style={styles.subtitle}>Music for Every Mood</Text>
        </View>

        {/* Bottom indicator / Action */}
        <View style={styles.bottomContainer}>
          {!animDone ? (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBar}>
                <Animated.View style={[styles.loadingFill, { width: progressWidth }]} />
              </View>
              <Text style={styles.loadingText}>Tuning to your feelings...</Text>
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleBegin} activeOpacity={0.8}>
              <Text style={styles.buttonText}>
                {destination === 'MainTabs' ? 'Continue Listening' : 'Tap to Begin'}
              </Text>
              <View style={styles.buttonCircle}>
                <Ionicons name="chevron-forward" size={18} color={COLORS.onPrimary} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
  },
  glow: {
    position: 'absolute',
    top: '30%',
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    backgroundColor: 'rgba(232, 191, 150, 0.08)',
    transform: [{ scale: 1.2 }],
  },
  brandContainer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
  },
  logoWrapper: {
    marginBottom: SPACING.md,
  },
  logoCircleOuter: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(232, 191, 150, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircleInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 8,
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: FONTS.display,
    letterSpacing: -0.5,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 18,
    fontFamily: FONTS.body,
    fontWeight: '400',
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  loadingContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loadingBar: {
    width: '80%',
    height: 4,
    backgroundColor: COLORS.surfaceContainerHighest,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
    marginBottom: SPACING.xs,
  },
  loadingFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
  },
  loadingText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: SPACING.xs + 4,
    paddingLeft: SPACING.md,
    paddingRight: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
    width: '80%',
    shadowColor: COLORS.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: COLORS.onPrimaryContainer,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  buttonCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
