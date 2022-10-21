import { View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function Diets(props) {
  return (
    <View style={styles.view}>
      <Text style={styles.diets}>Mina diets</Text>
    </View>
  );
}

export default Diets;

const styles = StyleSheet.create({
  view: {
    alignContent: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  diets: {
    color: "white",
  },
});
