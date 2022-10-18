import { FlatList, StyleSheet, View, Text, Button } from "react-native";
import QuoteItem from "./QuoteItem";
import { useNavigation } from "@react-navigation/native";

function QuotesList({ quotes, bookToRate }) {
  function selectQuoteHandler(id) {
    navigation.navigate("QuoteDetails", {
      quoteId: id,
    });
  }
  const navigation = useNavigation();
  function addQuoteHandler() {
    navigation.navigate("AddQuote", { bookId: bookToRate });
  }
  if (!quotes || quotes.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          Inga citat än! Lägg till ett citat.
        </Text>
        <Button onPress={addQuoteHandler} title="Lägg till ett citat"></Button>
      </View>
    );
  }
  return (
    <FlatList
      style={styles.list}
      data={quotes}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <QuoteItem quote={item} onSelect={selectQuoteHandler} />
      )}
    />
  );
}

export default QuotesList;

const styles = StyleSheet.create({
  list: { margin: 24 },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
  },
});
