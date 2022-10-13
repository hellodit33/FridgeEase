import { View, Text, StyleSheet, FlatList } from "react-native";
import { useLayoutEffect } from "react";
import BookItem from "../components/BookList/BookItem.js";
import { BOOKS, YEARS } from "../data/data.js";
import BooksList from "../components/BookList/BooksList.js";

function RecipesOverview({ route, navigation }) {
  const year = route.params.year;
  const catId = route.params.categoryId;

  const displayedBooks = BOOKS.filter((bookItem) => {
    return bookItem.years === catId;
  });
  useLayoutEffect(() => {
    const categoryYear = YEARS.find((category) => category.id === catId).year;

    navigation.setOptions({
      title: "Böckerna vi läst " + categoryYear,
    });
  }, [catId, navigation]);
  return <BooksList items={displayedBooks} />;
}

export default RecipesOverview;
