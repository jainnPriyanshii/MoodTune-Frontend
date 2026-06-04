import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { MOCK_SONGS } from '../constants/mockData';

const { width } = Dimensions.get('window');

const PlayerScreen = ({ route, navigation }) => {
  // Use passed track, or default to the first mock song
  const selectedTrack = route.params?.track || MOCK_SONGS[0];

  const [playerMode, setPlayerMode] = useState('digital'); // 'digital' or 'analog'
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [position, setPosition] = useState(102); // 1:42 in seconds
  const [volume, setVolume] = useState(0.8);

  const spinValue = useRef(new Animated.Value(0)).current;
  const timerRef = useRef(null);

  // Handle vinyl spinning animation in analog mode
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    } else {
      spinValue.stopAnimation();
    }
  }, [isPlaying, playerMode]);

  // Simulate progress playback
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setPosition((prev) => {
          if (prev >= selectedTrack.durationSeconds) {
            return 0; // loop
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const skipForward = () => {
    setPosition((prev) => Math.min(prev + 10, selectedTrack.durationSeconds));
  };

  const skipBackward = () => {
    setPosition((prev) => Math.max(prev - 10, 0));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Switcher Tabs */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-down-outline" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        
        {/* Toggle between Digital and Analog Modes */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleTab, playerMode === 'digital' && styles.toggleTabActive]}
            onPress={() => setPlayerMode('digital')}
          >
            <Text style={[styles.toggleText, playerMode === 'digital' && styles.toggleTextActive]}>Digital</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleTab, playerMode === 'analog' && styles.toggleTabActive]}
            onPress={() => setPlayerMode('analog')}
          >
            <Text style={[styles.toggleText, playerMode === 'analog' && styles.toggleTextActive]}>Analog</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="share-social-outline" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
      </View>

      {/* Main Content Area */}
      <View style={styles.mainContent}>
        {playerMode === 'digital' ? (
          /* DIGITAL MODE DESIGN */
          <View style={styles.digitalContainer}>
            {/* Album Artwork Card */}
            <View style={styles.artworkWrapper}>
              <Image source={{ uri: selectedTrack.image }} style={styles.albumArt} />
            </View>

            {/* Song Meta Details */}
            <View style={styles.metaContainer}>
              <View style={styles.metaTextWrapper}>
                <Text style={styles.songTitle} numberOfLines={1}>{selectedTrack.title}</Text>
                <Text style={styles.artistName} numberOfLines={1}>{selectedTrack.artist}</Text>
              </View>
              <TouchableOpacity style={styles.favIconBtn} onPress={() => setIsFav(!isFav)}>
                <Ionicons
                  name={isFav ? "heart" : "heart-outline"}
                  size={26}
                  color={isFav ? COLORS.primary : COLORS.onSurface}
                />
              </TouchableOpacity>
            </View>

            {/* Progress / Seek bar */}
            <View style={styles.progressContainer}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={selectedTrack.durationSeconds}
                value={position}
                onValueChange={(val) => setPosition(Math.floor(val))}
                minimumTrackTintColor={COLORS.primary}
                maximumTrackTintColor={COLORS.surfaceContainerHighest}
                thumbTintColor={COLORS.primary}
              />
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Text style={styles.timeText}>{selectedTrack.duration}</Text>
              </View>
            </View>

            {/* Play controls */}
            <View style={styles.controlsRow}>
              <TouchableOpacity>
                <Ionicons name="shuffle" size={22} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>

              <TouchableOpacity onPress={skipBackward}>
                <Ionicons name="play-skip-back" size={28} color={COLORS.onSurface} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.playButton}
                onPress={() => setIsPlaying(!isPlaying)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={32}
                  color={COLORS.onPrimary}
                  style={!isPlaying ? { marginLeft: 4 } : null}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={skipForward}>
                <Ionicons name="play-skip-forward" size={28} color={COLORS.onSurface} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Ionicons name="repeat" size={22} color={COLORS.onSurfaceVariant} />
              </TouchableOpacity>
            </View>

            {/* Bottom Volume Slider & Action Bar */}
            <View style={styles.bottomSection}>
              <View style={styles.volumeRow}>
                <Ionicons name="volume-mute-outline" size={16} color={COLORS.outline} />
                <Slider
                  style={styles.volumeSlider}
                  minimumValue={0}
                  maximumValue={1}
                  value={volume}
                  onValueChange={setVolume}
                  minimumTrackTintColor={COLORS.secondary}
                  maximumTrackTintColor={COLORS.surfaceContainerHighest}
                  thumbTintColor={COLORS.secondary}
                />
                <Ionicons name="volume-high-outline" size={16} color={COLORS.outline} />
              </View>

              <View style={styles.actionButtonsRow}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="playlist-add-outline" size={20} color={COLORS.onSurface} />
                  <Text style={styles.actionBtnText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="radio-outline" size={20} color={COLORS.onSurface} />
                  <Text style={styles.actionBtnText}>Vibe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="list-outline" size={20} color={COLORS.onSurface} />
                  <Text style={styles.actionBtnText}>Queue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          /* ANALOG LISTENING ROOM DESIGN */
          <View style={styles.analogContainer}>
            <Text style={styles.roomSubtitle}>Analog Listening Room</Text>

            {/* Turntable spinner graphic */}
            <View style={styles.turntableWrapper}>
              <View style={styles.turntableBase}>
                <Animated.View style={[styles.vinylRecord, { transform: [{ rotate: spin }] }]}>
                  {/* Concentric rings mock */}
                  <View style={styles.vinylRings}>
                    <View style={styles.vinylCenterLabel}>
                      <Image source={{ uri: selectedTrack.image }} style={styles.vinylCenterArt} />
                    </View>
                  </View>
                </Animated.View>
                {/* Tone arm visualization */}
                <View style={[styles.toneArm, isPlaying ? styles.toneArmOnRecord : styles.toneArmRest]} />
              </View>
            </View>

            {/* Minimal metadata text */}
            <View style={styles.analogMetaContainer}>
              <Text style={styles.analogSongTitle}>{selectedTrack.title}</Text>
              <Text style={styles.analogArtistName}>{selectedTrack.artist}</Text>
            </View>

            {/* Vintage style seek/timeline */}
            <View style={styles.vintageTimelineContainer}>
              <View style={styles.vintageTimelineBar}>
                <View style={[styles.vintageTimelineFill, { width: `${(position / selectedTrack.durationSeconds) * 100}%` }]} />
              </View>
              <View style={styles.vintageTimeRow}>
                <Text style={styles.vintageTimeText}>{formatTime(position)}</Text>
                <Text style={styles.vintageTimeText}>{selectedTrack.duration}</Text>
              </View>
            </View>

            {/* Simple play control row */}
            <View style={styles.analogControlsRow}>
              <TouchableOpacity onPress={skipBackward} style={styles.analogControlBtn}>
                <Ionicons name="play-skip-back" size={24} color={COLORS.onSurface} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.analogPlayBtn}
                onPress={() => setIsPlaying(!isPlaying)}
              >
                <Ionicons
                  name={isPlaying ? "pause" : "play"}
                  size={28}
                  color={COLORS.primary}
                  style={!isPlaying ? { marginLeft: 3 } : null}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={skipForward} style={styles.analogControlBtn}>
                <Ionicons name="play-skip-forward" size={24} color={COLORS.onSurface} />
              </TouchableOpacity>
            </View>

            <View style={styles.analogFooter}>
              <Ionicons name="heart-outline" size={16} color={COLORS.outline} />
              <Text style={styles.analogFooterText}>Authentic Acoustic Session</Text>
              <Ionicons name="disc-outline" size={16} color={COLORS.outline} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    padding: 2,
    borderRadius: BORDER_RADIUS.full,
  },
  toggleTab: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
  },
  toggleTabActive: {
    backgroundColor: COLORS.primaryContainer,
  },
  toggleText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: COLORS.onPrimaryContainer,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
  },
  digitalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.xs,
  },
  artworkWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    maxHeight: width - 60,
  },
  albumArt: {
    width: width - 60,
    height: width - 60,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SPACING.sm,
  },
  metaTextWrapper: {
    flex: 1,
    marginRight: SPACING.xs,
  },
  songTitle: {
    color: COLORS.onSurface,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artistName: {
    color: COLORS.onSurfaceVariant,
    fontSize: 15,
  },
  favIconBtn: {
    padding: 4,
  },
  progressContainer: {
    marginVertical: SPACING.xs,
  },
  slider: {
    width: '100%',
    height: 30,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  timeText: {
    color: COLORS.outline,
    fontSize: 12,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
    marginVertical: SPACING.sm,
  },
  playButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  bottomSection: {
    marginTop: SPACING.sm,
  },
  volumeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  volumeSlider: {
    flex: 1,
    height: 20,
    marginHorizontal: SPACING.xs,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: COLORS.surfaceContainer,
    paddingTop: SPACING.sm,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionBtnText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 10,
    marginTop: 4,
  },
  analogContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  roomSubtitle: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: SPACING.xs,
  },
  turntableWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  turntableBase: {
    width: width - 80,
    height: width - 80,
    backgroundColor: COLORS.surfaceVariant,
    borderRadius: BORDER_RADIUS.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.outlineVariant,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    position: 'relative',
  },
  vinylRecord: {
    width: width - 120,
    height: width - 120,
    borderRadius: (width - 120) / 2,
    backgroundColor: COLORS.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.black,
  },
  vinylRings: {
    width: '90%',
    height: '90%',
    borderRadius: 500,
    borderWidth: 1.5,
    borderColor: '#110f0e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vinylCenterLabel: {
    width: '35%',
    height: '35%',
    borderRadius: 100,
    backgroundColor: COLORS.primaryContainer,
    borderWidth: 3,
    borderColor: COLORS.black,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  vinylCenterArt: {
    width: '100%',
    height: '100%',
  },
  toneArm: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 60,
    height: 120,
    borderWidth: 3,
    borderColor: COLORS.outline,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 20,
    transform: [{ rotate: '5deg' }],
  },
  toneArmOnRecord: {
    transform: [{ rotate: '25deg' }, { translateX: -15 }, { translateY: 15 }],
  },
  toneArmRest: {
    transform: [{ rotate: '5deg' }],
  },
  analogMetaContainer: {
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  analogSongTitle: {
    color: COLORS.onSurface,
    fontSize: 20,
    fontWeight: 'bold',
  },
  analogArtistName: {
    color: COLORS.primary,
    fontSize: 14,
    marginTop: 2,
  },
  vintageTimelineContainer: {
    width: '100%',
    marginVertical: SPACING.xs,
  },
  vintageTimelineBar: {
    height: 2,
    backgroundColor: COLORS.surfaceContainerHighest,
    width: '100%',
  },
  vintageTimelineFill: {
    height: '100%',
    backgroundColor: COLORS.secondary,
  },
  vintageTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  vintageTimeText: {
    color: COLORS.outline,
    fontSize: 10,
    fontWeight: 'bold',
  },
  analogControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SPACING.xs,
  },
  analogControlBtn: {
    padding: SPACING.sm,
  },
  analogPlayBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginHorizontal: SPACING.md,
  },
  analogFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  analogFooterText: {
    color: COLORS.outline,
    fontSize: 10,
    marginHorizontal: 6,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default PlayerScreen;
