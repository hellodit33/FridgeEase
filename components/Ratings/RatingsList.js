import { FlatList, Text, View } from "react-native";

function renderRatingItem(itemData) {
  return (
    <View>
      <Text>{itemData.item.amount}</Text>
      <Text>{itemData.item.author}</Text>
    </View>
  );
}
function RatingsList({ ratings }) {
  return (
    <FlatList
      data={ratings}
      renderItem={renderRatingItem}
      keyExtractor={(item) => item.id}
    ></FlatList>
  );
}

export default RatingsList;
