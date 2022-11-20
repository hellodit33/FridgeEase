import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import Hyperlink from "react-native-hyperlink";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import LoadingOverlay from "../UI/LoadingOverlay";
import {
  addFromRecipeToShopping,
  addFavoriteRecipe,
  getUser,
} from "../../store/redux/actions/user.actions";
import { useState, useContext } from "react";
import { FavoritesContext } from "../../store/context/favorites-context";

function RecipeInDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const recipeId = route.params.recipeId;
  const userData = useSelector((state) => state.userReducer);
  const recipesData = useSelector((state) => state.recipesReducer);
  const recipeToShow = recipesData.find(
    (recipeItem) => recipeItem._id === recipeId
  );
  const ingredientsToShow = recipeToShow.ingredients2;

  const climateImpact = ["A", "B", "C", "D", "E"];

  function addToShoppingList(uid, name, quantity) {
    dispatch(addFromRecipeToShopping(uid, name, quantity));
    dispatch(getUser(uid));
  }
  const [favorite, setFavorite] = useState(false);
  const [favoriteRec, setFavoriteRec] = useState([]);
  const favContext = useContext(FavoritesContext);

  const recipeIsFav = favContext.ids.includes(recipeId);

  function addToFavoriteRecipes(uid, recipe) {
    if (recipeIsFav) {
      favContext.removeFav(recipe._id);
    } else {
      favContext.addFav(recipe._id);
    }

    dispatch(addFavoriteRecipe(uid, recipe._id));
  }

  const renderIngredients = () => {
    return ingredientsToShow.map((item) => {
      return (
        <>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 5,
            }}
            key={() => Math.random(userData._id)}
            onPress={() =>
              addToShoppingList(userData._id, item.name, item.quantity)
            }
          >
            <Ionicons
              name="add-circle-outline"
              size={20}
              style={{ marginRight: 20 }}
            />
            <Text key={() => Math.random()}>{item.quantity}</Text>
            <Text key={() => Math.random()}> {item.name}</Text>
          </TouchableOpacity>
        </>
      );
    });
  };

  useLayoutEffect(() => {
    const recipeName = recipeToShow.title;

    navigation.setOptions({
      headerTitle: () => <Header title={recipeName} />,
      headerTitleAlign: "center",

      headerStyle: { backgroundColor: Colors.blue },

      headerRight: () => {
        return (
          <Pressable
            onPress={() => addToFavoriteRecipes(userData._id, recipeToShow)}
          >
            <Ionicons
              size={30}
              name={recipeIsFav ? "heart" : "heart-outline"}
            ></Ionicons>
          </Pressable>
        );
      },
    });
  }, [recipeToShow, navigation, addToFavoriteRecipes]);

  const [loaded] = useFonts({
    alk: require("../../assets/fonts/Alkalami-Regular.ttf"),
    Intermedium: require("../../assets/fonts/Inter-Medium.ttf"),
    Interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    Interlight: require("../../assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) {
    return <LoadingOverlay message="Ge oss en kort stund" />;
  }

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
  return (
    <>
      <ScrollView>
        <View style={styles.recipeDetails}>
          <View style={styles.recipeView}>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/recipesPictures/" +
                  recipeToShow.title +
                  ".png",
              }}
            />
            <Text style={styles.recipeTitle}>{recipeToShow.title}</Text>
          </View>
          <View style={styles.moreInfoView}>
            <View style={styles.leftView}>
              <View
                style={[
                  styles.carbonView,
                  {
                    backgroundColor:
                      recipeToShow.climateImpact === "A"
                        ? Colors.darkgreen
                        : recipeToShow.climateImpact === "B"
                        ? Colors.lightgreen
                        : recipeToShow.climateImpact === "C"
                        ? Colors.lightyellow
                        : recipeToShow.climateImpact === "D"
                        ? Colors.orange
                        : recipeToShow.climateImpact === "E"
                        ? Colors.red
                        : null,
                  },
                ]}
              >
                <Text style={styles.recipesText}>
                  {recipeToShow.climateImpact === "A"
                    ? "Mycket låg klimatpåverkan"
                    : recipeToShow.climateImpact === "B"
                    ? "Relativt låg klimatpåverkan"
                    : recipeToShow.climateImpact === "C"
                    ? "Medelhög klimatpåverkan"
                    : recipeToShow.climateImpact === "D"
                    ? "Relativt hög klimatpåverkan"
                    : recipeToShow.climateImpact === "E"
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
                    recipeToShow.difficulty === "Simple"
                      ? styles.low2
                      : styles.middle
                  }
                ></Text>
                <Text
                  style={
                    recipeToShow.difficulty === "Simple"
                      ? styles.low2
                      : recipeToShow.difficulty === "Normal"
                      ? styles.low2
                      : styles.high
                  }
                ></Text>
              </View>

              <View>
                <Text style={[styles.levelText, styles.recipesText]}>Pris</Text>
                <View style={styles.levels}>
                  <Text style={styles.low}></Text>
                  <Text
                    style={
                      recipeToShow.price <= 50
                        ? styles.low2
                        : recipeToShow.price > 50
                        ? styles.middle
                        : null
                    }
                  ></Text>
                  <Text
                    style={
                      recipeToShow.price <= 50
                        ? styles.low3
                        : recipeToShow.price > 50
                        ? styles.middle2
                        : recipeToShow.price > 100
                        ? styles.high
                        : null
                    }
                  ></Text>
                </View>
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
                  {recipeToShow.people} portioner
                </Text>
              </View>
              <View style={styles.durationView}>
                <Ionicons size={22} name="time-outline" color={Colors.green} />
                <Text style={styles.recipesText}>
                  {renderDuration(recipeToShow.duration)}
                  {recipeToShow.duration < 60 ? " min" : null}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.descView]}>
            <Text
              style={[styles.recipesText, styles.borderText, styles.titlesDesc]}
            >
              Ingredienser:
            </Text>
            <View style={styles.ingredientsItem}>{renderIngredients()}</View>
            <View style={styles.recipeDescription}>
              <Text
                style={[
                  styles.recipesText,
                  styles.borderText,
                  styles.titlesDesc,
                ]}
              >
                Gör så här:
              </Text>

              <Text>{recipeToShow.description}</Text>

              {/*<FlatList
              data={recipeToShow.ingredients}
              keyExtractor={() => Math.random()}
              renderItem={({ item }) => (
                <View style={styles.ingredientsItemText}>
                  <Text style={styles.recipesText}>{item}</Text>
                </View>
              )}
            />*/}
            </View>
          </View>
          <View style={styles.climateView}>
            <Text style={styles.climateText}>Klimatpåverkan</Text>
            <View style={styles.climateGraphs}>
              <View style={styles.climateGraphA}>
                <Text style={styles.graphAText}>A</Text>
              </View>
              <View style={styles.climateGraphB}>
                <Text style={styles.graphBText}>B</Text>
              </View>
              <View style={styles.climateGraphC}>
                <Text style={styles.graphCText}>C</Text>
              </View>
              <View style={styles.climateGraphD}>
                <Text style={styles.graphDText}>D</Text>
              </View>
              <View style={styles.climateGraphE}>
                <Text style={styles.graphEText}>E</Text>
              </View>
            </View>
            <Text style={[styles.recipesText, styles.climateImpact]}>
              {recipeToShow.climateImpact === "A"
                ? "Mycket låg klimatpåverkan"
                : recipeToShow.climateImpact === "B"
                ? "Relativt låg klimatpåverkan"
                : recipeToShow.climateImpact === "C"
                ? "Medelhög klimatpåverkan"
                : recipeToShow.climateImpact === "D"
                ? "Relativt hög klimatpåverkan"
                : recipeToShow.climateImpact === "E"
                ? "Mycket hög klimatpåverkan"
                : null}
            </Text>
            <Hyperlink
              linkDefault={true}
              linkStyle={{
                color: Colors.darkgreen,
                textDecorationLine: "underline",
                fontSize: 16,
                fontWeight: "bold",
              }}
              onPress={(url) =>
                alert("Du är på väg att besöka denna sida: " + url)
              }
              linkText={(url) =>
                url === "https://www.coop.se/hallbarhet/hallbarhetsdeklaration/"
                  ? "Läs mer om hållbarhetsdeklaration och klimatpåverkan"
                  : url
              }
            >
              <Text style={styles.climateInfo}>
                https://www.coop.se/hallbarhet/hallbarhetsdeklaration/
              </Text>
            </Hyperlink>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default RecipeInDetail;

