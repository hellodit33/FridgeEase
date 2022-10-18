import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Modal,
  Image,
} from "react-native";
import {} from "@expo/vector-icons";

import PrimaryButton from "../components/PrimaryButton";
import Button from "../UI/Button";
import { store } from "../util/http";

function SuggestionInput(props) {
  const [enteredSuggestionText, setEnteredSuggestionText] = useState("");
  function suggestionInputHandler(enteredText) {
    setEnteredSuggestionText(enteredText);
  }
  function addSuggestionHandler() {
    if (enteredSuggestionText.length > 0) {
      props.onAddSuggestion(enteredSuggestionText);
      setEnteredSuggestionText("");
      storeSuggestions(props);
    } else {
      Alert.alert("Oops!", "Du glömde titeln på boken.", [
        { text: "Okej", style: "default" },
      ]);
    }
  }

  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={styles.suggestionContainer}>
        <Text>Förslag för nästa månad 📚</Text>
        <View style={styles.suggestion}>
          <TextInput
            style={styles.suggestionInput}
            placeholder="Ditt förslag 📚"
            onChangeText={suggestionInputHandler}
            value={enteredSuggestionText}
            keyboardType="default"
          ></TextInput>
          <TextInput
            placeholder="Varför ska vi läsa den?"
            style={styles.suggestionMotivation}
            keyboardType="default"
            multiline={true}
          ></TextInput>

          <TextInput
            placeholder="Synopsis"
            style={styles.suggestionSynopsis}
            keyboardType="default"
            multiline={true}
          ></TextInput>
          <TextInput
            placeholder="Antalet sidor"
            keyboardType="number-pad"
            maxLength={4}
            style={styles.suggestionPages}
            autoCorrect={false}
          ></TextInput>
          <View style={styles.buttonsContainer}>
            <View style={styles.button}>
              <PrimaryButton onPress={addSuggestionHandler}>
                Skicka 🗳️
              </PrimaryButton>
            </View>
            <View style={styles.button}>
              <PrimaryButton>Avbryt ⬅️</PrimaryButton>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default SuggestionInput;

const styles = StyleSheet.create({
  suggestionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
  },
  suggestion: {
    alignItems: "center",
    width: "80%",
    margin: 8,
  },
  suggestionInput: {
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "grey",
    color: "white",
    width: "100%",
    margin: 5,
    padding: 5,
    height: 50,
    fontSize: 32,
    textAlign: "center",
    marginVertical: 8,
    borderRadius: 20,
  },
  suggestionPages: {
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "grey",
    color: "white",
    width: "100%",
    margin: 5,
    padding: 5,
    height: 30,
    fontSize: 15,
    textAlign: "center",
    marginVertical: 8,
    borderRadius: 20,
  },
  suggestionMotivation: {
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "grey",
    color: "white",
    width: "100%",
    margin: 5,
    padding: 5,
    height: 30,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 8,
    borderRadius: 20,
    minHeight: 100,
    textAlignVertical: "top",
  },
  suggestionSynopsis: {
    borderWidth: 1,
    borderColor: "grey",
    backgroundColor: "grey",
    color: "white",
    width: "100%",
    margin: 5,
    padding: 5,
    height: 30,
    fontSize: 20,
    textAlign: "center",
    marginVertical: 8,
    borderRadius: 20,
    minHeight: 100,
    textAlignVertical: "top",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    height: 60,
    width: "40%",
  },
  image: {
    width: 200,
    height: 100,

    margin: 20,
  },
});
