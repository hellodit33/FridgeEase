import { useState } from "react";
import Colors from "../../constants/Colors";
import { useFonts } from "expo-font";

import {
  View,
  Button,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import SuggestionInput from "./SuggestionInput";
import SuggestionItem from "./SuggestionItem";
import { storeSuggestions } from "../util/http";
import { Ionicons } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
import FoodComponents from "../components/FoodComponents";

function Fridge(props) {
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
      name: "Bageri & Spannmål",
    },
    {
      id: 7,
      name: "Fryst",
    },
    {
      id: 8,
      name: "Kryddor",
    },
    {
      id: 9,
      name: "Pasta & Ris",
    },
    {
      id: 10,
      name: "Desserter",
    },
  ];

  // price rating
  const affordable = 1;
  const fairPrice = 2;
  const expensive = 3;

  const foodData = [
    {
      id: 1,
      name: "Spenat",
      categories: [2],
      expiration: 1,
      carbon: 300,
      climate: 2,
    },

    {
      id: 2,
      name: "Morötter",
      categories: [2],
      expiration: 3,
      carbon: 300,
      climate: 2,
    },
    {
      id: 3,
      name: "Ägg",
      categories: [4],
      expiration: 1,
      carbon: 300,
      climate: 2,
    },
    {
      id: 4,
      name: "Mjölk",
      categories: [4],
      expiration: 4,
      carbon: 300,
      climate: 2,
    },
    {
      id: 5,
      name: "Grädde",
      categories: [4],
      expiration: 1,
      carbon: 300,
      climate: 2,
    },
    {
      id: 6,
      name: "Ost",
      categories: [4],
      expiration: 1,
      carbon: 300,
      climate: 2,
    },
    {
      id: 7,
      name: "Kyckling",
      categories: [5],
      expiration: 1,
      carbon: 300,
      climate: 2,
    },
    {
      id: 8,
      name: "Smör",
      categories: [4],
      expiration: 1,
      carbon: 300,
      climate: 2,
    },
    {
      id: 9,
      name: "Bröd",
      categories: [6],
      expiration: 1,
      carbon: 300,
      climate: 2,
    },
  ];

  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [food, setFood] = useState(foodData);

  function onSelectCategory(category) {
    //filter restaurant
    let foodList = foodData.filter((a) => a.categories.includes(category.id));

    setFood(foodList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) return category[0].name;

    return "";
  }

  const [suggestionsList, setSuggestionsList] = useState([]);

  function renderHeader() {}

  function renderFoodCategories() {
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
          onPress={() => onSelectCategory(item)}
        >
          <Text
            style={{
              paddingLeft: 5,
              marginRight: 12,
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.green,
              textDecorationStyle: "solid",
              textDecorationColor: Colors.darkpink,
              textDecorationLine:
                selectedCategory?.id == item.id ? "underline" : "none",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={true}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{}}
      ></FlatList>
    );
  }

  function renderFoodList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          /* navigation.navigate("Food", {
            item,
            currentLocation,
          })*/
        }}
      >
        {/* Image */}
        <View
          style={{
            marginBottom: 4,
          }}
        >
          <Text>{item.expiration} dagar</Text>
        </View>

        {/* Restaurant Info */}
        <Text>{item.name}</Text>

        <View
          style={{
            marginTop: 4,
            flexDirection: "column",
          }}
        >
          {/* Rating */}

          <Text>{item.carbon}</Text>

          {/* Categories */}
          <View
            style={{
              flexDirection: "column",
              marginLeft: 10,
            }}
          >
            {item.categories.map((categoryId) => {
              return (
                <View style={{ flexDirection: "row" }} key={categoryId}>
                  <Text>{getCategoryNameById(categoryId)}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={food}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: 4,
          paddingBottom: 30,
        }}
      />
    );
  }
  const [loaded] = useFonts({
    alk: require("../../assets/fonts/Alkalami-Regular.ttf"),
    Intermedium: require("../../assets/fonts/Inter-Medium.ttf"),
    Interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    Interlight: require("../../assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View>
      <View style={styles.main}>{renderFoodCategories()}</View>
      <View style={styles.fridge}>
        <View style={styles.addFood}>
          <View style={styles.addFoodIcon}>
            <Ionicons name="add-sharp" size={24} />
          </View>
          <View style={styles.addFoodInput}>
            <TextInput
              style={styles.addFoodInput}
              placeholderTextColor={Colors.green}
              placeholder="Lägg till matvara...."
              keyboardType="default"
              multiline={false}
            />
          </View>
        </View>
        <FoodComponents navigation={props.navigation} />
        <View style={styles.list}>
          <FlatList
            data={suggestionsList}
            alwaysBounceVertical={false}
            renderItem={(itemData) => {
              return (
                <SuggestionItem
                  text={itemData.item.text}
                  onDeleteItem={deleteSuggestionHandler}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          ></FlatList>
        </View>
      </View>
    </View>
  );
}

export default Fridge;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
    paddingTop: 5,
    fontFamily: "Interbold",

    justifyContent: "center",
    alignItems: "center",
  },
  fridge: {
    backgroundColor: Colors.blue,
    fontFamily: "Intermedium",
  },
  addFood: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 120,
    margin: 20,
    borderWidth: 4,
    borderColor: Colors.green,
    flexDirection: "row",
    fontFamily: "Interlight",
  },
  addFoodInput: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.green,
  },
  addFoodIcon: {
    paddingRight: 5,
    paddingLeft: 10,
  },
});
