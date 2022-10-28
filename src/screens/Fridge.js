import { useState, useEffect } from "react";
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
  ScrollView,
} from "react-native";
import SuggestionInput from "./SuggestionInput";
import SuggestionItem from "./SuggestionItem";
import { storeSuggestions } from "../util/http";
import { Ionicons } from "@expo/vector-icons";
import FoodComponents from "../components/FoodComponents";
import LoadingOverlay from "../UI/LoadingOverlay";

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

  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [suggestionsList, setSuggestionsList] = useState([]);
  const [messageFoodComponents, setMessageFoodComponents] = useState(true);

  const [foodComponents, setFoodComponents] = useState(false);

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

  const [loaded] = useFonts({
    alk: require("../../assets/fonts/Alkalami-Regular.ttf"),
    Intermedium: require("../../assets/fonts/Inter-Medium.ttf"),
    Interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    Interlight: require("../../assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) {
    return <LoadingOverlay message="Ge oss en kort stund..." />;
  }

  function showFoodComponents() {
    setMessageFoodComponents(false);
    setFoodComponents(true);
  }

  return (
    <>
      <View>
        <View style={styles.main}>{renderFoodCategories()}</View>
      </View>
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
              onTextInput={showFoodComponents}
            />
          </View>
        </View>
      </View>
      {messageFoodComponents && (
        <View style={styles.message}>
          <Text style={styles.textMessage}>
            Ditt kylskåp är tomt, lägg till matvaror för att se vilka matvaror
            som behöver ätas upp snart och få inspiration till matlagning!
          </Text>
        </View>
      )}
      {foodComponents && (
        <View style={{ flex: 1 }}>
          <FoodComponents navigation={props.navigation} />
        </View>
      )}
    </>
  );
}

export default Fridge;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
    fontFamily: "Interbold",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    flex: 1,
    backgroundColor: Colors.blue,
    alignItems: "center",
  },
  textMessage: {
    fontFamily: "Interbold",
    color: Colors.green,
    textAlign: "center",
    width: "80%",
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
