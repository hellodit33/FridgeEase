import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
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
import { getUser } from "../../store/redux/actions/user.actions.js";
import { fetchFood } from "../../store/redux/actions/fridge.actions.js";
import { Ionicons } from "@expo/vector-icons";
function Shopping({ navigation }) {
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
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{}}
      ></FlatList>
    );
  }
  const dispatch = useDispatch();
  const [selectToShopping, setSelectToShopping] = useState([]);

  const [modalIsVisible, setModalIsVisible] = useState(false);

  const [passedData, setPassedData] = useState([]);

  function openModal({ name, carbon, logo, quantity }) {
    setModalIsVisible(true);
    setPassedData({ name, carbon, logo, quantity });
  }
  function closeModal() {
    setPassedData({});
    setModalIsVisible(false);
  }

  const userData = useSelector((state) => state.userReducer);
  const fridge = useSelector((state) => state.intoFridgeReducer);

  function renderShoppingFridge() {
    const handlePressToShopping = (food) => {
      if (selectToShopping.includes(food._id)) {
        const newListItem = selectToShopping.filter(
          (foodId) => foodId !== food._id
        );

        return setSelectToShopping(newListItem);
      }

      setSelectToShopping([...selectToShopping, food._id]);
      /* dispatch(addFoodToRecipe(userData._id, food.foodName));
    dispatch(getUser(userData._id));*/
      console.log(selectToShopping);
    };
    const editInFridge = (item) => {
      /* dispatch(
        editFoodFromFridge(
          userData._id,
          item._id,
          item.foodExpiration,
          item.foodQuantity
        )
      );
      dispatch(getUser(userData._id));*/
      closeModal();
    };
    const deleteInFridge = (fridge) => {
      dispatch(deleteFoodFromFridge(userData._id, fridge._id));
      dispatch(getUser(userData._id));
    };

    function renderCarbon({ fridge }) {
      if (fridge.carbon > 300) {
        return <Text style={styles.itemCarbon}>B</Text>;
      }
      if (fridge.carbon <= 300) {
        return <Text style={styles.itemCarbon}>A</Text>;
      }
    }
    const userShopping = userData.shoppingList2;
    const item = "";
    return fridge.map((fridge) => {
      for (let i = 0; i < userShopping.length; i++) {
        if (fridge.title === userShopping[i].foodName) {
          const name = fridge.title;
          const quantity = userShopping[i].foodQuantity;
          const carbon = fridge.carbon;
          const logo = fridge.logo;
          return (
            <>
              <ScrollView>
                <Pressable
                  key={() => Math.random(userData._id)}
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
                    {selectToShopping.includes(fridge._id) && (
                      <View style={styles.overlay} />
                    )}
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
                    </View>
                    <View style={styles.quantityView}>
                      <Text style={styles.quantityText}>{quantity}</Text>
                    </View>
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
                    <View style={styles.iconItem}>
                      <IcoButton
                        icon="create-outline"
                        size={24}
                        color={Colors.green}
                        onPress={() => {
                          openModal({
                            name,
                            quantity,
                            carbon,
                            logo,
                          });
                        }}
                      />
                    </View>

                    <View style={styles.iconItem}>
                      <IcoButton
                        icon="close"
                        size={24}
                        color={Colors.darkpink}
                        onPress={() => deleteInFridge(fridge)}
                      />

                      <EditModalShopping
                        visible={modalIsVisible}
                        passedData={passedData}
                        onEditFood={() => editInFridge()}
                      />
                    </View>
                  </View>
                  {selectToShopping.includes(fridge._id) && (
                    <View style={styles.overlayToShopping} />
                  )}
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
          <View>{renderShoppingFridge()}</View>
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
    flex: 1,
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
    marginHorizontal: 20,
    borderRadius: 30,
    width: "90%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  overlayToShopping: {
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
});
