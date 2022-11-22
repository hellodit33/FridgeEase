import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../constants/Colors";
import { useContext, useEffect, useState } from "react";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../../store/context/auth-context";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  deleteRecipeFoodFilter,
  getFoodToRecipe,
  getUser,
} from "../../store/redux/actions/user.actions";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchRecipes,
  selectRecipe,
} from "../../store/redux/actions/recipe.actions";
import LoadingOverlay from "../UI/LoadingOverlay";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import IcoButton from "../UI/IcoButton";
function Recipes({ navigation }) {
  async function onRecipeCategory(category) {
    if (category.name === "Allt") {
      setSelectedRecipeFilter(false);
    } else {
      setSelectedRecipeFilter(true);
      setSelectedCategory(category.name);
      console.log(selectedCategory);
    }
  }

  const categoryData = [
    {
      id: 1,
      name: "Allt",
    },
    {
      id: 2,
      name: "Snabbt",
    },
    {
      id: 3,
      name: "Enkelt",
    },
    {
      id: 4,
      name: "Billigt",
    },
    {
      id: 5,
      name: "Lagom",
    },
    {
      id: 6,
      name: "Ambitiöst",
    },
    {
      id: 7,
      name: "Dejt",
    },
    {
      id: 8,
      name: "Festligt",
    },
  ];
  const [categories, setCategories] = useState(categoryData);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecipeFilter, setSelectedRecipeFilter] = useState(false);

  function renderRecipesCategories() {
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
          onPress={() => onRecipeCategory(item)}
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
  function removeFoodRecipeFilter(filter) {
    console.log(filter);
    dispatch(deleteRecipeFoodFilter(userData._id, filter));
    dispatch(getUser(userData._id));
    dispatch(getFoodToRecipe());
  }

  function renderFoodToRecipe() {
    const renderFood = ({ item }) => {
      return (
        <View

        /*onPress={() => onSelectCategory(item)}*/
        >
          <View style={styles.foodToRecipeView}>
            <Text style={styles.foodToRecipeText}>{item}</Text>
            <IcoButton
              icon="close"
              size={24}
              color={Colors.darkpink}
              onPress={() => removeFoodRecipeFilter(item)}
            />
          </View>
        </View>
      );
    };
    return (
      <FlatList
        data={userIngredients}
        extraData={userIngredients}
        horizontal
        showsHorizontalScrollIndicator={true}
        keyExtractor={() => Math.random()}
        renderItem={renderFood}
        contentContainerStyle={{}}
      ></FlatList>
    );
  }

  const [user, setUser] = useState([]);
  const dispatch = useDispatch();
  const [foodToRecipe, setfoodToRecipe] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const recipesData = useSelector((state) => state.recipesReducer);
  const ingredients = recipesData.map((item) => item.ingredients);

  const ingredients2 = recipesData.map((item) => item.ingredients2);

  const renderIngredientsObject = () => {
    for (let i = 0; i < recipesData.length; i++) {
      console.log("length" + recipesData.length);
      return recipesData.map((item) => {
        const ingredients = recipesData[i].ingredients2[i];
        return (
          <>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                paddingHorizontal: 20,
                paddingVertical: 5,
              }}
              key={() => Math.random(userData._id)}
              onPress={() => addToShoppingList(userData._id, item)}
            >
              <Ionicons
                name="add-circle-outline"
                size={20}
                style={{ marginRight: 20 }}
              />
              <Text key={() => Math.random()}>{ingredients.quantity}</Text>
              <Text key={() => Math.random()}>{ingredients.name}</Text>
            </TouchableOpacity>
          </>
        );
      });
    }
  };

  const ingredients2names = ingredients2.map((item) => item.name);
  console.log(ingredients2names);
  const userIngredients = userData.foodToRecipe;
  const ingArray = ingredients.toString().split(",");

  const getCommon = (arr1, arr2) => {
    var common = []; // Array to contain common elements
    for (var i = 0; i < arr2.length; ++i) {
      for (var j = 0; j < arr1.length; ++j) {
        if (arr2[i] == arr1[j]) {
          // If element is in both the arrays
          common.push(arr2[i]); // Push to common array
        }
      }
    }

    return common; // Return the common elements
  };

  let commonElements = getCommon(ingArray, userIngredients); // [45, 223, 93, 23]
  console.log(commonElements);

  const getTrueOrFalse = (arr1, arr2) => {
    for (var i = 0; i < arr1.length; ++i) {
      const newArray = arr1[i].some((item) => arr2.includes(item));
      return newArray;
    }
  };

  let question = getTrueOrFalse(ingredients, commonElements);

  function showRecipe() {
    async function recipes() {
      for (var i = 0; i < ingredients?.length; ++i) {
        const recipesToShow = [
          ...recipesToShow,
          ingredients[i]?.some((item) => commonElements?.includes(item)),
        ];

        const data = [
          ...data,
          [
            recipesData[i]?._id,
            ingredients[i]?.some((item) => commonElements?.includes(item)),
          ],
        ];

        console.log(data);
        console.log(recipesToShow);
        dispatch(
          selectRecipe(
            recipesData[i]?._id,
            ingredients[i]?.some((item) => commonElements?.includes(item))
          )
        );
      }
    }
    recipes();
    const selectedRecipes = recipesData.filter(
      (recipe) => recipe.selectRecipe === true
    );
    console.log(selectedRecipes);
    const renderDuration = (duration) => {
      function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours} tim${minutes > 0 ? ` ${minutes} min` : ""}`;
      }

      if (duration < 60) {
        return duration;
      } else if (duration > 60) {
        console.log(toHoursAndMinutes(duration));
        return toHoursAndMinutes(duration);
      }
    };
    function recipePressHandler(recipeId) {
      navigation.navigate("RecipeInDetail", {
        recipeId,
      });
    }

    if (userIngredients.length > 0) {
      return (
        <FlatList
          legacyImplementation={true}
          horizontal
          data={selectedRecipes}
          extraData={selectedRecipes}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipes}
              recipeId={item._id}
              onPress={() => recipePressHandler(item._id)}
            >
              <View>
                <View style={styles.recipeView}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/recipesPictures/" +
                        item.image,
                    }}
                  ></Image>
                  <Text style={styles.recipeTitle}>{item.title}</Text>
                </View>
                <View style={styles.moreInfoView}>
                  <View style={styles.leftView}>
                    <View
                      style={[
                        styles.carbonView,
                        {
                          backgroundColor:
                            item.climateImpact === "A"
                              ? Colors.darkgreen
                              : item.climateImpact === "B"
                              ? Colors.lightgreen
                              : item.climateImpact === "C"
                              ? Colors.lightorange
                              : item.climateImpact === "D"
                              ? Colors.orange
                              : item.climateImpact === "E"
                              ? Colors.red
                              : null,
                        },
                      ]}
                    >
                      <Text style={styles.recipesText}>
                        {item.climateImpact === "A"
                          ? "Mycket låg klimatpåverkan"
                          : item.climateImpact === "B"
                          ? "Relativt låg klimatpåverkan"
                          : item.climateImpact === "C"
                          ? "Medelhög klimatpåverkan"
                          : item.climateImpact === "D"
                          ? "Relativt hög klimatpåverkan"
                          : item.climateImpact === "E"
                          ? "Mycket hög klimatpåverkan"
                          : null}
                      </Text>
                    </View>
                    <Text style={[styles.levelText, styles.recipesText]}>
                      Ambitionsnivå
                    </Text>
                    <View style={styles.levels}>
                      <Text style={styles.low}></Text>
                      <Text
                        style={
                          item.difficulty === "Simple"
                            ? styles.low2
                            : styles.middle
                        }
                      ></Text>
                      <Text
                        style={
                          item.difficulty === "Simple"
                            ? styles.low2
                            : item.difficulty === "Normal"
                            ? styles.low2
                            : styles.high
                        }
                      ></Text>
                    </View>

                    {/* <Text>Svårighetsgrad</Text> 
                  <View style={styles.difficultyView}>
                    {item.difficulty === "Simple" ? (
                      <>
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant-outline" />
                        <Ionicons size={20} name="restaurant-outline" />
                      </>
                    ) : null}
                    {item.difficulty === "Normal" ? (
                      <>
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant-outline" />
                      </>
                    ) : null}
                    {item.difficulty === "Difficult" ? (
                      <>
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant" />
                      </>
                    ) : null}
                  </View>*/}
                    {/*   <Text
                    style={{
                      color: item.difficulty === "Enkelt" ? "blue" : "black",
                    }}
                  >
                    {item.difficulty}
                  </Text>*/}

                    <View>
                      <Text style={[styles.levelText, styles.recipesText]}>
                        Pris
                      </Text>
                      <View style={styles.levels}>
                        <Text style={styles.low}></Text>
                        <Text
                          style={
                            item.price <= 50
                              ? styles.low2
                              : item.price > 50
                              ? styles.middle
                              : null
                          }
                        ></Text>
                        <Text
                          style={
                            item.price <= 50
                              ? styles.low3
                              : item.price > 50
                              ? styles.middle2
                              : item.price > 100
                              ? styles.high
                              : null
                          }
                        ></Text>
                      </View>
                      <View></View>
                    </View>
                  </View>
                  <View style={styles.rightView}>
                    <View style={styles.peopleView}>
                      <Ionicons
                        size={22}
                        name="people-outline"
                        color={Colors.green}
                      ></Ionicons>
                      <Text style={styles.recipesText}>
                        {item.people} portioner
                      </Text>
                    </View>
                    <View style={styles.durationView}>
                      <Ionicons
                        size={22}
                        name="time-outline"
                        color={Colors.green}
                      />
                      <Text style={styles.recipesText}>
                        {renderDuration(item.duration)}
                        {item.duration < 60 ? " min" : null}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.ingredientsView}>
                  <Text style={styles.recipesText}>Du behöver:</Text>
                  <View style={styles.ingredientsItem}>
                    <FlatList
                      data={item.ingredients2}
                      numColumns={3}
                      contentContainerStyle={styles.centerItems}
                      keyExtractor={() => Math.random()}
                      renderItem={({ item }) => (
                        <View style={styles.ingredientsItemText}>
                          <Text style={styles.recipesText}>{item.name}</Text>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      );
    } else if (userIngredients.length === 0 && !selectedRecipeFilter) {
      return (
        <FlatList
          legacyImplementation={true}
          horizontal
          data={recipesData}
          extraData={recipesData}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipes}
              recipeId={item._id}
              onPress={() => recipePressHandler(item._id)}
            >
              <View>
                <View style={styles.recipeView}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/recipesPictures/" +
                        item.image,
                    }}
                  ></Image>
                  <Text style={styles.recipeTitle}>{item.title}</Text>
                </View>
                <View style={styles.moreInfoView}>
                  <View style={styles.leftView}>
                    <View
                      style={[
                        styles.carbonView,
                        {
                          backgroundColor:
                            item.climateImpact === "A"
                              ? Colors.darkgreen
                              : item.climateImpact === "B"
                              ? Colors.lightgreen
                              : item.climateImpact === "C"
                              ? Colors.lightorange
                              : item.climateImpact === "D"
                              ? Colors.orange
                              : item.climateImpact === "E"
                              ? Colors.red
                              : null,
                        },
                      ]}
                    >
                      <Text style={styles.recipesText}>
                        {item.climateImpact === "A"
                          ? "Mycket låg klimatpåverkan"
                          : item.climateImpact === "B"
                          ? "Relativt låg klimatpåverkan"
                          : item.climateImpact === "C"
                          ? "Medelhög klimatpåverkan"
                          : item.climateImpact === "D"
                          ? "Relativt hög klimatpåverkan"
                          : item.climateImpact === "E"
                          ? "Mycket hög klimatpåverkan"
                          : null}
                      </Text>
                    </View>
                    <Text style={[styles.levelText, styles.recipesText]}>
                      Ambitionsnivå
                    </Text>
                    <View style={styles.levels}>
                      <Text style={styles.low}></Text>
                      <Text
                        style={
                          item.difficulty === "Simple"
                            ? styles.low2
                            : styles.middle
                        }
                      ></Text>
                      <Text
                        style={
                          item.difficulty === "Simple"
                            ? styles.low2
                            : item.difficulty === "Normal"
                            ? styles.low2
                            : styles.high
                        }
                      ></Text>
                    </View>

                    {/* <Text>Svårighetsgrad</Text> 
                  <View style={styles.difficultyView}>
                    {item.difficulty === "Simple" ? (
                      <>
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant-outline" />
                        <Ionicons size={20} name="restaurant-outline" />
                      </>
                    ) : null}
                    {item.difficulty === "Normal" ? (
                      <>
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant-outline" />
                      </>
                    ) : null}
                    {item.difficulty === "Difficult" ? (
                      <>
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant" />
                      </>
                    ) : null}
                  </View>*/}
                    {/*   <Text
                    style={{
                      color: item.difficulty === "Enkelt" ? "blue" : "black",
                    }}
                  >
                    {item.difficulty}
                  </Text>*/}

                    <View>
                      <Text style={[styles.levelText, styles.recipesText]}>
                        Pris
                      </Text>
                      <View style={styles.levels}>
                        <Text style={styles.low}></Text>
                        <Text
                          style={
                            item.price <= 50
                              ? styles.low2
                              : item.price > 50
                              ? styles.middle
                              : null
                          }
                        ></Text>
                        <Text
                          style={
                            item.price <= 50
                              ? styles.low3
                              : item.price > 50
                              ? styles.middle2
                              : item.price > 100
                              ? styles.high
                              : null
                          }
                        ></Text>
                      </View>
                      <View></View>
                    </View>
                  </View>
                  <View style={styles.rightView}>
                    <View style={styles.peopleView}>
                      <Ionicons
                        size={22}
                        name="people-outline"
                        color={Colors.green}
                      ></Ionicons>
                      <Text style={styles.recipesText}>
                        {item.people} portioner
                      </Text>
                    </View>
                    <View style={styles.durationView}>
                      <Ionicons
                        size={22}
                        name="time-outline"
                        color={Colors.green}
                      />
                      <Text style={styles.recipesText}>
                        {renderDuration(item.duration)}
                        {item.duration < 60 ? " min" : null}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.ingredientsView}>
                  <Text style={styles.recipesText}>Du behöver:</Text>
                  <View style={styles.ingredientsItem}>
                    <FlatList
                      data={item.ingredients2}
                      numColumns={3}
                      contentContainerStyle={styles.centerItems}
                      keyExtractor={() => Math.random()}
                      renderItem={({ item }) => (
                        <View style={styles.ingredientsItemText}>
                          <Text style={styles.recipesText}>{item.name}</Text>
                        </View>
                      )}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      );
    } else if (userIngredients.length === 0 && selectedRecipeFilter) {
      return (
        <FlatList
          legacyImplementation={true}
          horizontal
          data={recipesData}
          extraData={recipesData}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => {
            if (item.category === selectedCategory) {
              return (
                <TouchableOpacity
                  style={styles.recipes}
                  recipeId={item._id}
                  onPress={() => recipePressHandler(item._id)}
                >
                  <View>
                    <View style={styles.recipeView}>
                      <Image
                        style={styles.image}
                        source={{
                          uri:
                            "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/recipesPictures/" +
                            item.image,
                        }}
                      ></Image>
                      <Text style={styles.recipeTitle}>{item.title}</Text>
                    </View>
                    <View style={styles.moreInfoView}>
                      <View style={styles.leftView}>
                        <View
                          style={[
                            styles.carbonView,
                            {
                              backgroundColor:
                                item.climateImpact === "A"
                                  ? Colors.darkgreen
                                  : item.climateImpact === "B"
                                  ? Colors.lightgreen
                                  : item.climateImpact === "C"
                                  ? Colors.lightorange
                                  : item.climateImpact === "D"
                                  ? Colors.orange
                                  : item.climateImpact === "E"
                                  ? Colors.red
                                  : null,
                            },
                          ]}
                        >
                          <Text style={styles.recipesText}>
                            {item.climateImpact === "A"
                              ? "Mycket låg klimatpåverkan"
                              : item.climateImpact === "B"
                              ? "Relativt låg klimatpåverkan"
                              : item.climateImpact === "C"
                              ? "Medelhög klimatpåverkan"
                              : item.climateImpact === "D"
                              ? "Relativt hög klimatpåverkan"
                              : item.climateImpact === "E"
                              ? "Mycket hög klimatpåverkan"
                              : null}
                          </Text>
                        </View>
                        <Text style={[styles.levelText, styles.recipesText]}>
                          Ambitionsnivå
                        </Text>
                        <View style={styles.levels}>
                          <Text style={styles.low}></Text>
                          <Text
                            style={
                              item.difficulty === "Simple"
                                ? styles.low2
                                : styles.middle
                            }
                          ></Text>
                          <Text
                            style={
                              item.difficulty === "Simple"
                                ? styles.low2
                                : item.difficulty === "Normal"
                                ? styles.low2
                                : styles.high
                            }
                          ></Text>
                        </View>

                        {/* <Text>Svårighetsgrad</Text> 
                  <View style={styles.difficultyView}>
                    {item.difficulty === "Simple" ? (
                      <>
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant-outline" />
                        <Ionicons size={20} name="restaurant-outline" />
                      </>
                    ) : null}
                    {item.difficulty === "Normal" ? (
                      <>
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant-outline" />
                      </>
                    ) : null}
                    {item.difficulty === "Difficult" ? (
                      <>
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant" />
                        <Ionicons size={20} name="restaurant" />
                      </>
                    ) : null}
                  </View>*/}
                        {/*   <Text
                    style={{
                      color: item.difficulty === "Enkelt" ? "blue" : "black",
                    }}
                  >
                    {item.difficulty}
                  </Text>*/}

                        <View>
                          <Text style={[styles.levelText, styles.recipesText]}>
                            Pris
                          </Text>
                          <View style={styles.levels}>
                            <Text style={styles.low}></Text>
                            <Text
                              style={
                                item.price <= 50
                                  ? styles.low2
                                  : item.price > 50
                                  ? styles.middle
                                  : null
                              }
                            ></Text>
                            <Text
                              style={
                                item.price <= 50
                                  ? styles.low3
                                  : item.price > 50
                                  ? styles.middle2
                                  : item.price > 100
                                  ? styles.high
                                  : null
                              }
                            ></Text>
                          </View>
                          <View></View>
                        </View>
                      </View>
                      <View style={styles.rightView}>
                        <View style={styles.peopleView}>
                          <Ionicons
                            size={22}
                            name="people-outline"
                            color={Colors.green}
                          ></Ionicons>
                          <Text style={styles.recipesText}>
                            {item.people} portioner
                          </Text>
                        </View>
                        <View style={styles.durationView}>
                          <Ionicons
                            size={22}
                            name="time-outline"
                            color={Colors.green}
                          />
                          <Text style={styles.recipesText}>
                            {renderDuration(item.duration)}
                            {item.duration < 60 ? " min" : null}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.ingredientsView}>
                      <Text style={styles.recipesText}>Du behöver:</Text>
                      <View style={styles.ingredientsItem}>
                        <FlatList
                          data={item.ingredients2}
                          numColumns={3}
                          contentContainerStyle={styles.centerItems}
                          keyExtractor={() => Math.random()}
                          renderItem={({ item }) => (
                            <View style={styles.ingredientsItemText}>
                              <Text style={styles.recipesText}>
                                {item.name}
                              </Text>
                            </View>
                          )}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
        />
      );
    }
  }

  const [loaded] = useFonts({
    alk: require("../../assets/fonts/Alkalami-Regular.ttf"),
    Intermedium: require("../../assets/fonts/Inter-Medium.ttf"),
    Interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    Interlight: require("../../assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) {
    return <LoadingOverlay message="Ge oss en kort stund" />;
  }

  return (
    <View style={styles.firstScreen}>
      {userData.foodToRecipe.length === 0 && (
        <View>
          <View style={styles.main}>{renderRecipesCategories()}</View>
        </View>
      )}
      {userData.foodToRecipe.length > 0 && (
        <View>
          <View style={styles.foodToRecipe}>{renderFoodToRecipe()}</View>
        </View>
      )}
      {/*<View>{renderIngredientsObject()}</View>*/}

      <View style={{ flex: 1 }}>
        {/* <FlatList
          legacyImplementation={true}
          contentContainerStyle={styles.foodList}
          data={userData.foodToRecipe}
          extraData={userData.foodToRecipe}
          keyExtractor={(item) => Math.random(item._id)}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />*/}
        <View>{showRecipe()}</View>
        {/* <FlatList
          legacyImplementation={true}
          contentContainerStyle={styles.foodList}
          data={userIngredients}
          extraData={userIngredients}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />*/}
        {/*<FlatList
          legacyImplementation={true}
          contentContainerStyle={styles.foodList}
          data={commonElements}
          extraData={commonElements}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
        />*/}
        {/* <FlatList
          legacyImplementation={true}
          contentContainerStyle={styles.foodList}
          data={ingredients}
          extraData={ingredients}
          keyExtractor={() => Math.random()}
          renderItem={({ item }) => (
            <View>
              <FlatList
                data={item}
                keyExtractor={() => Math.random()}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item}</Text>
                  </View>
                )}
              />
            </View>
          )}
        />*/}
      </View>
    </View>
  );
}

export default Recipes;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  firstScreen: {
    flex: 1,
    backgroundColor: Colors.blue,
  },

  main: {
    backgroundColor: Colors.blue,
    fontFamily: "Interbold",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  foodToRecipe: {
    backgroundColor: Colors.blue,
    fontFamily: "Interbold",
    marginVertical: 30,
  },
  recipes: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: Colors.green,
    marginLeft: 15,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 300,
    height: 440,

    borderRadius: 30,
  },
  recipeView: {
    marginBottom: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    borderRadius: 20,
    height: 130,
    resizeMode: "cover",
  },

  recipeTitle: {
    fontFamily: "Intermedium",
    fontSize: 20,
    textAlign: "center",
  },
  leftView: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  rightView: {
    flexDirection: "column",
    alignContent: "space-between",
  },

  moreInfoView: {
    flexDirection: "row",

    marginTop: 5,
  },
  difficultyView: {
    flexDirection: "row",
  },
  carbonView: {
    borderColor: Colors.green,
    width: "70%",
    marginBottom: 5,
    borderRadius: 30,
    borderWidth: 2,
    padding: 10,
  },
  durationView: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  peopleView: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
  },
  levels: {
    flexDirection: "row",
    width: 180,
  },
  levelText: {
    marginBottom: -15,
  },
  low: {
    width: 30,
    marginHorizontal: 2,
    borderBottomWidth: 5,
    borderBottomColor: Colors.middlepink,
  },
  low2: {
    width: 30,
    marginHorizontal: 2,
    borderBottomWidth: 5,
    borderBottomColor: "grey",
  },
  low3: {
    width: 30,
    marginHorizontal: 2,
    borderBottomWidth: 5,
    borderBottomColor: "grey",
  },
  middle: {
    width: 30,
    marginHorizontal: 2,
    borderBottomWidth: 5,
    borderBottomColor: Colors.middlepink,
  },
  middle2: {
    width: 30,
    marginHorizontal: 2,
    borderBottomWidth: 5,
    borderBottomColor: "grey",
  },
  high: {
    width: 30,
    marginHorizontal: 2,
    borderBottomWidth: 5,
    borderBottomColor: Colors.middlepink,
  },

  foodToRecipeView: {
    borderRadius: 30,
    borderColor: Colors.green,
    backgroundColor: "white",
    borderWidth: 2,
    marginHorizontal: 5,

    height: 40,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
    flexDirection: "row",
  },
  foodToRecipeText: {
    paddingHorizontal: 8,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.green,
  },
  ingredientsView: {
    marginTop: 10,

    height: 120,
    backgroundColor: Colors.lightblue,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  ingredientsItem: {
    flexDirection: "row",
  },
  ingredientsItemText: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor: Colors.green,
    borderWidth: 2,
    backgroundColor: "white",
    padding: 7,
    margin: 2,
  },
  recipesText: {
    fontFamily: "Intermedium",
  },
  centerItems: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
