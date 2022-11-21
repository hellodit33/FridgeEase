import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import LoadingOverlay from "../UI/LoadingOverlay.js";
import Colors from "../../constants/Colors.js";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import IcoButton from "../components/IcoButton.js";
import EditModalShopping from "../components/EditModalShopping.js";
import { useDispatch } from "react-redux";
import {
  addFromFridgeToShopping,
  getUser,
  deleteFoodFromShopping,
  editFoodFromShopping,
} from "../../store/redux/actions/user.actions.js";
import {
  addFoodToFridge,
  addShoppingToFridge,
  fetchFood,
} from "../../store/redux/actions/fridge.actions.js";
import { Ionicons } from "@expo/vector-icons";
import { removeShoppingList } from "../../store/redux/actions/user.actions.js";
import id from "date-fns/locale/id/index";
function Shopping({ navigation }) {
  const handlePressToShoppingList = (food) => {
    if (selectedItems.includes(food._id)) {
      const newSelect = selectedItems.filter((foodId) => foodId !== food._id);
      /* dispatch(removeFoodFromFridge(userData._id, food._id));*/
      return setSelectedItems(newSelect);
    }
    setSelectedItems([...selectedItems, food._id]);

    dispatch(addFromFridgeToShopping(userData._id, food.title));
    dispatch(getUser(userData._id));
  };
  const foodsLists = useSelector((state) => state.intoFridgeReducer);
  const [foodlist, setFoodlist] = useState(foodsLists);
  const [foodComponents, setFoodComponents] = useState(false);
  const [hideFood, setHideFood] = useState(false);
  const [showShopping, setShowShopping] = useState(true);

  const [selectedItems, setSelectedItems] = useState([]);
  function showFoodComponents() {
    setFoodComponents(true);
    setHideFood(true);
  }

  const hello = () => {
    setHideFood(false);
    setFoodComponents(false);
  };
  const categoryData = [
    {
      id: 1,
      name: "Allt",
    },
    {
      id: 2,
      name: "Grönsaker",
    },
    {
      id: 3,
      name: "Frukt",
    },
    {
      id: 4,
      name: "Mejeri",
    },
    {
      id: 5,
      name: "Kött & Fisk",
    },
    {
      id: 6,
      name: "Bageri & Spannmål",
    },
    {
      id: 7,
      name: "Fryst",
    },
    {
      id: 8,
      name: "Kryddor",
    },
    {
      id: 9,
      name: "Pasta & Ris",
    },
    {
      id: 10,
      name: "Desserter",
    },
  ];

  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  function renderFoodCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: 4,
            marginTop: 20,
            backgroundColor: Colors.blue,
            alignItems: "center",
            justifyContent: "center",
          }}
          /* onPress={() => onSelectCategory(item)}*/
        >
          <Text
            style={{
              paddingLeft: 5,
              marginRight: 12,
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.green,
              textDecorationStyle: "solid",
              textDecorationColor: Colors.darkpink,
              textDecorationLine:
                selectedCategory?.id == item.id ? "underline" : "none",
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
    return (
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={true}
        keyExtractor={(item) => Math.random(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{}}
      ></FlatList>
    );
  }
  const dispatch = useDispatch();
  const [selectToShopping, setSelectToShopping] = useState([]);

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [passedData, setPassedData] = useState([]);

  function openModal({
    id,
    name,
    carbon,
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

  const userData = useSelector((state) => state.userReducer);
  const fridge = useSelector((state) => state.intoFridgeReducer);

  const removeShopping = () => {
    dispatch(removeShoppingList(userData._id));
    /*dispatch(addShoppingToFridge(userData._id));*/
    dispatch(getUser(userData._id));
  };

  function renderShoppingFridge() {
    const handlePressToShopping = (food) => {
      if (selectToShopping.includes(food._id)) {
        const newListItem = selectToShopping.filter(
          (foodId) => foodId !== food._id
        );

        return setSelectToShopping(newListItem);
      }

      setSelectToShopping([...selectToShopping, food._id]);
      dispatch(
        addShoppingToFridge(
          userData._id,
          food._id,
          food.title,
          food.carbon,
          food.expiration,
          food.category,
          food.logo
        )
      );
      dispatch(getUser(userData._id));
      console.log(selectToShopping);
    };
    const editInShopping = (item) => {
      dispatch(getUser(userData._id));
      closeModal();
    };

    function renderCarbon({ fridge }) {
      if (fridge.carbon > 300) {
        return <Text style={styles.itemCarbon}>B</Text>;
      }
      if (fridge.carbon <= 300) {
        return <Text style={styles.itemCarbon}>A</Text>;
      }
    }
    const userShopping = userData.shoppingList;
    const item = "";
    return fridge.map((fridge) => {
      for (let i = 0; i < userShopping.length; i++) {
        if (fridge.title === userShopping[i].foodName) {
          const name = fridge.title;
          const quantity = userShopping[i].foodQuantity;
          const id = userShopping[i]._id;
          const carbon = fridge.carbon;
          const logo = fridge.logo;
          const bioquality = "";
          const existingBioQuality = userShopping[i].foodBioQuality;

          const removeShoppingItem = () => {
            dispatch(deleteFoodFromShopping(userData._id, id));
            dispatch(getUser(userData._id));
          };
          return (
            <>
              <ScrollView
                key={() => Math.random(id)}
                style={styles.shoppingListScroll}
              >
                <Pressable
                  onPress={() =>
                    handlePressToShopping(fridge)
                  } /*onPress={() => handlePressToRecipe(item)}*/
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
                    <View style={styles.carbonView}>
                      {/*<Text style={styles.itemCarbon}>{item.foodCarbon} CO2</Text>*/}
                      <Text style={styles.itemCarbon}>{fridge.carbon}</Text>
                      {/*renderCarbon({ fridge })*/}
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
                          onPress={() => removeShoppingItem()}
                        />

                        <EditModalShopping
                          visible={modalIsVisible}
                          passedData={passedData}
                          closeModal={closeModal}
                          editFoodInShopping={editInShopping}
                        />
                      </View>
                    )}
                    {selectToShopping.includes(fridge._id) && (
                      <View style={styles.overlayToShopping} />
                    )}
                  </View>
                </Pressable>
              </ScrollView>
            </>
          );
        }
      }
    });
  }

  /*function renderMyFridge() {
    const editInFridge = (item) => {
      dispatch(
        editFoodFromFridge(
          userData._id,
          item._id,
          item.foodExpiration,
          item.foodQuantity
        )
      );
      dispatch(getUser(userData._id));
      closeModal();
    };
    const deleteInFridge = (item) => {
      dispatch(deleteFoodFromFridge(userData._id, item._id));
      dispatch(getUser(userData._id));
    };

    function renderCarbon({ item }) {
      if (item.foodCarbon > 300) {
        return <Text style={styles.itemCarbon}>B</Text>;
      }
      if (item.foodCarbon <= 300) {
        return <Text style={styles.itemCarbon}>A</Text>;
      }
    }
    const renderFridge = ({ item }) => {
      /*   for (let i = 0; i < userData.usersfood.length; i++) {
        if (userData.usersfood[i] === item._id)  {
        return (
          <>
            <ScrollView>
              <Pressable onPress={() => handlePressToRecipe(item)}>
                <View style={styles.userFridgeItem}>
                  <View style={styles.userImageView}>
                    <Image
                      style={styles.userImage}
                      source={{
                        uri:
                          "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                          item.foodLogo,
                      }}
                    ></Image>
                  </View>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>{item}</Text>
                  </View>
                  <View style={styles.expView}>
                    <Text style={styles.itemExp}>
                      {item.foodExpiration} dagar
                    </Text>
                  </View>
                  <View style={styles.carbonView}>
                    {/*<Text style={styles.itemCarbon}>{item.foodCarbon} CO2</Text>}
                    {renderCarbon({ item })}
                  </View>
                  <View style={styles.editItem}>
                    <IcoButton
                      icon="create-outline"
                      size={24}
                      color={Colors.green}
                      onPress={() => openModal(item)}
                    />
                  </View>

                  <View style={styles.deleteItem}>
                    <IcoButton
                      icon="close-outline"
                      size={24}
                      color={Colors.green}
                      onPress={() => deleteInFridge(item)}
                    />

                    <EditModal
                      visible={modalIsVisible}
                      foodItem={item}
                      onEditFood={() => editInFridge()}
                    />
                  </View>
                </View>
                {selectToRecipe.includes(item._id) &&
                  !unselectToRecipe.includes(item._id) && (
                    <View style={styles.overlayToRecipe} />
                  )}
              </Pressable>
            </ScrollView>
          </>
        );
      }
    };

    return (
      <FlatList
        data={userData.shoppingList}
        extraData={userData.shoppingList}
        keyExtractor={(item) => Math.random(userData._id)}
        renderItem={renderFridge}
        contentContainerStyle={{}}
      ></FlatList>
    );*/
  const [loaded] = useFonts({
    alk: require("../../assets/fonts/Alkalami-Regular.ttf"),
    Intermedium: require("../../assets/fonts/Inter-Medium.ttf"),
    Interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    Interlight: require("../../assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) {
    return <LoadingOverlay message="Ge oss en kort stund..." />;
  }
  return (
    <>
      <View style={styles.shoppingList}>
        <View>{renderFoodCategories()}</View>
        <View
          style={[
            {
              flex: 1,
              opacity: modalIsVisible ? 0.5 : !modalIsVisible ? 1 : null,
              backgroundColor: modalIsVisible ? Colors.lightblue : null,
            },
          ]}
        >
          <View style={styles.fridge}>
            <View style={styles.addKlar}>
              <View
                style={[
                  styles.addFood,
                  { width: foodComponents && hideFood ? "65%" : "90%" },
                ]}
              >
                <View style={styles.addFoodIcon}>
                  <Ionicons name="add-sharp" size={24} />
                </View>
                <View style={styles.addFoodInput}>
                  <TextInput
                    style={styles.addFoodInput}
                    placeholderTextColor={Colors.green}
                    placeholder="Lägg till shoppinglistan...."
                    keyboardType="default"
                    multiline={false}
                    onTouchStart={showFoodComponents}
                    /* onChangeText={(e) => searchFilterFunction(e.nativeEvent.text)}*/
                  />
                </View>
              </View>
              {foodComponents && hideFood && (
                <View style={styles.readyView}>
                  <Pressable style={styles.readyButton} onPress={() => hello()}>
                    <Text style={styles.readyText}>Klar</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </View>
          {foodComponents && hideFood && (
            <View style={{ flex: 1 }}>
              <View>
                <View>
                  <FlatList
                    legacyImplementation={true}
                    contentContainerStyle={styles.foodList}
                    numColumns={3}
                    data={foodlist}
                    extraData={foodlist}
                    keyExtractor={(item) => Math.random(item._id)}
                    renderItem={({ item }) => (
                      <Pressable
                        /* onLongPress={FoodDetails}*/
                        onPress={() => handlePressToShoppingList(item)}
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
                </View>
              </View>
            </View>
          )}
          <View style={{ flex: 1 }}>
            {!foodComponents && !hideFood && (
              <>
                {userData.shoppingList.length >= 1 && (
                  <Pressable
                    onPress={removeShopping}
                    style={styles.doneShopping}
                  >
                    <Text style={styles.doneShoppingText}>
                      Jag är klar med mitt matinköp
                    </Text>
                  </Pressable>
                )}
                <View>{renderShoppingFridge()}</View>
              </>
            )}
          </View>
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
    flex: 1,
  },
  main: {
    backgroundColor: Colors.blue,
    margin: 50,

    justifyContent: "center",
    alignItems: "center",
  },
  fridgeView: {
    backgroundColor: Colors.blue,
    flex: 1,
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
    backgroundColor: "green",
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
    color: "white",
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
  addKlar: {
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
  shoppingListScroll: {},
});
