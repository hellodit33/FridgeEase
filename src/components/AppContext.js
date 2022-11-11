//Creating the uid context, user id context, that will get the user token
import { useState } from "react";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import * as authAction from "../../store/redux/actions/auth.actions";
import * as userAction from "../../store/redux/actions/user.actions";

import { createNextState } from "@reduxjs/toolkit";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [uid, setUid] = useState(null);

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

            console.log(resultData);
            setIsLoading(false);
          } catch (err) {
            console.log(err);
          }
        } else {
          setIsLoading(false);
          Alert.alert(
            "Authentication failed",
            "Could not log you in :( Please check your credentials or try again later."
          );
        }
      })
      .catch((err) => console.log(err));
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
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

  const register = ({ email, password }) => {
    setIsLoading(true);
    dispatch(authAction.registerUser({ email, password }))
      .then((resultData) => {
        if (resultData.success) {
          try {
            setUserToken(resultData.token);
            setUid(resultData.id);

            AsyncStorage.setItem("userToken", resultData.token);
            console.log(resultData);
            setIsLoading(false);
          } catch (err) {
            console.log(err);
          }
        } else {
          setIsLoading(false);

          Alert.alert(
            "Sign up failed.",
            "Could not create user, please check your input or try again later"
          );
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{ login, logout, register, uid, isLoading, userToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
