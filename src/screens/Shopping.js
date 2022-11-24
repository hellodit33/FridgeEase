import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  TextInput,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import LoadingOverlay from "../UI/LoadingOverlay.js";
import Colors from "../../constants/Colors.js";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import IcoButton from "../UI/IcoButton.js";
import EditModalShopping from "../components/EditModalShopping.js";
import { useDispatch } from "react-redux";
import { showMessage } from "react-native-flash-message";
import {
  getUser,
  deleteFoodFromShopping,
} from "../../store/redux/actions/user.actions.js";
import {
  addItemsToFridge,
  fetchFood,
} from "../../store/redux/actions/fridge.actions.js";
import { Ionicons } from "@expo/vector-icons";
import ShoppingDoneModal from "../components/ShoppingDoneModal.js";
import FoodToShopping from "../components/FoodToShopping.js";
import UserFridgeCat from "../components/UserFridgeCat.js";

function Shopping({ navigation }) {
  const screenHeight = Dimensions.get("window").height;

  //redux
  const dispatch = useDispatch();
  const foodsLists = useSelector((state) => state.intoFridgeReducer);
  const userData = useSelector((state) => state.userReducer);
  const fridge = useSelector((state) => state.intoFridgeReducer);
  const userShopping = userData.shoppingList;

  //Refresh utils for scrollview
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  //utils to select a category in the user fridge
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedShoppingFilter, setSelectedShoppingFilter] = useState(false);

  //show food to pick or not
  const [foodComponents, setFoodComponents] = useState(false);

  function showFoodComponents() {
    setFoodComponents(true);
  }

  const readyFunction = () => {
    setSelectedCategory("Allt");
    setFoodComponents(false);
  };

  //function to select shopping category
  async function onSelectedCategory(category) {
    setFoodComponents(false);
    setSelectedShoppingFilter(true);
    setSelectedCategory(category.name);
    console.log(selectedShoppingFilter);
    console.log(selectedCategory);
  }

  //state for overlay on list when user is shopping
  const [selectToShopping, setSelectToShopping] = useState([]);

  //render edit modal and pass data
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [passedData, setPassedData] = useState([]);

  function openModal({
    id,
    name,
    carbon,
    category,
    logo,
    quantity,
    bioquality,
    existingBioQuality,
  }) {
    setModalIsVisible(true);
    setPassedData({
      id,
      name,
      carbon,
      category,
      logo,
      quantity,
      bioquality,
      existingBioQuality,
    });
  }
  function closeModal() {
    dispatch(getUser(userData._id));
    setPassedData({});
    setModalIsVisible(false);
  }

  //Render "done shopping" modal
  const [doneModalIsVisible, setDoneModalIsVisible] = useState(false);
  function openDoneModal() {
    setDoneModalIsVisible(true);
  }
  function closeDoneModal() {
    setDoneModalIsVisible(false);
  }

  //render shoppinglist
  function renderShoppingList() {
    //edit through edit modal
    const editInShopping = (item) => {
      dispatch(getUser(userData._id));
    };

    //Remove through edit modal
    const removeInShopping = (item) => {
      dispatch(getUser(userData._id));
    };

    const removeShoppingItem = (itemId) => {
      dispatch(deleteFoodFromShopping(userData._id, itemId));
      dispatch(getUser(userData._id));
    };
    //add shopping items to fridge
    const addShoppingToFridge = async (food) => {
      if (selectToShopping.includes(food._id)) {
        const newListItem = selectToShopping.filter(
          (foodId) => foodId !== food._id
        );
        showMessage({
          duration: 6000,
          message:
            "Denna vara är redan i ditt kylskåp. Du kan ta bort den i ditt kylskåp.",
          backgroundColor: Colors.green,
          color: "white",
        });
        return setSelectToShopping(newListItem);
      } else {
        setSelectToShopping([...selectToShopping, food._id]);
        showMessage({
          duration: 6000,
          message: "Denna vara har lagts till i ditt kylskåp.",
          backgroundColor: Colors.green,
          color: "white",
        });
        await dispatch(
          addItemsToFridge(
            userData._id,
            food.title,
            food.logo,
            food.carbon,
            food.category,
            food.expiration
          )
        );
        await dispatch(getUser(userData._id));
      }
    };

    //match shopping info from users to fridge to get all info about carbon, category and logo (to avoid redundant data)
    const item = "";
    //remove an item from shopping through modal

    return fridge.map((fridge) => {
      let userShoppingLength = userShopping.length;
      for (let i = 0; i < userShoppingLength; i++) {
        if (fridge.title === userShopping[i].foodName) {
          const name = fridge.title;
          const quantity = userShopping[i].foodQuantity;
          const id = userShopping[i]._id;
          const carbon = fridge.carbon;
          const category = fridge.category;

          const logo = fridge.logo;
          const bioquality = "";
          const existingBioQuality = userShopping[i].foodBioQuality;

          if (!selectedShoppingFilter || selectedCategory === "Allt")
            return (
              <View>
                <Pressable
                  onPress={() => addShoppingToFridge(fridge)}
                  key={() => Math.random(id * 8)}
                >
                  <View
                    style={[
                      styles.userFridgeItem,
                      {
                        backgroundColor: selectToShopping.includes(fridge._id)
                          ? Colors.blue
                          : "white",
                      },
                    ]}
                  >
                    <View style={styles.userImageView}>
                      <Image
                        accessibilityLabel={fridge.logo}
                        style={styles.userImage}
                        source={{
                          uri:
                            "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                            fridge.logo,
                        }}
                      ></Image>
                    </View>
                    <View style={styles.itemView}>
                      <Text style={styles.itemName}>{fridge.title}</Text>
                      {existingBioQuality === true && (
                        <Text style={styles.itemEko}>Eko</Text>
                      )}
                    </View>
                    {quantity ? (
                      <View style={styles.quantityView}>
                        <Text style={styles.quantityText}>{quantity}</Text>
                      </View>
                    ) : (
                      <View style={styles.quantityView}>
                        <Text style={styles.quantityText}>Kvantité?</Text>
                      </View>
                    )}
                    <View
                      style={[
                        {
                          backgroundColor:
                            fridge.carbon === "A"
                              ? Colors.darkgreen
                              : fridge.carbon === "B"
                              ? Colors.lightgreen
                              : fridge.carbon === "C"
                              ? Colors.lightorange
                              : fridge.carbon === "D"
                              ? Colors.orange
                              : fridge.carbon === "E"
                              ? Colors.red
                              : null,
                        },
                        styles.carbonView,
                      ]}
                    >
                      <Text style={styles.itemCarbon}>{fridge.carbon}</Text>
                    </View>
                    {selectToShopping.includes(fridge._id) && (
                      <View style={styles.iconItem}>
                        <Ionicons
                          name="checkmark-done"
                          size={29}
                          color={Colors.green}
                        />
                      </View>
                    )}
                    {!selectToShopping.includes(fridge._id) && (
                      <View style={styles.iconItem}>
                        <IcoButton
                          icon="create-outline"
                          size={24}
                          color={Colors.green}
                          onPress={() => {
                            openModal({
                              name,
                              id,
                              quantity,
                              bioquality,
                              existingBioQuality,
                              carbon,
                              logo,
                            });
                          }}
                        />
                      </View>
                    )}

                    {!selectToShopping.includes(fridge._id) && (
                      <View style={styles.iconItem}>
                        <IcoButton
                          icon="close"
                          size={24}
                          color={Colors.darkpink}
                          onPress={() => removeShoppingItem(id)}
                        />

                        <EditModalShopping
                          visible={modalIsVisible}
                          passedData={passedData}
                          closeModal={closeModal}
                          removeFoodInShopping={removeInShopping}
                          editFoodInShopping={editInShopping}
                        />
                      </View>
                    )}
                    {selectToShopping.includes(fridge._id) && (
                      <View style={styles.overlayToShopping} />
                    )}
                  </View>
                </Pressable>
              </View>
            );
          else if (selectedShoppingFilter) {
            const name = fridge.title;
            const quantity = userShopping[i].foodQuantity;
            const id = userShopping[i]._id;
            const carbon = fridge.carbon;
            const category = fridge.category;

            const logo = fridge.logo;
            const bioquality = "";
            const existingBioQuality = userShopping[i].foodBioQuality;
            if (
              selectedCategory === fridge.category &&
              selectedCategory !== "Allt"
            )
              return (
                <>
                  <Pressable onPress={() => addShoppingToFridge(fridge)}>
                    <View
                      style={[
                        styles.userFridgeItem,
                        {
                          backgroundColor: selectToShopping.includes(fridge._id)
                            ? Colors.blue
                            : "white",
                        },
                      ]}
                    >
                      <View style={styles.userImageView}>
                        <Image
                          style={styles.userImage}
                          source={{
                            uri:
                              "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                              fridge.logo,
                          }}
                        ></Image>
                      </View>
                      <View style={styles.itemView}>
                        <Text style={styles.itemName}>{fridge.title}</Text>
                        {existingBioQuality === true && (
                          <Text style={styles.itemEko}>Eko</Text>
                        )}
                      </View>
                      {quantity ? (
                        <View style={styles.quantityView}>
                          <Text style={styles.quantityText}>{quantity}</Text>
                        </View>
                      ) : (
                        <View style={styles.quantityView}>
                          <Text style={styles.quantityText}>Kvantité?</Text>
                        </View>
                      )}
                      <View
                        style={[
                          {
                            backgroundColor:
                              fridge.carbon === "A"
                                ? Colors.darkgreen
                                : fridge.carbon === "B"
                                ? Colors.lightgreen
                                : fridge.carbon === "C"
                                ? Colors.lightorange
                                : fridge.carbon === "D"
                                ? Colors.orange
                                : fridge.carbon === "E"
                                ? Colors.red
                                : null,
                          },
                          styles.carbonView,
                        ]}
                      >
                        <Text style={styles.itemCarbon}>{fridge.carbon}</Text>
                      </View>
                      {selectToShopping.includes(fridge._id) && (
                        <View style={styles.iconItem}>
                          <Ionicons
                            name="checkmark-done"
                            size={29}
                            color={Colors.green}
                          />
                        </View>
                      )}
                      {!selectToShopping.includes(fridge._id) && (
                        <View style={styles.iconItem}>
                          <IcoButton
                            icon="create-outline"
                            size={24}
                            color={Colors.green}
                            onPress={() => {
                              openModal({
                                name,
                                id,
                                quantity,
                                bioquality,
                                existingBioQuality,
                                carbon,
                                logo,
                              });
                            }}
                          />
                        </View>
                      )}

                      {!selectToShopping.includes(fridge._id) && (
                        <View style={styles.iconItem}>
                          <IcoButton
                            icon="close"
                            size={24}
                            color={Colors.darkpink}
                            onPress={() => removeShoppingItem(id)}
                          />

                          <EditModalShopping
                            visible={modalIsVisible}
                            passedData={passedData}
                            closeModal={closeModal}
                            removeFoodInShopping={removeInShopping}
                            editFoodInShopping={editInShopping}
                          />
                        </View>
                      )}
                      {selectToShopping.includes(fridge._id) && (
                        <View style={styles.overlayToShopping} />
                      )}
                    </View>
                  </Pressable>
                </>
              );
          }
        }
      }
    });
  }

  const [loaded] = useFonts({
    Intermedium: require("../../assets/fonts/Inter-Medium.ttf"),
    Interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    Interlight: require("../../assets/fonts/Inter-Light.ttf"),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchFood())
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [userData]);

  if (!loaded || isLoading) {
    return <LoadingOverlay message="Ge oss en kort stund..." />;
  }

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
              flex: 1,
              opacity: modalIsVisible ? 0.5 : !modalIsVisible ? 1 : null,
              backgroundColor: modalIsVisible ? Colors.lightblue : null,
            },
          ]}
        >
          <View
            style={[{ marginTop: foodComponents ? 20 : null }, styles.fridge]}
          >
            <View style={styles.addReadyButton}>
              <View
                style={[
                  styles.addFood,
                  { width: foodComponents ? "65%" : "90%" },
                ]}
              >
                <View style={styles.addFoodIcon}>
                  <Ionicons name="add-sharp" size={24} />
                </View>
                <View style={styles.addFoodInput}>
                  <TextInput
                    style={styles.addFoodInput}
                    placeholderTextColor={Colors.green}
                    placeholder="Lägg till inköpslistan...."
                    keyboardType="default"
                    onTouchStart={showFoodComponents}
                  />
                </View>
              </View>
              {foodComponents && (
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
          {foodComponents && (
            <FoodToShopping selectedCategory={selectedCategory} />
          )}

          {(!selectedShoppingFilter || selectedCategory === "Allt") &&
            !foodComponents && (
              <>
                <View>
                  <View>
                    {userData.shoppingList.length > 0 && (
                      <>
                        <Pressable
                          onPress={openDoneModal}
                          style={styles.doneShopping}
                        >
                          <Text style={styles.doneShoppingText}>
                            Jag är klar med mitt matinköp
                          </Text>
                        </Pressable>
                        <ShoppingDoneModal
                          visible={doneModalIsVisible}
                          closeModal={closeDoneModal}
                        />
                      </>
                    )}
                    {userData.shoppingList.length === 0 &&
                      (!selectedShoppingFilter || selectedShoppingFilter) && (
                        <View style={styles.noFavs}>
                          <View style={styles.deleteTitle}>
                            <Ionicons
                              name="alert-circle-outline"
                              size={30}
                            ></Ionicons>
                            <Text style={styles.infoTitle}>
                              Du har inga matvaror i din inköpslista ännu.
                            </Text>
                          </View>
                          <View style={styles.infoView}>
                            <Text styles={styles.infoText}>
                              Lägg till matvaror genom att klicka på "Lägg till
                              inköpslistan...".
                            </Text>
                          </View>
                        </View>
                      )}
                  </View>
                </View>
              </>
            )}

          {!foodComponents && userData.shoppingList.length > 0 && (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {renderShoppingList()}
            </ScrollView>
          )}
        </View>
      </View>
    </>
  );
}

