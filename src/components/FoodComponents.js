import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  FlatList,
} from "react-native";
import * as fridgeAction from "../../store/redux/actions/fridge.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchFood } from "../../store/redux/actions/fridge.actions";

function FoodComponents(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFood());
  }, [dispatch]);

  function FoodDetails() {
    props.navigation.navigate("FoodDetails");
  }
  return <Pressable onPress={FoodDetails}></Pressable>;
}

export default FoodComponents;
