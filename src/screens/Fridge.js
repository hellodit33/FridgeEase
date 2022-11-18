import { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useFonts } from "expo-font";
import {
  addFoodToFridge,
  removeFoodFromFridge,
} from "../../store/redux/actions/fridge.actions";
import {
  addFoodToRecipe,
  deleteFoodFromFridge,
  editFoodFromFridge,
} from "../../store/redux/actions/user.actions";
import { getUser } from "../../store/redux/actions/user.actions";
import EditModal from "../components/EditModal";
import {
  View,
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
import SuggestionInput from "./SuggestionInput";
import SuggestionItem from "./SuggestionItem";
import { storeSuggestions } from "../util/http";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../UI/IconButton";
import FoodComponents from "../components/FoodComponents";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { faHelicopterSymbol } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { cos } from "react-native-reanimated";
import IcoButton from "../components/IcoButton";
import PrimaryButton from "../components/PrimaryButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Fridge(props) {
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

  const [modalIsVisible, setModalIsVisible] = useState(false);
  function openModal(item) {
    setModalIsVisible(true);
    console.log(item._id);
    console.log(item.foodName);
    setItemToEdit(item._id);
    console.log(itemToEdit);
  }
  function closeModal() {
    setModalIsVisible(false);
  }

  const userData = useSelector((state) => state.userReducer);
  const userFood = useSelector((state) => state.usersfood);

  const fridge = useSelector((state) => state.intoFridgeReducer);

  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  const [foodlist, setFoodlist] = useState(foodsLists);
  const [isAdded, setIsAdded] = useState(false);
  const [addedItems, setAddedItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectToRecipe, setSelectToRecipe] = useState([]);
  const [unselectToRecipe, setUnselectToRecipe] = useState([]);

  const [toDelete, setToDelete] = useState(false);

  const [titles, setTitles] = useState("");

  const handlePress = (food) => {
    if (selectedItems.includes(food._id)) {
      const newSelect = selectedItems.filter((foodId) => foodId !== food._id);
      dispatch(removeFoodFromFridge(userData._id, food._id));
      return setSelectedItems(newSelect);
    }
    setSelectedItems([...selectedItems, food._id]);

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

      return setSelectToRecipe(newListItem);
    }

    setSelectToRecipe([...selectToRecipe, food._id]);
    dispatch(addFoodToRecipe(userData._id, food.foodName));
    dispatch(getUser(userData._id));
    console.log(selectToRecipe);
  };

  /*
  const handlePress = () => {
    dispatch(addFoodToFridge(userData._id, foodIdToAdd));
    setIsAdded(true);

    console.log(isAdded);
  };*/

  function FoodDetails() {
    navigation.navigate("FoodDetails");
  }

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
        keyExtractor={(item) => `${item.id}`}
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

  function renderMyFridge() {
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
        if (userData.usersfood[i] === item._id) */ {
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
                    <Text style={styles.itemName}>{item.foodName}</Text>
                  </View>
                  <View style={styles.expView}>
                    <Text style={styles.itemExp}>
                      {item.foodExpiration} dagar
                    </Text>
                  </View>
                  <View style={styles.carbonView}>
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
                {selectToRecipe.includes(item._id) && (
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
        data={userData.usersfood}
        extraData={userData.usersfood}
        keyExtractor={(item) => `${item._id}`}
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

  if (!loaded) {
    return <LoadingOverlay message="Ge oss en kort stund..." />;
  }

  function showFoodComponents() {
    setMessageFoodComponents(false);
    setFoodComponents(true);
    setHideFood(true);
  }

  const hello = () => {
    setHideFood(false);
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

  function onSelectCategory(category) {
    //filter restaurant
    let filteredFridge = fridge.filter((foodcat) =>
      foodcat.category.includes(categories.name)
    );
    setNewFood(filteredFridge);

    setSelectedCategory(category);
  }

  return (
    <>
      <View>
        <View style={styles.main}>{renderFoodCategories()}</View>
      </View>
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
          {foodComponents && hideFood && (
            <View style={styles.readyView}>
              <Pressable style={styles.readyButton} onPress={() => hello()}>
                <Text style={styles.readyText}>Klar</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>

      {messageFoodComponents && !userData.usersfood && (
        <View style={styles.message}>
          <Text style={styles.textMessage}>
            Ditt kylskåp är tomt, lägg till matvaror för att se vilka matvaror
            som behöver ätas upp snart och få inspiration till matlagning!
          </Text>
        </View>
      )}

      {userData.usersfood && !hideFood && (
        <View style={styles.fridgeView}>
          <View style={styles.fridgeInstView}>
            {/*<Text>{userData.usersfood.length} products in your fridge</Text>*/}
            <Text style={styles.fridgeToRecipe}>
              Markera de matvaror du vill laga mat på och klicka på receptikonen
            </Text>
          </View>
          {renderMyFridge()}
        </View>
      )}
      {foodComponents && hideFood && (
        <View>
          <View>
            <FlatList
              legacyImplementation={true}
              contentContainerStyle={styles.foodList}
              numColumns={3}
              data={foodlist}
              extraData={foodlist}
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
          </View>
        </View>
      )}
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
    color: Colors.green,
  },
  addFoodIcon: {
    paddingRight: 5,
    paddingLeft: 10,
  },
  foodList: {
    backgroundColor: Colors.blue,
    alignItems: "center",
    paddingBottom: 300,
    marginBottom: 300,
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
  fridgeInstView: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  fridgeToRecipe: {
    color: Colors.green,
    fontWeight: "bold",
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
  expView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.lightpink,
    padding: 10,
    height: 60,
  },
  itemExp: {
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
  editItem: { justifyContent: "center", alignItems: "center" },
  deleteItem: { justifyContent: "center", alignItems: "center" },
  editView: {
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
