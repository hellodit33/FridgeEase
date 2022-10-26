import { View, StyleSheet, Text, Image } from "react-native";
import Colors from "../../constants/Colors";

function Header(props) {
  return (
    <>
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../.././assets/icon2.png")}
        />
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 10,
    backgroundColor: Colors.blue,
  },
  text: {
    fontSize: 20,
    backgroundColor: Colors.blue,
    color: Colors.green,
    fontWeight: "bold",
    borderBottomWidth: 3,
    borderColor: Colors.green,
  },
  image: {
    resizeMode: "cover",
    width: 100,
    height: 50,
  },
});
