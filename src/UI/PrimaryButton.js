import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        onPress={onPress}
        android_ripple={{ color: "white" }}
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    marginHorizontal: 15,
    marginTop: 15,

    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.blue,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
