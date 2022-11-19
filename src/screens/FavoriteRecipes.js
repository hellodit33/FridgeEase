import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import Colors from "../../constants/Colors";
import { useSelector } from "react-redux";

function FavoriteRecipes({ route, navigation }) {
  const recipesData = useSelector((state) => state.recipesReducer);
  const userData = useSelector((state) => state.userReducer);
  const favoriteRecipes = userData.favoriteRecipe;

  function renderFavoriteRecipes() {
    function recipePressHandler(recipeId) {
      navigation.navigate("RecipeInDetail", {
        recipeId,
      });
    }
    /* const handlePressToShopping = (food) => {
      if (selectToShopping.includes(food._id)) {
        const newListItem = selectToShopping.filter(
          (foodId) => foodId !== food._id
        );

        return setSelectToShopping(newListItem);
      }

      setSelectToShopping([...selectToShopping, food._id]);
      /* dispatch(addFoodToRecipe(userData._id, food.foodName));
    dispatch(getUser(userData._id));
      console.log(selectToShopping);
    };*/
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
    return recipesData.map((item) => {
      for (let i = 0; i < favoriteRecipes.length; i++) {
        if (item._id === favoriteRecipes[i]) {
          const renderIngredients = () => {
            return item.ingredients.map((item) => {
              return (
                <>
                  <TouchableOpacity
                    style={styles.ingredientsItem}

                    /* onPress={() => addToShoppingList(userData._id, item)}*/
                  >
                    <View style={styles.ingredientsItemText}>
                      <Text key={() => Math.random()}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                </>
              );
            });
          };
          return (
            <>
              <TouchableOpacity
                style={styles.recipes}
                recipeId={item._id}
                key={() => Math.random(item._id)}
                onPress={() => recipePressHandler(item._id)}
              >
                <View>
                  <View style={styles.recipeView}>
                    <Image
                      style={styles.image}
                      source={{
                        uri:
                          "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/recipesPictures/" +
                          item.title +
                          ".png",
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
                                ? Colors.lightyellow
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
                    <Text style={styles.recipesText}>
                      Du behöver bland annat:
                    </Text>

                    {renderIngredients()}
                    {/*<FlatList
                            data={item.ingredients}
                            numColumns={3}
                            contentContainerStyle={styles.centerItems}
                            keyExtractor={() => Math.random()}
                            renderItem={({ item }) => (
                              <View style={styles.ingredientsItemText}>
                                <Text style={styles.recipesText}>{item}</Text>
                              </View>
                            )}
                          />*/}
                  </View>
                </View>
              </TouchableOpacity>
            </>
          );
        }
      }
    });
  }
  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      horizontal
      style={styles.main}
    >
      {renderFavoriteRecipes()}
    </ScrollView>
  );
}
export default FavoriteRecipes;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
    paddingTop: 5,
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
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
    height: 500,
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
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 5,
  },
  foodToRecipeText: {
    paddingLeft: 5,
    marginRight: 12,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.green,
    textDecorationStyle: "solid",
    textDecorationColor: Colors.darkpink,
  },
  ingredientsView: {
    marginTop: 10,
    padding: 10,
    height: 170,
    backgroundColor: Colors.lightblue,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  ingredientsItem: { flexDirection: "row" },
  ingredientsItemText: {
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
