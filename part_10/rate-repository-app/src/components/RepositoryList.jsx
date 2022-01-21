import React from "react";
import { FlatList, View, Pressable } from "react-native";
import { Redirect } from "react-router-native";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { styles } from "../themes";

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => <Redirect to={`/repository/${item.id}`} />}>
          <RepositoryItem item={item} />
        </Pressable>
      )}
    />
  );
};

export default RepositoryList;
