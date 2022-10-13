import { StyleSheet, Text, View, Pressable } from "react-native";
import IconButton from "../components/IconButton";
import Colors from "../constants/Colors";
function SuggestionItem(props) {
  return (
    <View style={styles.suggestionItem}>
      <Text style={styles.suggestionText}>{props.text}</Text>
      <IconButton
        onPress={props.onDeleteItem.bind(this, props.id)}
        android_ripple={{ color: "black" }}
        icon="trash"
        size={36}
      />
    </View>
  );
}

export default SuggestionItem;

const styles = StyleSheet.create({
  suggestionItem: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
    backgroundColor: Colors.lightgreen,
    color: "black",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  suggestionText: {
    color: "white",
  },
  pressedItem: {
    opacity: 0.5,
  },
});
