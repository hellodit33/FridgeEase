import { FlatList, StyleSheet, View, Text } from "react-native";
import YearGridTile from "../components/YearGridTile.js";
import Colors from "../../constants/Colors.js";

function Shopping({ navigation }) {
  return (
    <View style={styles.main}>
      <Text>Hej</Text>
    </View>
  );
}

export default Shopping;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,

    paddingTop: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
