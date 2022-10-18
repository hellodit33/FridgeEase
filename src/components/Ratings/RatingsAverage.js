import { View, Text } from "react-native";

function RatingsAverage({ ratings, style }) {
  const ratingsSum = ratings.reduce((sum, rating) => {
    return sum + rating.amount;
  }, 0);

  const ratingsAverage = Math.floor(ratingsSum / ratings.length);
  return (
    <View style={style}>
      <Text style={style}>Vårt betyg: {ratingsAverage}/10</Text>
    </View>
  );
}

export default RatingsAverage;
