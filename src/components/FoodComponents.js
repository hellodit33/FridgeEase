import { StyleSheet, View, Image, Text, Pressable } from "react-native";

function FoodComponents(props) {
  function FoodDetails() {
    props.navigation.navigate("FoodDetails");
  }
  return (
    <Pressable onPress={FoodDetails}>
      <View>
        <View>
          <Image />
        </View>
        <View>
          <Text>Title</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default FoodComponents;
