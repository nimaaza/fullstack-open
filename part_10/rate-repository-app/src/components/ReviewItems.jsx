import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { format } from "date-fns";

import { styles } from "../themes";

const customStyles = StyleSheet.create({
  reviewText: {
    width: "50%",
  },

  rating: {
    color: "blue",
    fontWeight: "bold",
    borderColor: "blue",
    borderWidth: 2,
    textAlign: "center",
    textAlignVertical: "center",
    margin: "auto",
    padding: 8,
    borderRadius: "50%",
    marginRight: 16,
  },
});

const ReviewItems = ({ reviews }) => {
  const ItemSeparator = () => <View style={styles.separator} />;

  return (
    <FlatList
      ItemSeparatorComponent={ItemSeparator}
      data={reviews}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={customStyles.rating}>{item.rating}</Text>
          </View>

          <View style={styles.column}>
            <Text style={styles.boldText}>{item.user.username}</Text>
            <Text>{format(new Date(item.createdAt), 'dd.mm.yyyy')}</Text>
            <Text style={customStyles.reviewText}>{item.text}</Text>
          </View>
        </View>
      )}
    />
  );
};

export default ReviewItems;
