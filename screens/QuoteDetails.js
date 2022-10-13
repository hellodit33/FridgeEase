import { useEffect } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

function QuoteDetails({ route }) {
  const selectedQuoteId = route.params.quoteId;

  useEffect(() => {}, [selectedQuoteId]);
  return (
    <ScrollView>
      <Image style={styles.image}></Image>
      <View style={styles.pageContainer}>
        <View>
          <Text style={styles.page}>PAGE</Text>
        </View>
      </View>
    </ScrollView>
  );
}

export default QuoteDetails;

const styles = StyleSheet.create({
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  page: {
    fontSize: 18,
    color: Colors.red,
  },
});
