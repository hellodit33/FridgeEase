import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from "react-native";
import Colors from "../../constants/Colors";

function FridgeCat(props) {
  function renderFridgeCategories() {
    const [selectedCategory, setSelectedCategory] = useState(null);

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

            backgroundColor: Colors.blue,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => props.onFridgeCategory(item)}
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
  return <View>{renderFridgeCategories()}</View>;
}
export default FridgeCat;
