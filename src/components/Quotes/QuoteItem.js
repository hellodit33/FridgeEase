import { Image, Pressable, View, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";

function QuoteItem({ quote, onSelect }) {
  return (
    <Pressable
      onPress={onSelect.bind(this, quote.id)}
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
    >
      <Image style={styles.image} source={{ uri: quote.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.book}>{quote.book}</Text>
        <Text style={styles.page}>{quote.page}</Text>
      </View>
    </Pressable>
  );
}
export default QuoteItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.lightgreen,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 12,
  },
  book: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.middlebrown,
  },
  page: {
    fontSize: 12,
    color: Colors.brown,
  },
});
