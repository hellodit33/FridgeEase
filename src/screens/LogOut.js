import { useState } from "react";
import { Alert, StyleSheet, View, Text, Pressable } from "react-native";
import axios from "axios";
import cookie from "js-cookie";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../UI/LoadingOverlay";
import LogoutButton from "./LogoutButton";
import Colors from "../../constants/Colors";

function Logout({ onPress }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const BASE_URL = "https://fridgeease-app.herokuapp.com";

  async function logoutHandler() {
    try {
      await axios({
        method: "get",
        url: `${BASE_URL}/api/user/logout`,
        withCredentials: true,
      });
      then(() => removeCookie("jwt"));
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in :( Please check your credentials or try again later."
      );
      setIsAuthenticating(true);
    }
  }

  if (isLoggingOut) {
    return <LoadingOverlay message="Vi loggar ut dig..." />;
  }

  return (
    <>
      <View style={styles.loggaUtView}>
        <Pressable style={styles.loggaUt}>
          <Text style={styles.loggaUtText}>Logga ut</Text>
        </Pressable>
      </View>
    </>
  );
}

export default Logout;

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
