import { Formik } from "formik";
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import * as yup from "yup";
import { useHistory } from "react-router-native";
import { useApolloClient, useMutation } from "@apollo/client";

import { theme } from "../themes";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../hooks/useSignIn";
import useAuthStorage from "../hooks/useAuthStorage";
import { CREATE_USER } from "../graphql/mutations";

const submitButtonStyle = StyleSheet.create({
  submitButton: {
    backgroundColor: "#0366d6",
    borderRadius: 4,
    textAlign: "center",
    color: "white",
    height: 40,
    margin: 8,
    padding: 4,
    fontWeight: theme.fontWeights.bold,
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry={true}
      />
      <FormikTextInput
        name="confirmation"
        placeholder="Password confirmation"
        secureTextEntry={true}
      />
      <Pressable onPress={onSubmit}>
        <Text style={submitButtonStyle.submitButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();

  const initialValues = {
    username: "",
    password: "",
    confirmation: "",
  };

  const onSubmit = async ({ username, password }) => {
    const { data } = await signUp({
      variables: {
        user: {
          username,
          password,
        },
      },
    });

    if (data) {
      const signInData = await signIn({ username, password });

      if (signInData && signInData.authorize.accessToken) {
        await authStorage.setAccessToken(signInData.authorize.accessToken);
        apolloClient.resetStore();
        history.push("/");
      }
    }
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required.")
      .min(1, "Minimum length for username is 1 character.")
      .max(30, "Maximum length for username is 30 characters"),
    password: yup
      .string()
      .required("Password is required.")
      .min(5, "Minimum length for password is 5 characters.")
      .max(50, "Maximum length for password is 50 characters."),
    confirmation: yup
      .string()
      .required("Confirm your password.")
      .oneOf([yup.ref("password"), null], "Passwords don't match."),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
