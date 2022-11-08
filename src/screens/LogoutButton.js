import { Pressable, View, Text, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

function LogoutButton(logout) {
  return (
    <View style={styles.loggaUtView}>
      <Pressable style={styles.loggaUt} onPress={logout}>
        <Text style={styles.loggaUtText}>Logga ut</Text>
      </Pressable>
    </View>
  );
}

export default LogoutButton;

const styles = StyleSheet.create({
  loggaUtView: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  loggaUt: {
    justifyContent: "center",

    borderRadius: 40,
    backgroundColor: Colors.green,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 40,
    width: "50%",
  },

  loggaUtText: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
