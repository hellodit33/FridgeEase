import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function UpdateButton({ children, onPress }) {
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

export default UpdateButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  buttonInnerContainer: {
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: Colors.darkgreen,
    width: "60%",
    borderRadius: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
