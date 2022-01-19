import React from "react";
import { StyleSheet, View } from "react-native";
import { Redirect, Route, Switch } from "react-router-native";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    width: "100%",
    marginHorizontal: "auto",
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signout">
          <SignOut />
        </Route>
        <Route path="/repository/:id">
          <RepositoryItem single />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;
