import { View, Text } from "react-native";

function RateItem({ route }) {
  const bookToRate = route.params.bookId;
  return (
    <View>
      <Text>Ge ett betyg</Text>
      <Text>{bookToRate}</Text>
    </View>
  );
}

export default RateItem;
