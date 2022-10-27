import {
  StyleSheet,
  ScrollView,
  Button,
  Image,
  Checkbox,
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
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

  const [selectedItems, setSelectedItems] = useState([]);

  const handlePress = (food) => {
    if (selectedItems.includes(food._id)) {
      const newListItem = selectedItems.filter((foodId) => foodId !== food._id);

      return setSelectedItems(newListItem);
    }
    setSelectedItems([...selectedItems, food._id]);
  };

  function FoodDetails() {
    props.navigation.navigate("FoodDetails");
  }

  return (
    <View>
      <FlatList
        contentContainerStyle={styles.foodList}
        numColumns={3}
        data={foodsLists}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable
            onLongPress={FoodDetails}
            onPress={() => handlePress(item)}
          >
            <View style={styles.food}>
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
              <View style={styles.textContainer}>
                <Text style={styles.item}>{item.title}</Text>
              </View>
            </View>
            {selectedItems.includes(item._id) && (
              <View style={styles.overlay} />
            )}
          </Pressable>
        )}
      ></FlatList>
      {selectedItems.length ? (
        <View style={styles.readyView}>
          <Pressable style={styles.readyButton}>
            <Text style={styles.readyText}>Klar</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

export default FoodComponents;

const styles = StyleSheet.create({
  foodList: {
    backgroundColor: Colors.blue,
    alignItems: "center",
    paddingVertical: 10,
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
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 30,

    borderColor: Colors.green,
    borderWidth: 4,
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
  readyView: {
    backgroundColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  readyButton: {
    justifyContent: "center",

    borderRadius: 40,
    backgroundColor: Colors.green,
    paddingHorizontal: 10,
    paddingVertical: 10,

    width: "40%",
  },
  readyText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
