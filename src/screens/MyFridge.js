import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useFonts } from "expo-font";
import { fetchFood } from "../../store/redux/actions/fridge.actions";
import {
  addFoodToRecipe,
  deleteFoodFromFridge,
  deleteRecipeFoodFilter,
} from "../../store/redux/actions/user.actions";
import { getUser } from "../../store/redux/actions/user.actions";
import EditModal from "../components/EditModalFridge";
import {
  View,
  RefreshControl,
  Image,
  Pressable,
  Button,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import IcoButton from "../UI/IcoButton";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import FoodToFridge from "../components/FoodToFridge";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { differenceInDays, parseISO } from "date-fns";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { fetchRecipes } from "../../store/redux/actions/recipe.actions";
import UserFridgeCat from "../components/UserFridgeCat";

function MyFridge({ props, navigation, route }) {
  //redux store
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const userFood = userData.usersfood;
  const foodsLists = useSelector((state) => state.intoFridgeReducer);
  const userId = userData._id;

  //utility functions to refresh the user fridge content
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //function to get amount of expiration days after the user edits the expiration date
  function dateDiff(item1, item2) {
    let dateDiff = differenceInDays(Date.parse(item1), Date.parse(item2));
    return dateDiff;
  }

  //utils to select a category in the user fridge
  const [selectedUserFilter, setSelectedUserFilter] = useState(false);
  const [selectedFridgeFilter, setSelectedFridgeFilter] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  //utils to pass data to modal
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [today, setToday] = useState(new Date());
  const [passedData, setPassedData] = useState([]);

  //send data function to the edit modal
  function openModal({
    id,
    name,
    expiration,
    expirationDate,
    quantity,
    carbon,
    logo,
  }) {
    setModalIsVisible(true);
    setPassedData({
      id,
      name,
      expiration,
      expirationDate,
      quantity,
      carbon,
      logo,
    });
  }

  //function to close the modal
  function closeModal() {
    dispatch(getUser(userData._id));
    setPassedData({});
    setModalIsVisible(false);
  }

  //states to show food to pick
  const [foodComponents, setFoodComponents] = useState(false);

  //state to know if there is food in user fridge
  const [addedFood, setAddedFood] = useState(false);

  //state to select ingredients to recipe
  const [selectToRecipe, setSelectToRecipe] = useState([]);
  //function to select ingredients to recipe
  const handlePressToRecipe = (food) => {
    if (selectToRecipe.includes(food._id)) {
      const newListItem = selectToRecipe.filter(
        (foodId) => foodId !== food._id
      );
      dispatch(deleteRecipeFoodFilter(userData._id, food.foodName));
      dispatch(getUser(userData._id));
      showMessage({
        duration: 3000,
        message:
          "Denna vara har tagits bort från de varorna du vill laga mat på.",
        backgroundColor: Colors.green,
        color: "white",
      });
      return setSelectToRecipe(newListItem);
    }
    showMessage({
      duration: 3000,
      message: "Denna vara har lagts till de varorna du vill laga mat på.",
      backgroundColor: Colors.green,
      color: "white",
    });
    setSelectToRecipe([...selectToRecipe, food._id]);
    dispatch(addFoodToRecipe(userData._id, food.foodName));
    dispatch(getUser(userData._id));
    dispatch(fetchRecipes());
  };

  //function to select user fridge category
  async function onSelectedCategory(category) {
    setSelectedUserFilter(true);
    setSelectedFridgeFilter(false);
    setSelectedCategory(category.name);
    console.log(selectedCategory);
  }

  //function to delete in fridge
  const deleteInFridge = (item) => {
    dispatch(deleteFoodFromFridge(userData._id, item._id));
    dispatch(getUser(userData._id));
  };
  const editInFridge = () => {
    closeModal();
  };

  //function to render fridge
  function renderMyFridge() {
    const renderFridge = ({ item }) => {
      //constants to pass to edit modal
      const id = item._id;
      const name = item.foodName;
      const expiration = item.foodExpiration;
      const expirationDate = item.foodExpirationDate;
      const carbon = item.foodCarbon;
      const logo = item.foodLogo;
      //function to fetch quantity if already existing in data
      function fetchQuantity() {
        if (item.foodQuantity) {
          return item.foodQuantity;
        } else if (!item.foodQuantity) {
          return 0;
        }
      }
      const quantity = fetchQuantity();

      return (
        <>
          <FlashMessage position="top" />
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Pressable
              onLongPress={() => {
                openModal({
                  id,
                  name,
                  expiration,
                  expirationDate,
                  quantity,
                  carbon,
                  logo,
                });
              }}
              onPress={() => handlePressToRecipe(item)}
            >
              <View style={styles.userFridgeItem}>
                <View style={styles.userImageView}>
                  <Image
                    accessibilityLabel={item.foodLogo}
                    style={styles.userImage}
                    source={{
                      uri:
                        "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                        item.foodLogo,
                    }}
                  ></Image>
                </View>
                <View style={styles.itemView}>
                  <Text style={styles.itemName}>{item.foodName}</Text>
                </View>

                <View style={styles.expView}>
                  <Text style={styles.itemExp}>
                    {item.foodExpirationDate ? (
                      <Text>
                        {dateDiff(item.foodExpirationDate, today)}
                        {dateDiff(item.foodExpirationDate, today) > 1
                          ? " dagar"
                          : " dag"}
                      </Text>
                    ) : (
                      <Text>
                        {item.foodExpiration}
                        {item.foodExpiration > 1 ? " dagar" : " dag"}
                      </Text>
                    )}
                  </Text>
                </View>
                <View
                  style={[
                    {
                      backgroundColor:
                        item.foodCarbon === "A"
                          ? Colors.darkgreen
                          : item.foodCarbon === "B"
                          ? Colors.lightgreen
                          : item.foodCarbon === "C"
                          ? Colors.lightorange
                          : item.foodCarbon === "D"
                          ? Colors.orange
                          : item.foodCarbon === "E"
                          ? Colors.red
                          : null,
                    },
                    styles.carbonView,
                  ]}
                >
                  <Text
                    style={[
                      styles.itemCarbon,
                      {
                        color:
                          item.foodCarbon === "A"
                            ? "white"
                            : item.foodCarbon === "B"
                            ? "white"
                            : item.foodCarbon === "C"
                            ? "black"
                            : item.foodCarbon === "D"
                            ? "black"
                            : item.foodCarbon === "E"
                            ? "white"
                            : null,
                      },
                    ]}
                  >
                    {item.foodCarbon}
                  </Text>
                </View>
                <View style={styles.editItem}>
                  <IcoButton
                    icon="create-outline"
                    size={24}
                    color={Colors.green}
                    onPress={() => {
                      openModal({
                        id,
                        name,
                        quantity,
                        expiration,
                        expirationDate,
                        carbon,
                        logo,
                      });
                    }}
                  />
                </View>

                <View style={styles.deleteItem}>
                  <IcoButton
                    icon="close"
                    size={24}
                    color={Colors.darkpink}
                    onPress={() => deleteInFridge(item)}
                  />

                  <EditModal
                    passedData={passedData}
                    visible={modalIsVisible}
                    closeModal={closeModal}
                    editFoodInFridge={editInFridge}
                  />
                </View>
              </View>
              {selectToRecipe.includes(item._id) && (
                <View style={styles.overlayToRecipe} />
              )}
            </Pressable>
          </ScrollView>
        </>
      );
    };

    return (
      <FlatList
        data={userData.usersfood}
        extraData={userData.usersfood}
        keyExtractor={() => Math.random(userData._id * 19)}
        renderItem={renderFridge}
        contentContainerStyle={{}}
      ></FlatList>
    );
  }

  //loading fonts
  const [loaded] = useFonts({
    Intermedium: require("../../assets/fonts/Inter-Medium.ttf"),
    Interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    Interlight: require("../../assets/fonts/Inter-Light.ttf"),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (userData.usersfood && userData.usersfood.length !== 0) {
      setAddedFood(true);
    } else {
      setAddedFood(false);
    }
    dispatch(fetchFood())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch, dateDiff(), userData]);

  if (!loaded || isLoading) {
    return <LoadingOverlay message="Ge oss en kort stund..." />;
  }

  //show food to pick
  function showFoodComponents() {
    // setMessageFoodComponents(false);
    setFoodComponents(true);
  }
  //function to close show food to pick
  const readyFunction = () => {
    setSelectedCategory("Allt");
    setFoodComponents(false);
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: Colors.blue }}>
        {!foodComponents && (
          <UserFridgeCat
            onSelectedCategory={onSelectedCategory}
            selectedCategory={selectedCategory}
          />
        )}

        <View
          style={[
            {
              opacity: modalIsVisible ? 0.5 : !modalIsVisible ? 1 : null,
              backgroundColor: modalIsVisible ? Colors.lightblue : null,
            },
          ]}
        ></View>

        <View
          style={[{ marginTop: foodComponents ? 20 : null }, styles.userFridge]}
        >
          <View style={styles.addReadyButton}>
            <View
              style={[
                styles.addFood,
                { width: foodComponents ? "60%" : "90%" },
              ]}
            >
              <View style={styles.addFoodIcon}>
                <Ionicons name="add-sharp" size={24} />
              </View>
              <View style={styles.addFoodInput}>
                <TextInput
                  style={styles.addFoodInput}
                  placeholderTextColor={Colors.green}
                  placeholder="Lägg till matvara...."
                  keyboardType="default"
                  onTouchStart={showFoodComponents}
                />
              </View>
            </View>
            {foodComponents && (!selectedFridgeFilter || selectedFridgeFilter) && (
              <View style={styles.readyView}>
                <Pressable
                  style={styles.readyButton}
                  onPress={() => readyFunction()}
                >
                  <Text style={styles.readyText}>Klar</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>

        {foodComponents && <FoodToFridge selectedCategory={selectedCategory} />}
        {!addedFood &&
          !foodComponents &&
          (!selectedUserFilter || selectedCategory === "Allt") && (
            <View style={styles.message}>
              <Text style={styles.textMessage}>
                Ditt kylskåp är tomt, lägg till matvaror för att se vilka
                matvaror som snart behöver ätas upp och få inspiration till
                matlagning!
              </Text>
            </View>
          )}

        {addedFood && !foodComponents && !selectedUserFilter && (
          <View style={styles.fridgeView}>
            <View style={styles.fridgeInstView}>
              <Text style={styles.fridgeToRecipe}>
                Markera de matvaror du vill laga mat på och klicka på
                receptikonen
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Recipes");
                }}
                style={{
                  marginHorizontal: 8,
                  padding: 7,
                  borderRadius: 30,
                  borderColor: Colors.green,
                  borderWidth: 2,
                }}
              >
                <FontAwesomeIcon
                  icon={faUtensils}
                  color={Colors.green}
                  size={28}
                />
              </TouchableOpacity>
            </View>
            {renderMyFridge()}
          </View>
        )}

        {!foodComponents &&
          selectedUserFilter &&
          userFood.map((item) => {
            let userFoodLength = userFood.length;
            for (let i = 0; i < userFoodLength; i++) {
              if (item.foodCategory === selectedCategory) {
                console.log(item.foodName);
                const id = item._id;
                const name = item.foodName;
                const expiration = item.foodExpiration;
                const expirationDate = item.foodExpirationDate;

                const carbon = item.foodCarbon;
                const logo = item.foodLogo;
                function fetchQuantity() {
                  if (item.foodQuantity) {
                    return item.foodQuantity;
                  } else if (!item.foodQuantity) {
                    return 0;
                  }
                }
                const quantity = fetchQuantity();
                return (
                  <ScrollView
                    style={{ backgroundColor: Colors.blue }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                  >
                    <Pressable
                      /*  key={() => userData._id * 3}*/
                      onPress={() => handlePressToRecipe(item)}
                    >
                      <View style={styles.userFridgeItem}>
                        <View style={styles.userImageView}>
                          <Image
                            accessibilityLabel={item.foodLogo}
                            style={styles.userImage}
                            source={{
                              uri:
                                "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                                item.foodLogo,
                            }}
                          ></Image>
                        </View>
                        <View style={styles.itemView}>
                          <Text style={styles.itemName}>{item.foodName}</Text>
                        </View>

                        <View style={styles.expView}>
                          <Text style={styles.itemExp}>
                            {item.foodExpirationDate ? (
                              <Text>
                                {dateDiff(item.foodExpirationDate, today)}
                                {dateDiff(item.foodExpirationDate, today) > 1
                                  ? " dagar"
                                  : " dag"}
                              </Text>
                            ) : (
                              <Text>
                                {item.foodExpiration}
                                {item.foodExpiration > 1 ? " dagar" : " dag"}
                              </Text>
                            )}
                          </Text>
                        </View>
                        <View
                          style={[
                            {
                              backgroundColor:
                                item.foodCarbon === "A"
                                  ? Colors.darkgreen
                                  : item.foodCarbon === "B"
                                  ? Colors.lightgreen
                                  : item.foodCarbon === "C"
                                  ? Colors.lightorange
                                  : item.foodCarbon === "D"
                                  ? Colors.orange
                                  : item.foodCarbon === "E"
                                  ? Colors.red
                                  : null,
                            },
                            styles.carbonView,
                          ]}
                        >
                          <Text style={styles.itemCarbon}>
                            {item.foodCarbon}
                          </Text>
                        </View>
                        <View style={styles.editItem}>
                          <IcoButton
                            icon="create-outline"
                            size={24}
                            color={Colors.green}
                            onPress={() => {
                              openModal({
                                id,
                                name,
                                quantity,
                                expiration,
                                expirationDate,
                                carbon,
                                logo,
                              });
                            }}
                          />
                        </View>

                        <View style={styles.deleteItem}>
                          <IcoButton
                            icon="close"
                            size={24}
                            color={Colors.darkpink}
                            onPress={() => deleteInFridge(item)}
                          />

                          <EditModal
                            passedData={passedData}
                            visible={modalIsVisible}
                            closeModal={closeModal}
                            editFoodInFridge={editInFridge}
                          />
                        </View>
                      </View>
                      {selectToRecipe.includes(item._id) && (
                        <View style={styles.overlayToRecipe} />
                      )}
                    </Pressable>
                  </ScrollView>
                );
              } else if (selectedCategory === "Allt") {
                setSelectedUserFilter(false);
              }
            }
          })}
      </View>
    </>
  );
}

