import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

import { styles } from "../themes";

const customStyles = StyleSheet.create({
  tabBox: {
    padding: 10,
  },
});

const style = [styles.headerText, styles.lightColorText, customStyles.tabBox];

const AppBarTab = (props) => {
  return (
    <Pressable>
      <Text style={style}>{props.text}</Text>
    </Pressable>
  );
};

export default AppBarTab;
