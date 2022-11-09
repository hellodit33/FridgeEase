import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useDispatch } from "react-redux";
import * as authAction from "../../store/redux/actions/auth.actions";

function SignupScreen(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);

    dispatch(authAction.registerUser({ email, password }));
    try {
      navigation.navigate("Fridge");
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