export default MyFridge;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.blue,
    fontFamily: "Interbold",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  message: {
    flex: 1,
    /*backgroundColor: Colors.blue,*/
    alignItems: "center",
  },
  textMessage: {
    fontFamily: "Interbold",
    color: Colors.green,
    textAlign: "center",
    width: deviceWidth < 350 ? "70%" : "80%",
    flexDirection: "row",
  },
  userFridge: {
    /*backgroundColor: Colors.blue,*/
    fontFamily: "Intermedium",
  },
  addReadyButton: {
    flexDirection: "row",
  },
  addFood: {
    backgroundColor: "white",
    paddingVertical: /*deviceWidth < 450 ?*/ 10 /*: 15*/,
    paddingHorizontal: 10,
    borderRadius: 60,
    marginHorizontal: /*deviceWidth < 450 ?*/ 20 /*: 25*/,
    marginVertical: /*deviceWidth < 450 ? */ 5 /*: 10*/,
    borderWidth: 4,
    borderColor: Colors.green,
    flexDirection: "row",
    fontFamily: "Interlight",
  },
  addFoodInput: {
    fontSize: /* deviceWidth < 450 ?*/ 15 /*: 20*/,
    fontWeight: "bold",
    color: Colors.green,
  },
  addFoodIcon: {
    paddingRight: 5,
    paddingLeft: 10,
  },
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
  readyView: {
    backgroundColor: Colors.blue,
    justifyContent: "center",
    width: "50%",
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
  fridgeView: {
    backgroundColor: Colors.blue,
    flex: 1,
  },
  fridgeSelectedView: {
    backgroundColor: Colors.blue,
  },
  fridgeInstView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  fridgeToRecipe: {
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 15,
    width: "80%",
  },
  userFridgeItem: {
    backgroundColor: "white",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 30,
    width: "90%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  overlayToRecipe: {
    position: "absolute",
    width: "90%",
    height: 60,
    borderRadius: 30,
    borderColor: Colors.green,
    borderWidth: 4,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  itemView: {
    justifyContent: "center",
    height: 60,
  },
  itemName: {
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 17,
  },
  carbonView: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    padding: 10,
    borderRadius: 60,
  },
  itemCarbon: {
    fontWeight: "bold",
    color: "white",
  },
  expView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightpink,
    padding: 10,
    height: 60,
  },
  itemExp: {
    color: Colors.darkgreen,
    fontWeight: "bold",
  },
  userImageView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 10,
    height: 60,
  },
  userImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  editItem: { justifyContent: "center", alignItems: "center" },
  deleteItem: { justifyContent: "center", alignItems: "center" },
  editView: {
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
