import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import FlatButton from "../../UI/FlatButton";
import Input from "./Input";
import Colors from "../../constants/Colors";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View>
      <View style={styles.titleContainer}>
        <Image
          source={require("../../assets/icon2.png")}
          style={styles.imageTitle}
        />
        {isLogin ? (
          <Text style={styles.title}>Logga in</Text>
        ) : (
          <Text style={styles.title}>Bli medlem</Text>
        )}
      </View>
      <View>
        <Input
          style={styles.input}
          label="E-mail"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          placeholder="exempel@gmail.com"
          placeholderTextColor={Colors.green}
        />
        {!isLogin && (
          <Input
            style={styles.input}
            label="Confirm Email Address"
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
            placeholder="exempel@gmail.com"
            placeholderTextColor={Colors.green}
          />
        )}
        <Input
          style={styles.input}
          label="Lösenord"
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
            label="Confirm Password"
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
          <FlatButton onPress={submitHandler} style={styles.flatbutton}>
            {isLogin ? "Logga In" : "Bli medlem"}
          </FlatButton>
        </View>
      </View>
    </View>
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
    color: Colors.green,
  },
});
