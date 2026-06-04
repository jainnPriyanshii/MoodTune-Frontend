import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { MOCK_SONGS, MOCK_PLAYLISTS } from '../constants/mockData';

const PlaylistScreen = ({ navigation }) => {
  const playlist = MOCK_PLAYLISTS[0]; // Relaxed Evening playlist metadata
  const playlistTracks = MOCK_SONGS.filter(song => song.vibe === '😊 Relaxed Evening');
  const [favorites, setFavorites] = useState(['1', '3']); // local mock favorites

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleTrackPress = (track) => {
    navigation.navigate('Player', { track });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mood Playlist</Text>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="ellipsis-vertical-outline" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={playlistTracks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            {/* Playlist Banner Card */}
            <View style={styles.bannerCard}>
              <View style={styles.badgeRow}>
                <Ionicons name="sparkles" size={14} color={COLORS.onPrimary} />
                <Text style={styles.badgeText}>AI Mood-Curated</Text>
              </View>
              <Text style={styles.vibeTitle}>😊 Relaxed Evening</Text>
              <Text style={styles.vibeQuote}>"{playlist.tagline}"</Text>

              {/* Confidence scores display */}
              <View style={styles.confidenceSection}>
                <Text style={styles.confidenceSectionTitle}>AI Vibe Confidence</Text>
                <View style={styles.metersRow}>
                  {/* Happy Meter */}
                  <View style={styles.meterContainer}>
                    <View style={styles.meterLabels}>
                      <Text style={styles.meterLabelText}>Happy</Text>
                      <Text style={styles.meterValueText}>{playlist.confidence.happy}</Text>
                    </View>
                    <View style={styles.meterBarOuter}>
                      <View style={[styles.meterBarInner, { width: playlist.confidence.happy }]} />
                    </View>
                  </View>

                  {/* Neutral Meter */}
                  <View style={styles.meterContainer}>
                    <View style={styles.meterLabels}>
                      <Text style={styles.meterLabelText}>Neutral</Text>
                      <Text style={styles.meterValueText}>{playlist.confidence.neutral}</Text>
                    </View>
                    <View style={styles.meterBarOuter}>
                      <View style={[styles.meterBarInner, { width: playlist.confidence.neutral, backgroundColor: COLORS.secondary }]} />
                    </View>
                  </View>

                  {/* Surprise Meter */}
                  <View style={styles.meterContainer}>
                    <View style={styles.meterLabels}>
                      <Text style={styles.meterLabelText}>Surprise</Text>
                      <Text style={styles.meterValueText}>{playlist.confidence.surprise}</Text>
                    </View>
                    <View style={styles.meterBarOuter}>
                      <View style={[styles.meterBarInner, { width: playlist.confidence.surprise, backgroundColor: COLORS.tertiary }]} />
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.titleSection}>
              <Text style={styles.sectionTitle}>Hand-Picked for Your Vibe</Text>
              <Text style={styles.sectionSubtitle}>A collection that matches your evening flow.</Text>
            </View>
          </View>
        }
        renderItem={({ item, index }) => {
          const isFav = favorites.includes(item.id);
          return (
            <TouchableOpacity 
              style={styles.trackItem}
              onPress={() => handleTrackPress(item)}
              activeOpacity={0.7}
            >
              {/* Index or Album cover */}
              <Image source={{ uri: item.image }} style={styles.trackImage} />
              
              {/* Play symbol overlay helper */}
              <View style={styles.trackPlayIndicator}>
                <Ionicons name="play" size={14} color={COLORS.white} />
              </View>

              {/* Title & Artist */}
              <View style={styles.trackInfo}>
                <Text style={styles.trackTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.trackArtist} numberOfLines={1}>{item.artist}</Text>
              </View>

              {/* Duration and Favorite button */}
              <View style={styles.trackRight}>
                <Text style={styles.trackDuration}>{item.duration}</Text>
                <TouchableOpacity 
                  style={styles.favBtn}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Ionicons 
                    name={isFav ? "heart" : "heart-outline"} 
                    size={22} 
                    color={isFav ? COLORS.primary : COLORS.outline} 
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainer,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: "bold",
  },
  listHeader: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  bannerCard: {
    backgroundColor: COLORS.surfaceVariant,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    marginBottom: SPACING.md,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.full,
    alignSelf: 'flex-start',
    marginBottom: SPACING.xs,
  },
  badgeText: {
    color: COLORS.onPrimary,
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  vibeTitle: {
    color: COLORS.onSurface,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vibeQuote: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: SPACING.sm,
  },
  confidenceSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.outlineVariant,
    paddingTop: SPACING.sm,
    marginTop: SPACING.xs,
  },
  confidenceSectionTitle: {
    color: COLORS.secondary,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: SPACING.xs,
  },
  metersRow: {
    flexDirection: 'column',
  },
  meterContainer: {
    marginBottom: SPACING.xs,
  },
  meterLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  meterLabelText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    fontWeight: '500',
  },
  meterValueText: {
    color: COLORS.onSurface,
    fontSize: 11,
    fontWeight: 'bold',
  },
  meterBarOuter: {
    height: 4,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: BORDER_RADIUS.full,
    overflow: 'hidden',
  },
  meterBarInner: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
  },
  titleSection: {
    marginVertical: SPACING.xs,
  },
  sectionTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    marginTop: 2,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs + 4,
    paddingHorizontal: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainer,
  },
  trackImage: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  trackPlayIndicator: {
    position: 'absolute',
    left: SPACING.md + 14,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackInfo: {
    flex: 1,
    marginLeft: SPACING.sm,
    paddingRight: SPACING.xs,
  },
  trackTitle: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  trackArtist: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
  },
  trackRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackDuration: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    marginRight: SPACING.sm,
  },
  favBtn: {
    padding: 4,
  },
});

export default PlaylistScreen;
