import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { MOCK_SONGS, MOCK_ARTISTS } from '../constants/mockData';
import SongCard from '../components/SongCard';
import ArtistCard from '../components/ArtistCard';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const lowerQuery = query.toLowerCase();
      
      const matchedSongs = MOCK_SONGS.filter(
        song => song.title.toLowerCase().includes(lowerQuery) || song.artist.toLowerCase().includes(lowerQuery)
      );

      const matchedArtists = MOCK_ARTISTS.filter(
        artist => artist.name.toLowerCase().includes(lowerQuery)
      );

      setFilteredSongs(matchedSongs);
      setFilteredArtists(matchedArtists);
    } else {
      setFilteredSongs([]);
      setFilteredArtists([]);
    }
  }, [query]);

  const handleSongPress = (track) => {
    navigation.navigate('Player', { track });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Search Input */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <View style={styles.searchBarWrapper}>
          <Ionicons name="search-outline" size={18} color={COLORS.outline} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search songs, artists, vibes..."
            placeholderTextColor={COLORS.outline}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={styles.clearBtn}>
              <Ionicons name="close-circle" size={18} color={COLORS.outline} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <FlatList
        data={[]}
        keyExtractor={() => 'dummy'}
        ListHeaderComponent={
          <View style={styles.resultsContainer}>
            {/* Artists Matches */}
            {filteredArtists.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Artists</Text>
                <FlatList
                  horizontal
                  data={filteredArtists}
                  keyExtractor={(item) => item.id}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.artistsRow}
                  renderItem={({ item }) => (
                    <ArtistCard
                      artist={item}
                      onPress={() => navigation.navigate('ArtistDetails', { artist: item })}
                    />
                  )}
                />
              </View>
            )}

            {/* Songs Matches */}
            {filteredSongs.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Songs</Text>
                <View style={styles.songsList}>
                  {filteredSongs.map((item) => (
                    <SongCard
                      key={item.id}
                      song={item}
                      onPress={() => handleSongPress(item)}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Empty Vibe Prompts */}
            {query.trim().length <= 1 && (
              <View style={styles.promptContainer}>
                <Ionicons name="disc-outline" size={64} color={COLORS.surfaceContainerHighest} style={{ marginBottom: SPACING.sm }} />
                <Text style={styles.promptTitle}>Discover Your Vibe</Text>
                <Text style={styles.promptDesc}>
                  Type a song title, artist name, or feel to begin your acoustic exploration.
                </Text>

                {/* Popular vibe pills */}
                <View style={styles.pillsRow}>
                  {['Mellow', 'Jazz', 'Acoustic', 'Chill', 'Coffee'].map((vibe) => (
                    <TouchableOpacity
                      key={vibe}
                      style={styles.vibePill}
                      onPress={() => setQuery(vibe)}
                    >
                      <Text style={styles.vibePillText}>#{vibe}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* No Results Fallback */}
            {query.trim().length > 1 && filteredSongs.length === 0 && filteredArtists.length === 0 && (
              <View style={styles.promptContainer}>
                <Ionicons name="alert-circle-outline" size={48} color={COLORS.outline} style={{ marginBottom: SPACING.sm }} />
                <Text style={styles.promptTitle}>No Resonance Found</Text>
                <Text style={styles.promptDesc}>
                  We couldn't find matching sounds for "{query}". Try checking the spelling or typing another vibe.
                </Text>
              </View>
            )}
          </View>
        }
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surfaceContainer,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.xs,
  },
  searchBarWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.full,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: COLORS.onSurface,
    fontSize: 14,
  },
  clearBtn: {
    padding: 2,
  },
  resultsContainer: {
    paddingTop: SPACING.md,
  },
  section: {
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    color: COLORS.onSurface,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: SPACING.md,
    marginBottom: SPACING.xs,
  },
  artistsRow: {
    paddingLeft: SPACING.md,
    paddingRight: SPACING.xs,
  },
  songsList: {
    paddingHorizontal: SPACING.md,
  },
  promptContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: 60,
  },
  promptTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  promptDesc: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: SPACING.xs,
  },
  vibePill: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BORDER_RADIUS.full,
    margin: 4,
  },
  vibePillText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SearchScreen;
