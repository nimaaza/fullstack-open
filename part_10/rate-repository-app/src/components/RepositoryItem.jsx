import { useQuery } from "@apollo/client";
import React from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { Link } from "react-router-native";
import { useParams } from "react-router-native";
import { GET_REPOSITORY } from "../graphql/queries";
import * as Linking from "expo-linking";

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
  botton: {},
});

const RepositoryItem = ({ item, single }) => {
  const { id } = useParams();

  const withKSuffix = (n) => {
    if (n < 1000) {
      return String(n);
    } else {
      return Math.ceil(n / 100) / 10 + "k";
    }
  };

  if (single) {
    console.log(id);
    const { data, loading } = useQuery(GET_REPOSITORY, {
      variables: { repId: id },
    });

    if (loading) {
      return <Text>loading...</Text>;
    } else {
      item = data.repository;
    }
  }

  return (
    <View style={[styles.column, customStyles.card]}>
      <View style={styles.row}>
        {id ? null : (
          <Link to={`/repository/${item.id}`}>
            <Text>more</Text>
          </Link>
        )}
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
      {single ? (
        <Pressable onPress={() => Linking.openURL(item.url)}>
          <Text style={[styles.tagText]}>Open in GitHub</Text>
        </Pressable>
      ) : null}
    </View>
  );
};

export default RepositoryItem;
