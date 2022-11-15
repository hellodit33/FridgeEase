import { useState, useEffect } from "react";
import Colors from "../../constants/Colors";
import { useFonts } from "expo-font";
import {
  addFoodToFridge,
  removeFoodFromFridge,
} from "../../store/redux/actions/fridge.actions";
import { getUser } from "../../store/redux/actions/user.actions";
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
} from "react-native";
import SuggestionInput from "./SuggestionInput";
import SuggestionItem from "./SuggestionItem";
import { storeSuggestions } from "../util/http";
import { Ionicons } from "@expo/vector-icons";
import FoodComponents from "../components/FoodComponents";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import { faHelicopterSymbol } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { cos } from "react-native-reanimated";

function Fridge(props) {
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
  const [toDelete, setToDelete] = useState(false);

  const [titles, setTitles] = useState("");

  const handlePress = (food) => {
    if (selectedItems.includes(food._id)) {
      // setToDelete([...toDelete, food._id]);
      //  selectedItems.filter((foodId) => foodId !== foodId);
      // console.log(toDelete);
      console.log(selectedItems);
      console.log("delete " + food.title);
      dispatch(removeFoodFromFridge(userData._id, food._id));
      setToDelete(true);
    } else if (!selectedItems.includes(food._id) || toDelete) {
      setSelectedItems([...selectedItems, food._id]);
      console.log(selectedItems);
      console.log("added " + food.title);
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
    }
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
          onPress={() => onSelectCategory(item)}
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
    const renderFridge = ({ item }) => {
      /*   for (let i = 0; i < userData.usersfood.length; i++) {
        if (userData.usersfood[i] === item._id) */ {
        return (
          <ScrollView>
            <View style={styles.userFridgeItem}>
              <Image
                style={styles.userImage}
                source={{
                  uri:
                    "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                    item.foodLogo,
                }}
              ></Image>
              <Text style={styles.itemName}>{item.foodName}</Text>
              <Text style={styles.itemExp}>{item.foodExpiration}</Text>

              <Text style={styles.itemCarbon}>{item.foodCarbon}</Text>
              <Ionicons name="create-outline" size={24} />

              <Ionicons name="close-outline" size={24} />
            </View>
          </ScrollView>
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
        <View style={styles.addFood}>
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
              onTextInput={showFoodComponents}
            />
          </View>
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
          <Text>{userData.usersfood.length} products in your fridge</Text>
          {renderMyFridge()}
        </View>
      )}
      {foodComponents && hideFood && (
        <View style={{ flex: 1 }}>
          <View style={styles.readyView}>
            <Pressable style={styles.readyButton} onPress={() => hello()}>
              <Text style={styles.readyText}>Klar</Text>
            </Pressable>
          </View>

          <View>
            <FlatList
              legacyImplementation={true}
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
  addFood: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 120,
    margin: 20,
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
  fridgeView: {
    backgroundColor: Colors.blue,
    flex: 1,
  },
  userFridgeItem: {
    backgroundColor: "white",
    marginVertical: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
    borderRadius: 30,
    borderColor: Colors.green,
    borderWidth: 2,
    width: "90%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  itemName: {
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 17,
    paddingVertical: 6,
  },
  itemCarbon: {
    backgroundColor: "green",
  },
  itemExp: {
    backgroundColor: Colors.middlepink,
  },
  userImage: {
    width: 30,
    height: 30,
  },
});
