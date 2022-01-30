import React, { useState, useEffect } from "react";
import { FlatList, View, Pressable } from "react-native";
import { Redirect } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

import useRepositories from "../hooks/useRepositories";
import RepositoryItem from "./RepositoryItem";
import { styles } from "../themes";

const RepositoryList = () => {
  const [repos, setRepos] = useState([]);
  const [selectedSorting, setSelectedSorting] = useState("latest");

  let querySorting;
  if (selectedSorting === "latest") {
    querySorting = { orderDirection: "ASC", orderBy: "CREATED_AT" };
  } else if (selectedSorting === "highest") {
    querySorting = { orderDirection: "ASC", orderBy: "RATING_AVERAGE" };
  } else if (selectedSorting === "lowest") {
    querySorting = { orderDirection: "DESC", orderBy: "RATING_AVERAGE" };
  }

  const { repositories } = useRepositories(querySorting);

  useEffect(() => {
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];
    setRepos(repositoryNodes);
  }, [selectedSorting, repositories]);

  const RepositorySortPicker = () => {
    return (
      <Picker
        selectedValue={selectedSorting}
        onValueChange={(itemValue) => setSelectedSorting(itemValue)}
        mode="dialog"
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    );
  };

  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      data={repos}
      ListHeaderComponent={RepositorySortPicker}
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