const styles = StyleSheet.create({
  recipeDetails: {
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 30,

    borderWidth: 2,
    borderColor: Colors.green,

    paddingHorizontal: 14,
    paddingVertical: 10,

    marginVertical: 10,
    borderRadius: 30,
  },

  image: {
    width: "100%",
    borderRadius: 20,
    height: 200,
    resizeMode: "cover",
  },
  recipeView: {
    justifyContent: "center",
    alignItems: "center",
  },
  recipeTitle: {
    fontWeight: "bold",
    fontFamily: "Intermedium",
    fontSize: 20,
    textAlign: "center",
  },
  leftView: {
    flexDirection: "column",
  },
  rightView: {
    flexDirection: "column",
  },

  moreInfoView: {
    flexDirection: "row",
    alignContent: "space-between",

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
  ingredientsItem: {
    flexDirection: "column",
  },

  descView: {
    marginTop: 10,
    backgroundColor: Colors.lightblue,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    padding: 20,
  },

  ingredientsItemText: {
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
  borderText: {
    borderColor: "black",
    borderBottomWidth: 2,
    width: "50%",
  },
  centerItems: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  recipeDescription: {},
  titlesDesc: {
    fontSize: 15,
    marginVertical: 10,
  },
  climateView: {
    marginVertical: 10,
    marginHorizontal: 5,
  },
  climateText: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: "700",
    color: Colors.darkgreen,
  },
  climateGraphs: {
    flexDirection: "row",
  },
  climateGraphA: {
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: Colors.darkgreen,
    width: 60,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  graphAText: { color: Colors.greygreen, fontWeight: "600", fontSize: 30 },
  climateGraphB: {
    backgroundColor: Colors.lightgreen,
    width: 60,
    height: 90,
    elevation: 6,
    marginLeft: 2,
    marginTop: -10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  graphBText: { color: "white", fontWeight: "600", fontSize: 30 },
  climateGraphC: {
    backgroundColor: Colors.lightyellow,
    width: 60,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  graphCText: { color: Colors.greyish, fontWeight: "600", fontSize: 30 },
  climateGraphD: {
    backgroundColor: Colors.orange,
    width: 60,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  graphDText: { color: Colors.lightorange, fontWeight: "600", fontSize: 30 },
  climateGraphE: {
    backgroundColor: Colors.red,
    width: 60,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
  graphEText: { color: Colors.greyish, fontWeight: "600", fontSize: 30 },
  climateImpact: {
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 2,
  },
});
