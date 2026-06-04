import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, BORDER_RADIUS, SPACING } from '../constants/theme';
import { MOCK_SONGS } from '../constants/mockData';

const MiniPlayer = () => {
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Show the first mock song in the miniplayer
  const track = MOCK_SONGS[0];

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Player', { track })}
    >
      <Image source={{ uri: track.image }} style={styles.albumArt} />

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{track.title}</Text>
        <Text style={styles.artist} numberOfLines={1}>{track.artist}</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity 
          style={styles.playBtn}
          onPress={(e) => {
            e.stopPropagation(); // prevent navigation on button tap
            setIsPlaying(!isPlaying);
          }}
        >
          <Ionicons name={isPlaying ? "pause" : "play"} size={22} color={COLORS.onPrimary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 60, // Sits exactly above the 60px bottom tab bar
    left: SPACING.xs,
    right: SPACING.xs,
    height: 64,
    backgroundColor: COLORS.surfaceVariant,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    elevation: 8,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  albumArt: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.sm,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.onSurface,
  },
  artist: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  controls: {
    paddingRight: SPACING.xs,
  },
  playBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MiniPlayer;