import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

import SuggestionItem from "./SuggestionItem";
import SuggestionInput from "./SuggestionInput";
import Colors from "../../constants/Colors";
import { useContext, useEffect, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../../store/context/auth-context";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getFoodToRecipe,
  getUser,
} from "../../store/redux/actions/user.actions";
import { useSelector, useDispatch } from "react-redux";
import { fetchRecipes } from "../../store/redux/actions/recipe.actions";
import LoadingOverlay from "../UI/LoadingOverlay";

function Recipes() {
  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const [foodToRecipe, setfoodToRecipe] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const recipesData = useSelector((state) => state.recipesReducer);

  const ingredients = recipesData.map((item) => item.ingredients);

  const userIngredients = userData.foodToRecipe;
  const try2 = ingredients.toString();
  console.log("string" + try2);
  const try6 = try2.split(",");
  console.log(try6);
  console.log(typeof try6);

  const getCommon = (arr1, arr2) => {
    var common = []; // Array to contain common elements
    for (var i = 0; i < arr2.length; ++i) {
      for (var j = 0; j < arr1.length; ++j) {
        if (arr2[i] == arr1[j]) {
          // If element is in both the arrays
          common.push(arr2[i]); // Push to common array
        }
      }
    }

    return common; // Return the common elements
  };

  let commonElements = getCommon(try6, userIngredients); // [45, 223, 93, 23]
  console.log(commonElements);

  const getTrueOrFalse = (arr1, arr2) => {
    for (var i = 0; i < arr1.length; ++i) {
      const newArray = arr1[i].some((item) => arr2.includes(item));
      return newArray;
    }
  };

  let question = getTrueOrFalse(ingredients, commonElements);

  function showRecipe() {
    const [showRecipes, setShowRecipes] = useState([]);
    for (var i = 0; i < ingredients.length; ++i) {
      const recipesToShow = ingredients[i].some((item) =>
        commonElements.includes(item)
      );
      console.log(recipesToShow);
    }
    return (
      <>
        <FlatList
          legacyImplementation={true}
          data={recipesData}
          extraData={recipesData}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => (
            <View style={{ padding: 9 }}>
              <Text>{item.description}</Text>
              <FlatList
                data={item.ingredients}
                keyExtractor={() => Math.random()}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item}</Text>
                  </View>
                )}
              />
            </View>
          )}
        />
      </>
    );
  }
  const [loaded] = useFonts({
    alk: require("../../assets/fonts/Alkalami-Regular.ttf"),
  });

  if (!loaded) {
    return <LoadingOverlay message="Ge oss en kort stund" />;
  }

  return (
    <View style={styles.firstScreen}>
      <View style={{ flex: 1 }}>
        <FlatList
          legacyImplementation={true}
          contentContainerStyle={styles.foodList}
          data={userData.foodToRecipe}
          extraData={userData.foodToRecipe}
          keyExtractor={(item) => Math.random(item._id)}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />
        <Text>{ingredients}</Text>

        <Text>Allt jag har</Text>
        {showRecipe()}
        <FlatList
          legacyImplementation={true}
          contentContainerStyle={styles.foodList}
          data={userIngredients}
          extraData={userIngredients}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />
        <FlatList
          legacyImplementation={true}
          contentContainerStyle={styles.foodList}
          data={commonElements}
          extraData={commonElements}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />
        <FlatList
          legacyImplementation={true}
          contentContainerStyle={styles.foodList}
          data={ingredients}
          extraData={ingredients}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => (
            <View>
              <FlatList
                data={item}
                keyExtractor={() => Math.random()}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item}</Text>
                  </View>
                )}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

export default Recipes;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  firstScreen: {
    flex: 1,
    backgroundColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "alk",

    fontSize: 20,
    textAlign: "center",
  },
  month: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  book: {
    alignItems: "center",
    width: "80%",
  },
  suggestion: {
    alignItems: "center",
  },
  list: {
    flex: 3,
  },
  backgroundImage: {
    opacity: 0.15,
  },
  appBackground: {
    flex: 1,
  },
  button: {
    padding: 20,
  },
});
