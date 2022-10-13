import { Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

function OutlinedButton({ onPress, icon, children }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.red}
      ></Ionicons>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.lightgreen,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: { color: Colors.red },
});
