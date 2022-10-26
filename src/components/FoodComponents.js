import {
  StyleSheet,
  ScrollView,
  Image,
  View,
  Text,
  Pressable,
  FlatList,
} from "react-native";

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
    <View scrollToOverflowEnabled={true}>
      <FlatList
        data={foodsLists}
        numColumns={3}
        scrollToOverflowEnabled={true}
        nestedScrollEnabled={true}
        style={styles.foodList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.food}>
            <View style={styles.textContainer}>
              <Text style={styles.item}>{item.title}</Text>
            </View>

            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri:
                    "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                    item.logo,
                }}
              ></Image>
            </View>
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
  },
  food: {
    height: 90,
    width: 100,
    marginHorizontal: 2,
    marginVertical: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "white",
    borderRadius: 30,
    borderColor: Colors.green,
    borderWidth: 2,
  },
  textContainer: {
    justifyContent: "space-evenly",

    alignItems: "center",
  },
  item: {
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.green,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
