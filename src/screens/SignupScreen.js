import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";

import LoadingOverlay from "../UI/LoadingOverlay";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      await axios({
        method: "post",
        url: "https://c459-46-183-103-8.eu.ngrok.io/api/user/register",
        data: {
          email,
          password,
        },
      });
    } catch (error) {
      Alert.alert(
        "Sign up failed.",
        "Could not create user, please check your input or try again later"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Vi skapar ditt konto..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
