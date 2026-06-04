import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, BORDER_RADIUS } from "../constants/theme";

const SongCard = ({ song, onPress, mode = "horizontal" }) => {
  if (mode === "vertical") {
    return (
      <TouchableOpacity style={styles.verticalContainer} onPress={onPress} activeOpacity={0.7}>
        <Image source={{ uri: song.image }} style={styles.verticalImage} />
        <Text style={styles.verticalTitle} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.verticalArtist} numberOfLines={1}>
          {song.artist}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: song.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.artist} numberOfLines={1}>
          {song.artist}
        </Text>
      </View>
      <View style={styles.playIconWrapper}>
        <Ionicons name="play" size={16} color={COLORS.onPrimary} style={{ marginLeft: 2 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Horizontal (default row layout)
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    padding: 10,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainer,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    color: COLORS.onSurface,
    fontSize: 15,
    fontWeight: "bold",
  },
  artist: {
    color: COLORS.onSurfaceVariant,
    fontSize: 13,
    marginTop: 2,
  },
  playIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  // Vertical (column layout for horizontal lists)
  verticalContainer: {
    width: 140,
    backgroundColor: COLORS.surface,
    padding: 8,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.surfaceContainer,
  },
  verticalImage: {
    width: 122,
    height: 122,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  verticalTitle: {
    color: COLORS.onSurface,
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 8,
    paddingHorizontal: 2,
  },
  verticalArtist: {
    color: COLORS.onSurfaceVariant,
    fontSize: 11,
    marginTop: 2,
    paddingHorizontal: 2,
  },
});

export default SongCard;