export default Shopping;

const styles = StyleSheet.create({
  shoppingList: {
    backgroundColor: Colors.blue,
    fontFamily: "Intermedium",

    flexDirection: "row",
  },
  main: {
    backgroundColor: Colors.blue,
    fontFamily: "Interbold",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  fridgeView: {
    backgroundColor: Colors.blue,
  },
  fridgeInstView: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  fridgeToRecipe: {
    color: Colors.green,
    fontWeight: "bold",
  },
  userFridgeItem: {
    marginVertical: 10,
    borderRadius: 30,
    width: "90%",
    height: 60,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  overlayToShopping: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 30,
    marginLeft: -10,

    borderColor: Colors.green,
    borderWidth: 4,
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
  itemEko: {
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 14,
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
  quantityView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightpink,
    padding: 10,
    height: 60,
  },
  quantityText: {
    color: Colors.darkgreen,
    fontWeight: "bold",
  },
  userImageView: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingLeft: 2,
  },
  userImage: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  iconItem: { justifyContent: "center", alignItems: "center" },

  editView: {
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fridge: {
    backgroundColor: Colors.blue,
    fontFamily: "Intermedium",
  },
  addReadyButton: {
    flexDirection: "row",
    marginHorizontal: -5,
  },
  addFood: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 120,
    marginHorizontal: 20,
    marginVertical: 5,
    borderWidth: 4,
    borderColor: Colors.green,
    flexDirection: "row",
    fontFamily: "Interlight",
  },
  addFoodInput: {
    fontSize: 15,
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
    width: "40%",
  },
  readyButton: {
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: Colors.green,
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: "50%",
  },
  readyText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  doneShopping: {
    marginLeft: 20,
    marginVertical: 5,
  },
  doneShoppingText: {
    color: Colors.green,
    fontWeight: "800",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  noFavs: {
    borderColor: Colors.darkgreen,
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "white",
    marginVertical: 50,
    marginHorizontal: 40,
    padding: 30,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.darkgreen,
    marginLeft: 20,
  },
  infoView: {
    marginVertical: 10,
  },
  infoText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
});
