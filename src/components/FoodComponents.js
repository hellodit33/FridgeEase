import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import fridgeApi from "../api/fridgeApi";
import * as fridgeAction from "../../store/redux/actions/fridge.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
//import { fetchFood } from "../../store/redux/actions/fridge.actions";

function FoodComponents(props) {
  const fridge = async () => {
    const response = await fridgeApi.get("/");
    console.log(response.data[0].title);
  };

  fridge();
  /*const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFood());
  }, [dispatch]);

  function FoodDetails() {
    props.navigation.navigate("FoodDetails");
  }

//<Pressable onPress={FoodDetails}></Pressable>*/
  return (
    <View>
      <Text>Top Food</Text>
    </View>
  );
}

export default FoodComponents;
