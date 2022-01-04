import React from "react";
import { useApolloClient } from "@apollo/client";
import { Redirect } from "react-router-native";

import useAuthStorage from "../hooks/useAuthStorage";

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  signOut();

  return <Redirect to="/" />;
};

export default SignOut;
