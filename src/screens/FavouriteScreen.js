import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { MOCK_SONGS } from '../constants/mockData';
import SongCard from '../components/SongCard';

const FavouriteScreen = ({ navigation }) => {
  // Mock favorites local state loaded from MOCK_SONGS (IDs: '1', '3')
  const [favoriteSongs, setFavoriteSongs] = useState(
    MOCK_SONGS.filter(song => ['1', '3'].includes(song.id))
  );

  const handleRemoveFavorite = (id) => {
    setFavoriteSongs(favoriteSongs.filter(song => song.id !== id));
  };

  const handleTrackPress = (track) => {
    navigation.navigate('Player', { track });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={favoriteSongs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-dislike-outline" size={64} color={COLORS.outline} style={{ marginBottom: SPACING.sm }} />
            <Text style={styles.emptyTitle}>Quiet in the Parlor</Text>
            <Text style={styles.emptyText}>You haven't favorited any tracks yet. Explore your recommendations to fill this space.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.cardWrapper}>
              <SongCard
                song={item}
                onPress={() => handleTrackPress(item)}
              />
            </View>
            <TouchableOpacity 
              style={styles.unfavBtn}
              onPress={() => handleRemoveFavorite(item.id)}
            >
              <Ionicons name="trash-outline" size={20} color={COLORS.outline} />
            </TouchableOpacity>
          </View>
        )}
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
    justifyContent: 'space-between',
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
  },
  headerTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  cardWrapper: {
    flex: 1,
  },
  unfavBtn: {
    width: 44,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.xs,
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainer,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    marginTop: 80,
  },
  emptyTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  emptyText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default FavouriteScreen;