import { useContext, useState } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useDispatch } from "react-redux";
import * as authAction from "../../store/redux/actions/auth.actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../components/AppContext";

function SignupScreen(props) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { register } = useContext(AuthContext);

  const signupHandler = async ({ email, password }) => {
    register({ email, password });
  };
  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
