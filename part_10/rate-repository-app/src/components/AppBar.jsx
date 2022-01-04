import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";

import { GET_AUTHORIZED_USER } from "../graphql/queries";
import { theme, styles } from "../themes";
import AppBarTab from "./AppBarTab";

const customStyles = StyleSheet.create({
  container: {
    paddingTop: theme.sizes.appBarSize,
    backgroundColor: theme.colors.appBarColor,
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(GET_AUTHORIZED_USER);

  if (loading) {
    return null;
  }

  return (
    <View style={[styles.row, customStyles.container]}>
      <ScrollView horizontal={true}>
        <AppBarTab text="Repositories" path="/" />
        {data && data.authorizedUser ? (
          <AppBarTab text="Sign Out" path="/signout" />
        ) : (
          <AppBarTab text="Sign In" path="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
