import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import Colors from "../../constants/Colors";
import IcoButton from "../UI/IcoButton";
import { AuthContext } from "../components/AppContext";
function User(props) {
  const { logout } = useContext(AuthContext);
  function FavoritesPress() {
    props.navigation.navigate("FavoriteRecipes");
  }
  function DietPress() {
    props.navigation.navigate("Diets");
  }
  function AllergyPress() {
    props.navigation.navigate("Allergies");
  }

  return (
    <>
      <View style={styles.main}>
        <View style={styles.buttonsView}>
          <TouchableOpacity style={styles.buttons} onPress={FavoritesPress}>
            <Text style={styles.buttonsText}>Mina favoritrecept</Text>
            <IcoButton icon="heart" color={Colors.middlepink}></IcoButton>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={DietPress}>
            <Text style={styles.buttonsText}>Min kost</Text>
            <IcoButton icon="pizza" color={Colors.middlepink}></IcoButton>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttons} onPress={AllergyPress}>
            <Text style={styles.buttonsText}>Mina allergier</Text>
            <IcoButton icon="alert" color={Colors.middlepink}></IcoButton>
          </TouchableOpacity>
          <View style={styles.loggaUtView}>
            <TouchableOpacity style={styles.loggaUt}>
              <Text style={styles.loggaUtText} onPress={() => logout()}>
                Logga ut
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default User;
const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
    paddingTop: 50,
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  buttonsView: {
    justifyContent: "flex-start",
  },
  buttons: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 40,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  buttonsText: {
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 20,
  },
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
