import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Button,
  Dimensions,
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

function Recipes() {
  const dispatch = useDispatch();
  const [foodToRecipe, setfoodToRecipe] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  dispatch(getUser(userData._id));

  const [loaded] = useFonts({
    alk: require("../../assets/fonts/Alkalami-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.firstScreen}>
      <View style={[styles.month, styles.book]}>
        <Text style={styles.title}>Hej</Text>
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

    paddingTop: 10,
    padding: deviceWidth < 380 ? 12 : 16,
  },
  title: {
    fontFamily: "alk",
    marginTop: 50,
    paddingTop: 10,
    fontSize: 20,
    textAlign: "center",
    maxWidth: "80%",
  },
  month: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  book: {
    alignItems: "center",
    width: "80%",
    marginTop: 100,
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
