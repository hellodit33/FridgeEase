import { View, FlatList, StyleSheet } from "react-native";
import BookItem from "./BookItem";

function BooksList({ items }) {
  function renderBookItem(itemData) {
    const item = itemData.item;
    const bookItemProps = {
      id: item.id,
      title: item.title,
      image: item.imageUrl,
      pages: item.pages,
      ratings: item.ratings,
    };
    return <BookItem {...bookItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderBookItem}
      ></FlatList>
    </View>
  );
}

export default BooksList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
