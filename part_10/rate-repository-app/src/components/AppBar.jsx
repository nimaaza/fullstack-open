import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import { theme, styles } from "../themes";
import AppBarTab from "./AppBarTab";

const customStyles = StyleSheet.create({
  container: {
    paddingTop: theme.sizes.appBarSize,
    backgroundColor: theme.colors.appBarColor,
  },
});

const AppBar = () => {
  return (
    <View style={[styles.row, customStyles.container]}>
      <ScrollView horizontal={true}>
        <AppBarTab text="Repositories" path="/" />
        <AppBarTab text="Sign In" path="/signin" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
