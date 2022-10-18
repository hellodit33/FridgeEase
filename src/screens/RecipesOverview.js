import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLayoutEffect } from "react";
import BookItem from "../components/BookList/BookItem.js";
import { RECIPES } from "../data/data.js";
import BooksList from "../components/BookList/BooksList.js";

function RecipesOverview({ route, navigation }) {
  const year = route.params.year;
  const catId = route.params.categoryId;

  const displayedRecipes = RECIPES.filter((recipeItem) => {
    return recipeItem.years === catId;
  });

  return <BooksList items={displayedRecipes} />;
}

export default RecipesOverview;
