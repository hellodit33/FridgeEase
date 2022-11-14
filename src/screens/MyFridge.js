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
import { useDispatch, useSelector } from "react-redux";
import Fridge from "./Fridge";
function MyFridge() {
  const userData = useSelector((state) => state.userReducer);
  const fridge = useSelector((state) => state.intoFridgeReducer);

  return (
    <View style={styles.firstScreen}>
      <View style={[styles.month, styles.book]}>
        <Text style={styles.title}>My Fridge</Text>
        <Text>{userData.usersfood.length} in your fridge</Text>
        <FlatList
          data={fridge}
          extraData={fridge}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            for (let i = 0; i < userData.usersfood.length; i++) {
              if (item._id === userData.usersfood[i]) {
                return (
                  <ScrollView>
                    <Text>{item.title}</Text>
                  </ScrollView>
                );
              }
            }
          }}
        />
      </View>
    </View>
  );
}

export default MyFridge;

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
