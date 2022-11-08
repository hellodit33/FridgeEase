import { useState, useContext } from "react";
import { Alert } from "react-native";
import axios from "axios";
import { AuthContext } from "../../store/context/auth-context";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../UI/LoadingOverlay";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { login } = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    await login(email, password);
    /*setIsAuthenticating(true);
    try {
      
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in :( Please check your credentials or try again later."
      );
      setIsAuthenticating(false);
    }*/
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Vi loggar in dig..." />;
  }

  return <AuthContent isLogin onAuthenticate={login} />;
}

export default LoginScreen;
