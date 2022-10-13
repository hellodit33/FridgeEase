import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import Colors from "../constants/Colors";

function LoadingOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <ActivityIndicator size="large" color="white"></ActivityIndicator>
    </View>
  );
}

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: Colors.saumon,
  },
});
