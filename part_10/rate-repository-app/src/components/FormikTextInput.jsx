import React from "react";
import { StyleSheet, Text } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";

const styles = StyleSheet.create({
  inputText: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    height: 40,
    margin: 8,
    padding: 4,
  },

  errorText: {
    marginTop: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.inputText}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
