import React from "react";
import { StyleSheet, Text } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import { theme } from "../themes";

const styles = StyleSheet.create({
  inputTextNormal: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 4,
    height: 40,
    margin: 8,
    padding: 4,
  },

  inputTextError: {
    borderColor: theme.colors.errorColor,
  },

  errorText: {
    marginTop: 5,
    color: theme.colors.errorColor,
    margin: 8,
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
        style={
          showError
            ? [styles.inputTextNormal, styles.inputTextError]
            : styles.inputTextNormal
        }
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
