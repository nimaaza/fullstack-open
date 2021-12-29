import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const theme = {
  colors: {
    primaryTextColor: "#24292e",
    secondaryTextColor: "#586069",
    primaryColor: "#0366d6",
    appBarColor: "#24292e",
    lightTextColor: "white",
    darkTextColor: "black",
  },

  sizes: {
    appBarSize: Constants.statusBarHeight,

    smallAvatarSizes: {
      width: 50,
      height: 50,
      borderRadius: 8,
    },

    fontSizes: {
      body: 14,
      subheading: 16,
      heading: 18,
    },
  },

  fonts: {
    main: "System",
  },

  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

const styles = StyleSheet.create({
  smallAvatar: {
    width: theme.sizes.smallAvatarSizes.width,
    height: theme.sizes.smallAvatarSizes.height,
    borderRadius: theme.sizes.smallAvatarSizes.borderRadius,
  },

  lightColorText: {
    color: theme.colors.lightTextColor,
  },

  boldText: {
    fontWeight: theme.fontWeights.bold,
  },

  headerText: {
    fontSize: theme.sizes.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
  },

  row: {
    display: "flex",
    flexDirection: "row",
  },

  column: {
    display: "flex",
    flexDirection: "column",
  },

  tagText: {
    backgroundColor: "#0366d6",
    // width: "fit-content",
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginVertical: 4,
    color: "white",
    borderRadius: 4,
  },
});

export { theme, styles };
