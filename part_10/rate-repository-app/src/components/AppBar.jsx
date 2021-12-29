import React from "react";
import { View, StyleSheet } from "react-native";

import {theme} from "../themes";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: theme.sizes.appBarSize,
    backgroundColor: theme.colors.appBarColor,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text="Repositories" />
    </View>
  );
};

export default AppBar;
