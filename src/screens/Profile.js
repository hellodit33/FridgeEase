import { StyleSheet, View, Text } from "react-native";
import { useContext } from "react";
import BooksList from "../components/BookList/BooksList";
import { RECIPES } from "../data/data";
import { FavoritesContext } from "../../store/context/favorites-context";
import Colors from "../../constants/Colors";

function Profile() {
  const favoriteCtx = useContext(FavoritesContext);

  const favoriteRecipes = RECIPES.filter((favorite) =>
    favoriteCtx.ids.includes(favorite.id)
  );

  if (favoriteRecipes.length === 0) {
    return (
      <View style={styles.main}>
        <Text style={styles.text}>You have no favorite recipes yet.</Text>
      </View>
    );
  }
  return <BooksList items={favoriteRecipes} />;
}

export default Profile;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,

    paddingTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
