import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SPACING, BORDER_RADIUS } from "../constants/theme";
import { MOCK_SONGS, MOCK_ARTISTS } from "../constants/mockData";
import SongCard from "../components/SongCard";
import ArtistCard from "../components/ArtistCard";
import { useAuth } from "../context/AuthContext";

// Returns a greeting based on the current hour
function getTimeGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good Morning';
  if (hour >= 12 && hour < 17) return 'Good Afternoon';
  if (hour >= 17 && hour < 21) return 'Good Evening';
  return 'Good Night';
}

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const trendingSongs = MOCK_SONGS.slice(0, 3);
  const topArtists = MOCK_ARTISTS;

  // Pull display name from AuthContext
  const { user } = useAuth();
  const meta = user?.user_metadata || {};
  const displayName = meta.username || meta.full_name || user?.email?.split('@')[0] || 'there';
  const greeting = getTimeGreeting();

  const handlePlayTrack = (track) => {
    navigation.navigate("Player", { track });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
       
        <Text style={styles.headerTitle}>The Parlor</Text>
        <TouchableOpacity 
          style={styles.headerBtn} 
          onPress={() => navigation.navigate("Search")}
        >
          <Ionicons name="search-outline" size={24} color={COLORS.onSurface} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.dateText}>{greeting} ✦ MoodTune</Text>
          <Text style={styles.welcomeText}>Welcome back, {displayName}</Text>
          <View style={styles.quoteDivider} />
         
        </View>

        {/* Call to Action: Resonance Detection Card */}
        <View style={styles.resonanceCard}>
          <Text style={styles.resonanceTitle}>Music That Understands Your Vibe</Text>
          <Text style={styles.resonanceDesc}>
            Take a seat, breathe, and let us find the sounds that resonate with your inner world tonight. A private performance, just for you.
          </Text>
          <TouchableOpacity 
            style={styles.resonanceBtn}
            onPress={() => navigation.navigate("Mood")}
            activeOpacity={0.8}
          >
            <Text style={styles.resonanceBtnText}>Find My Resonance</Text>
            <Ionicons name="sparkles" size={16} color={COLORS.onPrimary} style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>

        {/* Steps section */}
        <View style={styles.stepsSection}>
          <Text style={styles.sectionTitle}>The Artisanal Path</Text>
          
          <View style={styles.stepItem}>
            <View style={styles.stepIconWrapper}>
              <Ionicons name="ear-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.stepTextWrapper}>
              <Text style={styles.stepNumber}>1. Listen</Text>
              <Text style={styles.stepDesc}>
                Share a whisper, a heartbeat, or simply the quiet of your room. We listen to the spaces between your words.
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepIconWrapper}>
              <Ionicons name="heart-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.stepTextWrapper}>
              <Text style={styles.stepNumber}>2. Feel</Text>
              <Text style={styles.stepDesc}>
                Our craft seeks the emotional resonance in every melody, aligning with the subtle nuances of your current heart-state.
              </Text>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepIconWrapper}>
              <Ionicons name="infinite-outline" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.stepTextWrapper}>
              <Text style={styles.stepNumber}>3. Connect</Text>
              <Text style={styles.stepDesc}>
                Receive a personalized, evolving soundscape that adapts to your journey and aligns with your creative flow.
              </Text>
            </View>
          </View>
        </View>

        {/* Trending Songs Section */}
        <View style={styles.listSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.listTitle}>Trending Tracks</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Playlist")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            horizontal
            data={trendingSongs}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <View style={styles.songCardWrapper}>
                <SongCard
                  song={item}
                  mode="vertical"
                  onPress={() => handlePlayTrack(item)}
                />
              </View>
            )}
          />
        </View>

        {/* Top Artists Section */}
        <View style={styles.listSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.listTitle}>Featured Artists</Text>
          </View>
          
          <FlatList
            horizontal
            data={topArtists}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalList}
            renderItem={({ item }) => (
              <ArtistCard
                artist={item}
                onPress={() => navigation.navigate("ArtistDetails", { artist: item })}
              />
            )}
          />
        </View>

        {/* Extra spacer for MiniPlayer padding */}
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
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingBottom: SPACING.md,
  },
  welcomeSection: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  dateText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  welcomeText: {
    color: COLORS.onSurface,
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 4,
  },
  quoteDivider: {
    width: 40,
    height: 2,
    backgroundColor: COLORS.primaryContainer,
    marginVertical: SPACING.sm,
  },
  quoteText: {
    color: COLORS.onSurfaceVariant,
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 24,
  },
  subtitleText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
  resonanceCard: {
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.xs,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    backgroundColor: COLORS.surfaceVariant,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
  },
  resonanceTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: SPACING.xs,
  },
  resonanceDesc: {
    color: COLORS.onSurfaceVariant,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: SPACING.sm,
  },
  resonanceBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: BORDER_RADIUS.lg,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  resonanceBtnText: {
    color: COLORS.onPrimary,
    fontSize: 15,
    fontWeight: "bold",
  },
  stepsSection: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    marginTop: SPACING.sm,
  },
  sectionTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: SPACING.sm,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: SPACING.sm,
    backgroundColor: COLORS.surface,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainer,
  },
  stepIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.surfaceContainerHighest,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.sm,
  },
  stepTextWrapper: {
    flex: 1,
  },
  stepNumber: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  stepDesc: {
    color: COLORS.onSurfaceVariant,
    fontSize: 12,
    lineHeight: 18,
  },
  listSection: {
    marginTop: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xs,
  },
  listTitle: {
    color: COLORS.onSurface,
    fontSize: 18,
    fontWeight: "bold",
  },
  seeAllText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  horizontalList: {
    paddingLeft: SPACING.md,
    paddingRight: SPACING.xs,
  },
  songCardWrapper: {
    width: 150,
    marginRight: SPACING.sm,
  },
});

export default HomeScreen;
