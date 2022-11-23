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
      <ScrollView>
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
        {isLogin && (
          <View style={styles.flat}>
            <FlatButton>Glömt lösenordet?</FlatButton>
          </View>
        )}
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

const styles = StyleSheet.create({
  titleContainer: {
    maxHeight: 300,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    color: Colors.green,
    fontWeight: "bold",
    marginBottom: 30,
  },
  imageTitle: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    marginTop: 0,
  },
  flat: {
    alignItems: "flex-end",
    paddingVertical: 0,
    marginVertical: 0,
    justifyContent: "flex-end",
  },
  buttons: {
    backgroundColor: Colors.greywhite,
    borderRadius: 120,
    paddingVertical: 10,

    borderColor: "black",
    borderWidth: 1,
  },
  flatbutton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: "center",
  },

  buttonText: {
    textAlign: "center",
    color: Colors.green,
    fontWeight: "bold",
  },
});
