import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../../store/context/auth-context";
import LoadingOverlay from "../UI/LoadingOverlay";
import { logIn } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
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
