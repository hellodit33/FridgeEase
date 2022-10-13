import { useState } from "react";
import Colors from "../constants/Colors";

import { View, Button, FlatList, Dimensions, StyleSheet } from "react-native";
import SuggestionInput from "./SuggestionInput";
import SuggestionItem from "./SuggestionItem";
import { storeSuggestions } from "../util/http";

function Fridge() {
  const [suggestionsList, setSuggestionsList] = useState([]);

  const [modalIsVisible, setModalIsVisible] = useState(false);
  function openModal() {
    setModalIsVisible(true);
  }
  function closeModal() {
    setModalIsVisible(false);
  }
  function addSuggestionHandler(enteredSuggestionText) {
    setSuggestionsList((currentSuggestions) => [
      ...currentSuggestions,
      {
        text: enteredSuggestionText,
        id: Math.random().toString(),
      },
    ]);

    closeModal();
  }

  function deleteSuggestionHandler(id) {
    setSuggestionsList((currentSuggestions) => {
      return currentSuggestions.filter((suggestion) => suggestion.id !== id);
    });
  }
  return (
    <View style={styles.suggestion}>
      <Button
        title="Lägg till ett förslag"
        color={Colors.darkgreen}
        onPress={openModal}
      />

      <SuggestionInput
        onAddSuggestion={addSuggestionHandler}
        visible={modalIsVisible}
        closeModal={closeModal}
      />

      <View style={styles.list}>
        <FlatList
          data={suggestionsList}
          alwaysBounceVertical={false}
          renderItem={(itemData) => {
            return (
              <SuggestionItem
                text={itemData.item.text}
                onDeleteItem={deleteSuggestionHandler}
                id={itemData.item.id}
              />
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        ></FlatList>
      </View>
    </View>
  );
}

export default Fridge;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({});
