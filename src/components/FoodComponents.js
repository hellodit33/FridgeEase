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
import Colors from "../../constants/Colors";
//import { fetchFood } from "../../store/redux/actions/fridge.actions";

function FoodComponents(props) {
  /*const fridge = async () => {
    const response = await fridgeApi.get("/api/fridge");
    console.log(response.data[0].title);
  };

  fridge();*/
  const dispatch = useDispatch();
  const foodsLists = useSelector((state) => state.intoFridgeReducer);
  console.log(foodsLists);
  /*function FoodDetails() {
    props.navigation.navigate("FoodDetails");
  }

  //<Pressable onPress={FoodDetails}></Pressable>*/
  return (
    <View>
      <FlatList
        data={foodsLists}
        numColumns={3}
        style={styles.foodList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.food}>
            <Text style={styles.item}>{item.title}</Text>
            <Text>{item.quantity}</Text>
          </View>
        )}
      ></FlatList>
    </View>
  );
}

export default FoodComponents;

const styles = StyleSheet.create({
  foodList: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  food: {
    marginHorizontal: 5,

    height: 100,
    width: 80,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderRadius: 40,
    borderColor: Colors.green,
    borderWidth: 2,
  },
  item: {},
});
