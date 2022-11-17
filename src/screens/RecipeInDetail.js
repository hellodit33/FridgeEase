import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RatingsOutput from "../components/Ratings/RatingsOutput";
import Colors from "../../constants/Colors";
import { useFonts } from "expo-font";

import recipesReducer from "../../store/redux/reducers/recipes.reducer";
import { useSelector } from "react-redux";
import { useLayoutEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import LoadingOverlay from "../UI/LoadingOverlay";

function RecipeInDetail({ route, navigation }) {
  const recipeId = route.params.recipeId;

  const recipesData = useSelector((state) => state.recipesReducer);
  const recipeToShow = recipesData.find(
    (recipeItem) => recipeItem._id === recipeId
  );

  useLayoutEffect(() => {
    const recipeName = recipeToShow.title;

    navigation.setOptions({
      headerTitle: () => <Header title={recipeName} />,
      headerTitleAlign: "center",

      headerStyle: { backgroundColor: Colors.blue },

      headerRight: () => {
        return <Ionicons size={30} name="heart-outline"></Ionicons>;
      },
    });
  }, [recipeToShow, navigation]);

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
      <ScrollView style={styles.recipeDetails}>
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
        <View>
          <Text>{recipeToShow.description}</Text>
        </View>
        <View style={styles.ingredientsView}>
          <Text style={styles.recipesText}>Du behöver:</Text>
          <View style={styles.ingredientsItem}>
            <ScrollView>
              <Text>{recipeToShow.ingredients}</Text>
              <View style={styles.ingredientsItemText}>
                <Text style={styles.recipesText}></Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default RecipeInDetail;

const styles = StyleSheet.create({
  recipeDetails: {
    flex: 1,
    backgroundColor: "white",
    marginHorizontal: 10,
    borderRadius: 30,
    padding: 20,
    height: "200%",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: Colors.green,
    marginLeft: 15,
    marginRight: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,

    marginTop: 10,
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
    borderBottomWidth: 5,
    borderBottomColor: Colors.middlepink,
  },
  low2: {
    width: 30,
    borderBottomWidth: 5,
    borderBottomColor: "grey",
  },
  low3: {
    width: 30,
    borderBottomWidth: 5,
    borderBottomColor: "grey",
  },
  middle: {
    width: 30,
    borderBottomWidth: 5,
    borderBottomColor: Colors.middlepink,
  },
  middle2: {
    width: 30,
    borderBottomWidth: 5,
    borderBottomColor: "grey",
  },
  high: {
    width: 30,
    borderBottomWidth: 5,
    borderBottomColor: Colors.middlepink,
  },

  ingredientsView: {
    marginTop: 10,

    height: "100%",
    backgroundColor: Colors.lightblue,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  ingredientsItem: {},
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
