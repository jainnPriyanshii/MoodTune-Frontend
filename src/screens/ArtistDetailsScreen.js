import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS } from "../constants/theme";
import { MOCK_SONGS, MOCK_ARTISTS } from "../constants/mockData";
import SongCard from "../components/SongCard";

const ArtistDetailsScreen = ({ route, navigation }) => {
  // Use passed artist or fallback to the first mock artist
  const artist = route.params?.artist || MOCK_ARTISTS[0];
  
  // Find songs belonging to this artist
  const artistSongs = MOCK_SONGS.filter(song => song.artist === artist.name);

  const handleSongPress = (track) => {
    navigation.navigate("Player", { track });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Image Cover */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: artist.image }} style={styles.artistImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={COLORS.onSurface} />
          </TouchableOpacity>
        </View>

        {/* Artist Profile Details */}
        <View style={styles.infoContainer}>
          <Text style={styles.artistName}>{artist.name}</Text>
          <Text style={styles.followers}>{artist.followers || '1.2M Followers'}</Text>

          {artist.bio && <Text style={styles.bioText}>{artist.bio}</Text>}

          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={styles.playButton}
              onPress={() => {
                if (artistSongs.length > 0) handleSongPress(artistSongs[0]);
              }}
            >
              <Text style={styles.playButtonText}>Play First</Text>
              <Ionicons name="play" size={16} color={COLORS.onPrimary} style={{ marginLeft: 6 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Tracks Section */}
        <View style={styles.songsSection}>
          <Text style={styles.sectionTitle}>Popular Songs</Text>
          <View style={styles.songsList}>
            {artistSongs.length > 0 ? (
              artistSongs.map((item) => (
                <SongCard
                  key={item.id}
                  song={item}
                  onPress={() => handleSongPress(item)}
                />
              ))
            ) : (
              // Mock items if no tracks match
              [1, 2, 3].map((num) => (
                <SongCard
                  key={num}
                  song={{
                    id: `mock-${num}`,
                    title: `Acoustic Session #${num}`,
                    artist: artist.name,
                    image: artist.image,
                    duration: '4:15'
                  }}
                  onPress={() => handleSongPress({
                    id: `mock-${num}`,
                    title: `Acoustic Session #${num}`,
                    artist: artist.name,
                    image: artist.image,
                    duration: '4:15',
                    durationSeconds: 255
                  })}
                />
              ))
            )}
          </View>
        </View>

        {/* Padding spacer for MiniPlayer */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: SPACING.md,
  },
  imageContainer: {
    width: "100%",
    height: 320,
    position: 'relative',
  },
  artistImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
  infoContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    marginTop: -24,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: BORDER_RADIUS.xl,
    borderTopRightRadius: BORDER_RADIUS.xl,
  },
  artistName: {
    color: COLORS.onSurface,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  followers: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  bioText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: SPACING.md,
    width: '100%',
    justifyContent: 'center',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.xs,
  },
  playButtonText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontWeight: "bold",
  },
  followButton: {
    borderWidth: 1,
    borderColor: COLORS.outline,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: BORDER_RADIUS.full,
  },
  followButtonText: {
    color: COLORS.onSurface,
    fontSize: 14,
    fontWeight: "600",
  },
  songsSection: {
    marginTop: SPACING.xs,
  },
  sectionTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: SPACING.md,
    marginBottom: SPACING.xs,
  },
  songsList: {
    paddingHorizontal: SPACING.md,
  },
});

export default ArtistDetailsScreen;
