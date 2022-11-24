import { useState } from "react";
import { Text, TouchableOpacity, FlatList, View } from "react-native";
import Colors from "../../constants/Colors";

function RecipesCat(props) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  function renderRecipesCategories() {
    const categoryData = [
      {
        id: 1,
        name: "Allt",
      },
      {
        id: 2,
        name: "Snabbt",
      },
      {
        id: 3,
        name: "Enkelt",
      },
      {
        id: 4,
        name: "Billigt",
      },
      {
        id: 5,
        name: "Lagom",
      },
      {
        id: 6,
        name: "Ambitiöst",
      },
      {
        id: 7,
        name: "Dejt",
      },
      {
        id: 8,
        name: "Festligt",
      },
    ];

    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 4,
            marginTop: 20,
            marginHorizontal: 10,
            backgroundColor: Colors.blue,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => props.onRecipeCategory(item)}
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
        keyExtractor={() => Math.random(categoryData.length * 5)}
        renderItem={renderItem}
        contentContainerStyle={{}}
      ></FlatList>
    );
  }
  return <View>{renderRecipesCategories()}</View>;
}

export default RecipesCat;
