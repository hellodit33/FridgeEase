import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import IcoButton from "../components/IcoButton";
import cookie from "js-cookie";
import LoadingOverlay from "../UI/LoadingOverlay";
import { AuthContext } from "../../store/context/auth-context";
function User(props) {
  function FavoritesPress() {
    props.navigation.navigate("FavoriteRecipes");
  }
  function DietPress() {
    props.navigation.navigate("Diets");
  }
  function AllergyPress() {
    props.navigation.navigate("Allergies");
  }

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const { logout } = useContext(AuthContext);

  async function logoutHandler() {
    await logout();
  }

  if (isLoggingOut) {
    return <LoadingOverlay message="Vi loggar ut dig..." />;
  }
  return (
    <>
      <View style={styles.main}>
        <View style={styles.buttonsView}>
          <Pressable style={styles.buttons} onPress={FavoritesPress}>
            <Text style={styles.buttonsText}>Mina favoritrecept</Text>
            <IcoButton icon="heart-outline" color={Colors.darkpink}></IcoButton>
          </Pressable>
          <Pressable style={styles.buttons} onPress={DietPress}>
            <Text style={styles.buttonsText}>Min diet</Text>
            <IcoButton icon="pizza" color={Colors.darkpink}></IcoButton>
          </Pressable>

          <Pressable style={styles.buttons} onPress={AllergyPress}>
            <Text style={styles.buttonsText}>Mina allergier</Text>
            <IcoButton icon="alert" color={Colors.darkpink}></IcoButton>
          </Pressable>
          <View style={styles.loggaUtView}>
            <Pressable style={styles.loggaUt}>
              <Text style={styles.loggaUtText} onPress={logoutHandler}>
                Logga ut
              </Text>
            </Pressable>
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
