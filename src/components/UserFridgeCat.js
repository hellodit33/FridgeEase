import { useState } from "react";
import { Text, TouchableOpacity, FlatList, View } from "react-native";
import Colors from "../../constants/Colors";

function UserFridgeCat(props) {
  function renderUserFridgeCategories() {
    const categoryData = [
      {
        id: 1,
        name: "Allt",
      },
      {
        id: 2,
        name: "Grönsaker",
      },
      {
        id: 3,
        name: "Frukt",
      },
      {
        id: 4,
        name: "Mejeri",
      },
      {
        id: 5,
        name: "Kött & Fisk",
      },

      {
        id: 6,
        name: "Skafferi",
      },
      {
        id: 7,
        name: "Pasta & Ris",
      },
      {
        id: 8,
        name: "Kryddor",
      },
    ];

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 4,
            marginTop: 20,
            backgroundColor: Colors.blue,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => props.onSelectedCategory(item)}
          key={() => Math.random(item.id)}
        >
          <Text
            style={{
              paddingLeft: 5,
              marginRight: 12,
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.green,
              textDecorationStyle: "solid",
              textDecorationColor:
                props.selectedCategory === item.name ? Colors.darkpink : "none",
              textDecorationLine:
                props.selectedCategory === item.name ? "underline" : "none",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={categoryData}
        horizontal
        showsHorizontalScrollIndicator={true}
        keyExtractor={(item) => Math.random(categoryData.length * 5)}
        renderItem={renderItem}
        contentContainerStyle={{}}
      ></FlatList>
    );
  }
  return <View>{renderUserFridgeCategories()}</View>;
}

export default UserFridgeCat;
