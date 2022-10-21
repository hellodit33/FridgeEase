import { StyleSheet, View, Text, Button } from "react-native";

function FoodDetails() {
  return (
    <View>
      <View style={StyleSheet.firstview}>
        <Text>Title</Text>
        <Text>Expiration</Text>
      </View>
      <Text>Date</Text>
      <Text>Carbon</Text>
      <Text>Carbon footprint class</Text>
      <Button title="Spara"></Button>
    </View>
  );
}

export default FoodDetails;
