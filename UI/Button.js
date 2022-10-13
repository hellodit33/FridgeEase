import { Pressable, Text, View, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable onPress={onPress}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.bluegreen,
  },
  flat: {
    backgroundColor: Colors.beige,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: Colors.bluegreen,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: Colors.lightbrown,
    borderRadius: 4,
  },
});
