import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { Link, Redirect } from "react-router-native";

import { styles } from "../themes";

const customStyles = StyleSheet.create({
  tabBox: {
    padding: 10,
  },
});

const style = [styles.headerText, styles.lightColorText, customStyles.tabBox];

const AppBarTab = (props) => {
  return (
    <Pressable onPress={() => <Redirect to={props.path} />}>
      <Link to={props.path}>
        <Text style={style}>{props.text}</Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
