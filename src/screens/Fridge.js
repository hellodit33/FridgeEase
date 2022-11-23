import React, { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useFonts } from "expo-font";
import {
  addFoodToFridge,
  fetchFood,
  removeFoodFromFridge,
} from "../../store/redux/actions/fridge.actions";
import {
  addFoodToRecipe,
  deleteFoodFromFridge,
  deleteRecipeFoodFilter,
  editFoodFromFridge,
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
import IconButton from "../UI/IconButton";
import FoodComponents from "../components/FoodComponents";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { faHelicopterSymbol } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import IcoButton from "../UI/IcoButton";
import PrimaryButton from "../UI/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { differenceInDays, parseISO } from "date-fns";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { fetchRecipes } from "../../store/redux/actions/recipe.actions";

function Fridge({ props, navigation, route }) {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  function dateDiff(item1, item2) {
    let dateDiff = differenceInDays(Date.parse(item1), Date.parse(item2));
    return dateDiff;
  }

  const [itemToEdit, setItemToEdit] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const searchFilterFunction = (text) => {
    const newData = foodlist
      .map((food) => food.foodName)
      .filter((f) => {
        let foodLowerCase = f.foodName.toLowerCase();
        let searchTermLowerCase = text.toLowerCase();
        return foodLowerCase.indexOf(searchTermLowerCase) > -1;
      });
    setFoodlist(newData);
  };

  const [selectedUserFilter, setSelectedUserFilter] = useState(false);
  const [selectedFridgeFilter, setSelectedFridgeFilter] = useState(false);

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
      name: "Skafferi",
    },
    {
      id: 7,
      name: "Pasta & Ris",
    },
    {
      id: 8,
      name: "Kryddor",
    },
  ];
  const [today, setToday] = useState(new Date());
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [passedData, setPassedData] = useState([]);

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
  function closeModal() {
    dispatch(getUser(userData._id));
    setPassedData({});
    setModalIsVisible(false);
  }

  const userData = useSelector((state) => state.userReducer);
  const userFood = userData.usersfood;

  const fridge = useSelector((state) => state.intoFridgeReducer);

  const [newFood, setNewFood] = useState([]);
  const [messageFoodComponents, setMessageFoodComponents] = useState(true);
  const [hideFood, setHideFood] = useState(false);
  const [hide, setHide] = useState(false);

  const [foodComponents, setFoodComponents] = useState(false);

  //function foodcomponent

  /*const fridge = async () => {
    const response = await fridgeApi.get("/api/fridge");
    console.log(response.data[0].title);
  };

  fridge();*/
  const dispatch = useDispatch();

  const foodsLists = useSelector((state) => state.intoFridgeReducer);
  const [foodlist, setFoodlist] = useState([foodsLists]);
  const [addedFood, setAddedFood] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCatItems, setSelectedCatItems] = useState([]);

  const [selectedNames, setSelectedNames] = useState([]);

  const [selectToRecipe, setSelectToRecipe] = useState([]);
  const [unselectToRecipe, setUnselectToRecipe] = useState([]);

  const [toDelete, setToDelete] = useState(false);

  const [titles, setTitles] = useState("");

  function findCommonElement(array1, array2) {
    // Loop for array1
    let firstArrayLength = array1.length;
    let secondArrayLength = array2.length;

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

  const handlePress = async (food) => {
    findCommonElement(selectedNames, selectedCatItems);
    if (
      selectedItems.includes(food._id) ||
      selectedNames.includes(food.title) ||
      !findCommonElement
    ) {
      const newSelect = selectedItems.filter((foodId) => foodId !== food._id);
      showMessage({
        duration: 6000,
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
      duration: 6000,
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

  /*
  const handlePress = () => {
    dispatch(addFoodToFridge(userData._id, foodIdToAdd));
    setIsAdded(true);

    console.log(isAdded);
  };*/

  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  async function onUserFridgeCategory(category) {
    setSelectedUserFilter(true);
    setSelectedFridgeFilter(false);

    setSelectedCategory(category.name);
    console.log(selectedCategory);

    const newArray = [];
  }
  async function onFridgeCategory(category) {
    if (category.name === "Allt") {
      setSelectedFridgeFilter(false);
    } else {
      setSelectedFridgeFilter(true);
      setSelectedUserFilter(false);

      setSelectedCategory(category.name);
      console.log(selectedCategory);
    }
  }
  function renderUserFridgeCategories() {
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
          onPress={() => onUserFridgeCategory(item)}
        >
          <Text
            style={{
              paddingLeft: 5,
              marginRight: 12,
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.green,
              textDecorationStyle: "solid",
              textDecorationColor:
                selectedCategory === item.name ? Colors.darkpink : "none",
              textDecorationLine:
                selectedCategory === item.name ? "underline" : "none",
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

  function renderFridgeCategories() {
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
          onPress={() => onFridgeCategory(item)}
        >
          <Text
            style={{
              paddingLeft: 5,
              marginRight: 12,
              fontSize: 18,
              fontWeight: "bold",
              color: Colors.green,
              textDecorationStyle: "solid",
              textDecorationColor:
                selectedCategory === item.name ? Colors.darkpink : "none",
              textDecorationLine:
                selectedCategory === item.name ? "underline" : "none",
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
  /*
  function renderMyFridge() {

return(

    {userData.map((user) => { for (let i = 0; i < userData.userfoods.length; i++) {
          if (fridge._id === user.userfoods[i]) {
            <Text>{fridge.title}</Text>;
          }
        }
      })
    }
)
  }*/

  /* const userFridge = fridge.filter((item) => item._id !== userFood);
  console.log("myfood" + userFridge);
  console.log(JSON.stringify(userFridge));*/
  const userId = userData._id;

  function renderMyFridge() {
    const editInFridge = () => {
      closeModal();
    };
    const deleteInFridge = (item) => {
      dispatch(deleteFoodFromFridge(userData._id, item._id));
      dispatch(getUser(userData._id));
    };

    /*function renderCarbon({ item }) {
      if (item.foodCarbon > 300) {
        return <Text style={styles.itemCarbon}>B</Text>;
      }
      if (item.foodCarbon <= 300) {
        return <Text style={styles.itemCarbon}>A</Text>;
      }
    }*/
    const renderFridge = ({ item }) => {
      /*   for (let i = 0; i < userData.usersfood.length; i++) {
        if (userData.usersfood[i] === item._id) */
      /* function dateDiff() {
        let dateDiff = differenceInDays(
          Date.parse(item.foodExpirationDate),
          Date.parse(today)
        );
        return dateDiff;
      }*/

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
        <>
          <FlashMessage position="top" />

          <ScrollView
            key={() => Math.random(userData._id)}
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
                  {/* renderCarbon({ item })*/}
                </View>
                <View style={styles.editItem}>
                  <IcoButton
                    icon="create-outline"
                    size={24}
                    color={Colors.green}
                    onPress={
                      /*() => openEditFridge()*/

                      () => {
                        openModal({
                          id,
                          name,
                          quantity,
                          expiration,
                          expirationDate,
                          carbon,
                          logo,
                        });
                      }
                    }
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
        keyExtractor={() => Math.random(userData._id)}
        renderItem={renderFridge}
        contentContainerStyle={{}}
      ></FlatList>
    );
  }

  const [loaded] = useFonts({
    alk: require("../../assets/fonts/Alkalami-Regular.ttf"),
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

  function showFoodComponents() {
    setMessageFoodComponents(false);
    setFoodComponents(true);
    setHideFood(true);
  }

  const hello = () => {
    setHideFood(false);
    setFoodComponents(false);
    setSelectedItems([]);
    setSelectedNames([]);
    setSelectedCatItems([]);
  };
  /*const addNewFood = (id) => {
    setFood((userData) => {
      return [
        { id: food._id, key: Math.random().toString() },
        ...userData.usersfood,
      ];
    });
  };

  /*const { addFood } = useContext(AuthContext);*/

  return (
    <>
      <View
        style={{
          flex: 1,
        }}
      >
        {userData.usersfood && !hideFood && (
          <View>
            <View style={styles.main}>{renderUserFridgeCategories()}</View>
          </View>
        )}
        {foodComponents && hideFood && (
          <View>
            <View style={styles.main}>{renderFridgeCategories()}</View>
          </View>
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
          <View style={styles.fridge}>
            <View style={styles.addKlar}>
              <View
                style={[
                  styles.addFood,
                  { width: foodComponents && hideFood ? "60%" : "90%" },
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
                    multiline={false}
                    onTouchStart={showFoodComponents}
                    /* onChangeText={(e) => searchFilterFunction(e.nativeEvent.text)}*/
                  />
                </View>
              </View>

              {foodComponents &&
                hideFood &&
                (!selectedFridgeFilter || selectedFridgeFilter) && (
                  <View style={styles.readyView}>
                    <Pressable
                      style={styles.readyButton}
                      onPress={() => hello()}
                    >
                      <Text style={styles.readyText}>Klar</Text>
                    </Pressable>
                  </View>
                )}
            </View>
          </View>

          {!addedFood && !hideFood && !selectedUserFilter && (
            <View style={styles.message}>
              <Text style={styles.textMessage}>
                Ditt kylskåp är tomt, lägg till matvaror för att se vilka
                matvaror som snart behöver ätas upp och få inspiration till
                matlagning!
              </Text>
            </View>
          )}

          {addedFood && !hideFood && !selectedUserFilter && (
            <View style={styles.fridgeView}>
              <View style={styles.fridgeInstView}>
                {/*<Text>{userData.usersfood.length} products in your fridge</Text>*/}

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

          {!hideFood &&
            selectedUserFilter &&
            userFood.map((item) => {
              let userFoodLength = userFood.length;
              for (let i = 0; i < userFoodLength; i++) {
                if (item.foodCategory === selectedCategory) {
                  console.log(item.foodName);

                  return (
                    <ScrollView
                      key={item._id}
                      style={{ backgroundColor: Colors.blue }}
                      refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                      }
                    >
                      <Pressable onPress={() => handlePressToRecipe(item)}>
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
                            {/* renderCarbon({ item })*/}
                          </View>
                          <View style={styles.editItem}>
                            <IcoButton
                              icon="create-outline"
                              size={24}
                              color={Colors.green}
                              onPress={
                                /*() => openEditFridge()*/

                                () => {
                                  openModal({
                                    id,
                                    name,
                                    expiration,
                                    expirationDate,
                                    carbon,
                                    logo,
                                  });
                                }
                              }
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
                              /* editFoodInFridge={editInFridge}*/
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

          {foodComponents && hideFood && !selectedFridgeFilter && (
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
                    keyExtractor={(item) => Math.random(item._id)}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handlePress(item)}>
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

          {foodComponents && hideFood && selectedFridgeFilter && (
            <View style={{ flex: 1 }}>
              <FlatList
                contentContainerStyle={styles.selectedFoodList}
                numColumns={3}
                data={foodsLists}
                extraData={foodsLists}
                keyExtractor={(item) => Math.random(item._id + userData._id)}
                renderItem={({ item }) => {
                  if (item.category === selectedCategory) {
                    return (
                      <Pressable onPress={() => handlePress(item)}>
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
        </View>
      </View>
    </>
  );
}

export default Fridge;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
    fontFamily: "Interbold",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    flex: 1,
    backgroundColor: Colors.blue,
    alignItems: "center",
  },
  textMessage: {
    fontFamily: "Interbold",
    color: Colors.green,
    textAlign: "center",
    width: "80%",
  },
  fridge: {
    backgroundColor: Colors.blue,
    fontFamily: "Intermedium",
  },
  addKlar: {
    flexDirection: "row",
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
    flexDirection: "row",

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
