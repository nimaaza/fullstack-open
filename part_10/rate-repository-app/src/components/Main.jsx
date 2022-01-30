import React from "react";
import { StyleSheet, View } from "react-native";
import { Redirect, Route, Switch } from "react-router-native";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import Review from "./Review";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    width: 512,
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
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signout">
          <SignOut />
        </Route>
        <Route path="/review">
          <Review />
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
