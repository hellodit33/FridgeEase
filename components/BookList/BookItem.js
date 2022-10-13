import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RecipeInDetail from "../../screens/RecipeInDetail";

function BookItem({ id, title, imageUrl, ratings, synopsis, pages }) {
  const navigation = useNavigation();

  function selectBookItemHandler() {
    navigation.navigate("RecipesDetail", {
      bookId: id,
      title: title,
    });
  }
  return (
    <View style={styles.bookItem}>
      <Pressable
        onPress={selectBookItemHandler}
        android_ripple={{ color: "grey" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image}></Image>
            <Text style={styles.title}>{title}</Text>
          </View>
          <RecipeInDetail synopsis={synopsis} pages={pages} ratings={ratings} />
        </View>
      </Pressable>
    </View>
  );
}

export default BookItem;

const styles = StyleSheet.create({
  bookItem: {
    margin: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "lightblue",
    elevation: 4,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  innerContainer: {
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    margin: 10,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  details: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  detailItem: {
    fontWeight: "bold",
    marginHorizontal: 4,
    fontSize: 20,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});
