import { useState, useContext } from "react";
import { Alert } from "react-native";
import axios from "axios";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useDispatch } from "react-redux";
import * as authAction from "../../store/redux/actions/auth.actions";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    dispatch(authAction.loginUser({ email, password }))
      .then(async (result) => {
        console.log(result);
        if (result.success) {
          try {
            const token = await AsyncStorage.setItem("token", result.token);
            console.log(result.success);
          } catch (err) {
            console.log(err);
          }
        } else {
          Alert.alert(
            "Authentication failed",
            "Could not log you in :( Please check your credentials or try again later."
          );
          setIsAuthenticating(false);
        }
      })

      .catch((err) => console.log(err));
  };

  /*if (isAuthenticating) {
    return <LoadingOverlay message="Vi loggar in dig..." />;
  }*/

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
