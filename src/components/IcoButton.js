import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IcoButton({ icon, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <Ionicons
        name={icon}
        size={24}
        color={color}
        style={styles.icons}
      ></Ionicons>
    </Pressable>
  );
}

export default IcoButton;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  icons: {
    /*paddingHorizontal: 9*/
  },
});
