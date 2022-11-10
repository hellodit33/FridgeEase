import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useDispatch } from "react-redux";
import * as authAction from "../../store/redux/actions/auth.actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignupScreen(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const signupHandler = async ({ email, password }) => {
    setIsAuthenticating(true);

    dispatch(authAction.registerUser({ email, password }))
      .then(async (result) => {
        console.log(result);
        if (result.success) {
          try {
            await AsyncStorage.setItem("token", result.token);
            console.log(result.success);
          } catch (err) {
            console.log(err);
          }
        } else {
          Alert.alert(
            "Sign up failed.",
            "Could not create user, please check your input or try again later"
          );
          setIsAuthenticating(false);
        }
      })
      .catch((err) => console.log(err));
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Vi skapar ditt konto..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
