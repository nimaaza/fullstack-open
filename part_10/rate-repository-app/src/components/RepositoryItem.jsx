import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";

import { styles } from "../themes";

const customStyles = StyleSheet.create({
  card: {
    marginVertical: 8,
  },
  logoMargin: {
    marginHorizontal: 16,
  },
  bottomRow: {
    justifyContent: "space-around",
  },
  bottomRowBoxes: {
    alignItems: "center",
  },
});

const RepositoryItem = ({ item }) => {
  const withKSuffix = (n) => {
    if (n < 1000) {
      return String(n);
    } else {
      return Math.ceil(n / 100) / 10 + "k";
    }
  };

  return (
    <View style={[styles.column, customStyles.card]}>
      <View style={styles.row}>
        <Image
          source={{ uri: item.ownerAvatarUrl }}
          style={[styles.smallAvatar, customStyles.logoMargin]}
        />
        <View style={styles.column}>
          <Text style={styles.headerText}>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Text style={styles.tagText}>{item.language}</Text>
        </View>
      </View>

      <View style={[styles.row, customStyles.bottomRow]}>
        <View style={[styles.colum, customStyles.bottomRowBoxes]}>
          <Text style={styles.boldText}>
            {withKSuffix(item.stargazersCount)}
          </Text>
          <Text>Stars</Text>
        </View>

        <View style={[styles.colum, customStyles.bottomRowBoxes]}>
          <Text style={styles.boldText}>{withKSuffix(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>

        <View style={[styles.colum, customStyles.bottomRowBoxes]}>
          <Text style={styles.boldText}>{withKSuffix(item.reviewCount)}</Text>
          <Text>Review</Text>
        </View>

        <View style={[styles.colum, customStyles.bottomRowBoxes]}>
          <Text style={styles.boldText}>{withKSuffix(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
