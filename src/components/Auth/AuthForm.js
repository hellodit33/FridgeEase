import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";

import FlatButton from "../../UI/FlatButton";
import Input from "./Input";
import Colors from "../../../constants/Colors";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");

  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,

    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      default:
        "Unknown";
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.titleContainer}>
        <Image
          source={require("../../../assets/icon2.png")}
          style={styles.imageTitle}
          accessibilityLabel="logo for Fridge Ease"
        />
        {isLogin ? (
          <Text style={styles.title}>Logga in</Text>
        ) : (
          <Text style={styles.title}>Bli medlem</Text>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.auth}>
        <View style={styles.authHorizontal}>
          <Input
            style={styles.input}
            label="E-mail*"
            onUpdateValue={updateInputValueHandler.bind(this, "email")}
            value={enteredEmail}
            keyboardType="email-address"
            isInvalid={emailIsInvalid}
            placeholder="exempel@gmail.com"
            placeholderTextColor={Colors.green}
          />

          <Input
            style={styles.input}
            label="Lösenord*"
            onUpdateValue={updateInputValueHandler.bind(this, "password")}
            secure
            value={enteredPassword}
            isInvalid={passwordIsInvalid}
            placeholder="Lösenord"
            placeholderTextColor={Colors.green}
          />

          {!isLogin && (
            <Input
              label="Bekräfta ditt lösenord*"
              onUpdateValue={updateInputValueHandler.bind(
                this,
                "confirmPassword"
              )}
              secure
              placeholder="Lösenord"
              value={enteredConfirmPassword}
              isInvalid={passwordsDontMatch}
              placeholderTextColor={Colors.green}
            />
          )}
        </View>
        {isLogin && (
          <View style={styles.flat}>
            <FlatButton>Glömt lösenordet?</FlatButton>
          </View>
        )}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={submitHandler} style={styles.flatbutton}>
            <Text style={styles.buttonText}>
              {isLogin ? "Logga in" : "Bli medlem"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default AuthForm;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  titleContainer: {
    maxHeight: deviceHeight < 400 ? 100 : 300,
    marginTop: deviceHeight < 400 ? 2 : 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: Colors.green,
    fontWeight: "bold",
    marginBottom: deviceHeight < 400 ? 2 : 30,
  },
  imageTitle: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    marginTop: 0,
  },
  auth: {
    flexDirection: deviceHeight < 400 ? "row" : "column",
    justifyContent: deviceHeight < 400 ? "space-between" : "space-around",
  },
  input: {},
  flat: {
    alignItems: deviceHeight < 400 ? "flex-start" : "flex-end",
    paddingVertical: 0,
    marginVertical: 0,
    justifyContent: deviceHeight < 400 ? "flex-start" : "flex-end",
  },
  buttons: {
    backgroundColor: Colors.greywhite,
    borderRadius: 120,
    paddingVertical: 10,
    borderColor: "black",
    borderWidth: 1,
  },
  flatbutton: {
    paddingVertical: deviceHeight < 400 ? 2 : 6,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  buttonText: {
    textAlign: "center",
    color: Colors.green,
    fontWeight: "bold",
  },
});
