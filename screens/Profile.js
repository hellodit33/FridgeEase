import { StyleSheet, View, Text } from "react-native";
import { useContext } from "react";
import BooksList from "../components/BookList/BooksList";
import { BOOKS } from "../data/data";
import { ToReadContext } from "../store/context/toread-context";

function Profile() {
  const toReadCtx = useContext(ToReadContext);

  const toRead = BOOKS.filter((book) => toReadCtx.ids.includes(book.id));

  if (toRead.length === 0) {
    return (
      <View style={styles.rootContainer}>
        <Text style={styles.text}>You have no books to read yet</Text>
      </View>
    );
  }
  return <BooksList items={toRead} />;
}

export default Profile;

const styles = StyleSheet.create({
  rootContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});
