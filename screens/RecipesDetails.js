import { useContext, useLayoutEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { BOOKS } from "../data/data";
import RecipeInDetail from "./RecipeInDetail";
import IconButton from "../components/IconButton";
import { ToReadContext } from "../store/context/toread-context";
import { useNavigation } from "react";

function RecipesDetails({ route, navigation }) {
  const toReadCtx = useContext(ToReadContext);

  const bookId = route.params.bookId;

  const selectedBook = BOOKS.find((book) => book.id === bookId);

  const bookIsToRead = toReadCtx.ids.includes(bookId);

  function rateItemHandler() {
    navigation.navigate("RateItem", { bookId: bookId });
  }

  function allQuotesHandler() {
    navigation.navigate("AllQuotes", { bookId: bookId });
  }
  function addQuoteHandler() {
    navigation.navigate("AddQuote", { bookId: bookId });
  }

  function toRead() {
    if (bookIsToRead) {
      toReadCtx.removeToRead(bookId);
    } else {
      toReadCtx.addToRead(bookId);
    }
  }

  useLayoutEffect(() => {
    const bookName = selectedBook.title;

    navigation.setOptions({
      title: bookName,
      headerRight: () => {
        return (
          <IconButton
            title="Att läsa"
            onPress={toRead}
            icon={bookIsToRead ? "bookmark" : "bookmark-outline"}
            color="white"
          ></IconButton>
        );
      },
    });
  }, [selectedBook, navigation, toRead]);
  return (
    <ScrollView>
      <Image source={{ uri: selectedBook.imageUrl }} />

      <View>
        <RecipeInDetail
          ratings={selectedBook.ratings}
          pages={selectedBook.pages}
          synopsis={selectedBook.synopsis}
          textStyle={styles.textStyle}
        />
        <Button onPress={rateItemHandler} title="Ge ett betyg"></Button>
        <Button onPress={addQuoteHandler} title="Lägg till ett citat"></Button>
        <Button onPress={allQuotesHandler} title="Se alla citat"></Button>
      </View>
    </ScrollView>
  );
}

export default RecipesDetails;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  textStyle: {
    color: "white",
  },
});
