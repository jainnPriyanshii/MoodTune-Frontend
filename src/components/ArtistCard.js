import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, BORDER_RADIUS } from "../constants/theme";

const ArtistCard = ({ artist, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Image source={{ uri: artist.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {artist.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 15,
    width: 100,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surfaceContainerHighest,
  },
  name: {
    color: COLORS.onSurface,
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ArtistCard;
