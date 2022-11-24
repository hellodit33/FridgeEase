//Creating the uid context, user id context, that will get the user token
import { useState } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import * as authAction from "../../store/redux/actions/auth.actions";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [uid, setUid] = useState(null);
  const [userFoodTrue, setUserFoodTrue] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();

  const login = ({ email, password }) => {
    setIsLoading(true);
    dispatch(authAction.loginUser({ email, password }))
      .then((resultData) => {
        if (resultData.success) {
          try {
            setUserToken(resultData.token);
            setUid(resultData.id);

            console.log(resultData.id);
            AsyncStorage.setItem("userToken", resultData.token);
            AsyncStorage.setItem("uid", resultData.id);

            console.log(resultData.usersfood);
            if (resultData.usersfood > 0) {
              setUserFoodTrue(true);
            }
            setIsLoading(false);
          } catch (err) {
            console.log(err);
          }
        } else {
          setIsLoading(false);
          Alert.alert(
            "Inloggningen misslyckades.",
            "Vi kunde inte logga in dig :( Kontrollera dina inloggningsuppgifter eller försök igen senare."
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    /* dispatch(authAction.logoutUser());*/
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
    console.log("logged out");
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userToken = await AsyncStorage.getItem("userToken");
      let userId = await AsyncStorage.getItem("uid");
      setUserToken(userToken);
      setUid(userId);
      console.log(userToken);
      setIsLoading(false);
    } catch (e) {
      console.log(`Islogged in error ${e}`);
    }
  };

  const register = async ({ email, password }) => {
    setIsLoading(true);
    await dispatch(authAction.registerUser({ email, password }))
      .then((resultData) => {
        if (resultData.success) {
          try {
            setUserToken(resultData.token);
            setUid(resultData.id);

            AsyncStorage.setItem("userToken", resultData.token);
            console.log(resultData.usersfood);
            setIsLoading(false);
          } catch (err) {
            console.log(err);
          }
        } else {
          setIsLoading(false);

          Alert.alert(
            "Registreringen misslyckades.",
            "Vi kunde inte skapa ditt konto. Kontrollera att du har skrivit rätt uppgifter eller försök igen senare."
          );
        }
      })
      .catch((err) => console.log(err));
  };

  /*const addFood = () => {
    setUserFood(true);
  };*/

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        register,
        userFoodTrue,
        uid,
        isLoading,
        userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
