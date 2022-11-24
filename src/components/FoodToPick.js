import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useFonts } from "expo-font";
import {
  addFoodToFridge,
  fetchFood,
} from "../../store/redux/actions/fridge.actions";

import { getUser } from "../../store/redux/actions/user.actions";
import {
  View,
  Image,
  Pressable,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import LoadingOverlay from "../UI/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";

import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import FridgeCat from "./FridgeCat";

function FoodToPick({ props, navigation, route }) {
  //redux store
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userFood = userData.usersfood;
  const foodsLists = useSelector((state) => state.intoFridgeReducer);
  const [foodlist, setFoodlist] = useState([foodsLists]);

  //categories to select in fridge
  const [selectedFridgeFilter, setSelectedFridgeFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  //state for selected items into fridge
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCatItems, setSelectedCatItems] = useState([]);

  const [selectedNames, setSelectedNames] = useState([]);

  //find common elements among selected food elements to not double pick (only when selecting categories)
  function findCommonElement(array1, array2) {
    let firstArrayLength = array1.length;
    let secondArrayLength = array2.length;
    // Loop for array1
    for (let i = 0; i < firstArrayLength; i++) {
      // Loop for array2
      for (let j = 0; j < secondArrayLength; j++) {
        // Compare the element of each and
        // every element from both of the
        // arrays
        if (array1[i] === array2[j]) {
          // Return if common element found
          return true;
        }
      }
    }
    // Return if no common element exist
    return false;
  }

  //function to pick food and add to user fridge
  const addToUserFridge = async (food) => {
    findCommonElement(selectedNames, selectedCatItems);
    if (
      selectedItems.includes(food._id) ||
      selectedNames.includes(food.title) ||
      !findCommonElement
    ) {
      const newSelect = selectedItems.filter((foodId) => foodId !== food._id);
      showMessage({
        duration: 3000,
        message: "Denna vara finns redan i ditt kylskåp.",
        backgroundColor: Colors.green,
        color: "white",
      });
      return setSelectedItems(newSelect);
    }
    setSelectedItems([...selectedItems, food._id]);
    setSelectedNames([...selectedNames, food.title]);
    setSelectedCatItems([...selectedCatItems, food.title]);

    showMessage({
      duration: 4000,
      message:
        'Denna vara har lagts till ditt kylskåp. För att ta bort den, klicka på knappen "Klar" för att gå tillbaka till ditt kylskåpsinnehåll. Klicka senare på krysset på den matvara som du vill ta bort.',
      backgroundColor: Colors.green,
      color: "white",
    });
    dispatch(
      addFoodToFridge(
        userData._id,
        food._id,
        food.title,
        food.logo,
        food.carbon,
        food.category,
        food.expiration
      )
    );
    dispatch(getUser(userData._id));
  };

  //function to pick category among food
  async function onFridgeCategory(category) {
    if (category.name === "Allt") {
      setSelectedFridgeFilter(false);
    } else {
      setSelectedFridgeFilter(true);
      setSelectedCategory(category.name);
    }
  }

  //loading fonts
  const [loaded] = useFonts({
    Intermedium: require("../../assets/fonts/Inter-Medium.ttf"),
    Interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    Interlight: require("../../assets/fonts/Inter-Light.ttf"),
  });

  const [isLoading, setIsLoading] = useState(false);

  //loading food
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchFood())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch, userData]);

  if (!loaded || isLoading) {
    return <LoadingOverlay message="Ge oss en kort stund..." />;
  }

  return (
    <>
      <FridgeCat
        onFridgeCategory={onFridgeCategory}
        selectedCategory={selectedCategory}
      />
      {!selectedFridgeFilter && (
        <View style={{ flex: 1 }}>
          <FlashMessage position="top" />
          <View>
            <View>
              <FlatList
                legacyImplementation={true}
                contentContainerStyle={styles.foodList}
                numColumns={3}
                data={foodsLists}
                extraData={foodsLists}
                keyExtractor={() => Math.random(userData._id * 5)}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => addToUserFridge(item)}>
                    <View style={styles.food}>
                      <View style={styles.imageContainer}>
                        <Image
                          accessibilityLabel={item.logo}
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
                    {selectedCatItems.includes(item._id) && (
                      <View style={styles.overlay} />
                    )}
                  </TouchableOpacity>
                )}
              ></FlatList>
            </View>
          </View>
        </View>
      )}

      {selectedFridgeFilter && (
        <View style={{ flex: 1 }}>
          <FlatList
            contentContainerStyle={styles.selectedFoodList}
            numColumns={3}
            data={foodsLists}
            extraData={foodsLists}
            keyExtractor={() => Math.random(userData._id + userData._id * 2)}
            renderItem={({ item }) => {
              if (item.category === selectedCategory) {
                return (
                  <Pressable onPress={() => addToUserFridge(item)}>
                    <View style={styles.food}>
                      <View style={styles.imageContainer}>
                        <Image
                          accessibilityLabel={item.logo}
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
                );
              }
            }}
          ></FlatList>
        </View>
      )}
    </>
  );
}

export default FoodToPick;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  foodList: {
    backgroundColor: Colors.blue,
    alignItems: "center",
    paddingVertical: 10,
  },
  selectedFoodList: {
    backgroundColor: Colors.blue,
    alignItems: "center",
    justifyContent: "center",
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
});
