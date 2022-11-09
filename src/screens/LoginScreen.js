import { useState, useContext } from "react";
import { Alert } from "react-native";
import axios from "axios";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../UI/LoadingOverlay";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await axios({
        method: "post",
        url: "https://180e-2-71-56-111.eu.ngrok.io/api/user/login",
        data: {
          email,
          password,
        },
      });
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in :( Please check your credentials or try again later."
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Vi loggar in dig..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
