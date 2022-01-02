import { Formik } from "formik";
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import * as yup from "yup";

import { theme } from "../themes";

import FormikTextInput from "./FormikTextInput";

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
      <Pressable onPress={onSubmit}>
        <Text style={submitButtonStyle.submitButton}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required."),
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

export default SignIn;
