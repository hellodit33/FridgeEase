import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RatingsOutput from "../components/Ratings/RatingsOutput";
import Colors from "../../constants/Colors";

function RecipeInDetail({ synopsis, ratings, pages, style, textStyle }) {
  const ratingsSum = ratings.reduce((sum, rating) => {
    return sum + rating;
  }, 0);

  const ratingsAverage = Math.floor(ratingsSum / ratings.length);

  return (
    <View style={[styles.details, style]}>
      <Text style={[styles.detailItem, textStyle, styles.synopsis]}>
        {synopsis}
      </Text>
      <Text style={[styles.detailItem, textStyle]}>{pages} sidor</Text>
      <Text style={[styles.detailItem, textStyle, styles.average]}>
        Vårt betyg: {ratingsAverage} /10
      </Text>
    </View>
  );
}

export default RecipeInDetail;

const styles = StyleSheet.create({
  details: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  detailItem: {
    fontWeight: "bold",
    marginHorizontal: 4,
    fontSize: 20,
  },
  synopsis: {
    color: "white",
    fontSize: 15,
    margin: 6,
  },
  average: {
    color: Colors.red,
    padding: 10,
  },
});
