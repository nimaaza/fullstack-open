import { Formik } from "formik";
import React, { useState } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import * as yup from "yup";
import { useMutation } from "@apollo/client";

import FormikTextInput from "./FormikTextInput";
import { theme } from "../themes";
import { CREATE_REVIEW } from "../graphql/mutations";
import { Redirect } from "react-router-native";

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

const Review = () => {
  const [mutate] = useMutation(CREATE_REVIEW, {});
  const [redirectAfterSubmit, setRedirectAfterSubmit] = useState(null);

  const initialValues = {
    ownerName: "",
    repositoryName: "",
    rating: "",
    text: "",
  };

  const ReviewForm = ({ onSubmit }) => {
    return (
      <React.Fragment>
        <FormikTextInput name="ownerName" placeholder="Repository's owner" />
        <FormikTextInput
          name="repositoryName"
          placeholder="Repository's name"
        />
        <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
        <FormikTextInput name="text" placeholder="Review" multiline={true} />
        <Pressable onPress={onSubmit}>
          <Text style={submitButtonStyle.submitButton}>Submit</Text>
        </Pressable>
      </React.Fragment>
    );
  };

  const validationSchema = yup.object().shape({
    ownerName: yup.string().required("Username is required."),
    repositoryName: yup.string().required("Repository name is required."),
    rating: yup
      .number()
      .required("Rating is required.")
      .integer("Rating should be an integer.")
      .lessThan(101, "Rating should be between 0 and 100.")
      .positive("Rating should be positive"),
  });

  const onSubmit = async (values) => {
    values.rating = Number(values.rating);
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await mutate({
        variables: {
          review: { ownerName, repositoryName, rating, text },
        },
      });

      setRedirectAfterSubmit(`/repository/${data.repositoryId}`);
    } catch (error) {
      console.log(error);
      setRedirectAfterSubmit("/");
    }
  };

  if (redirectAfterSubmit) {
    return <Redirect to={redirectAfterSubmit} />;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default Review;
