import { useState } from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import { Quote } from "../../models/quote";
import FlatButton from "../../UI/FlatButton";
import ImagePicker from "./ImagePicker";

function QuoteForm({ onCreateQuote, bookToRate }) {
  const [bookPage, setEnteredBookPage] = useState("");
  const [selectedPic, setSelectedPic] = useState();

  function changePageHandler(enteredText) {
    setEnteredBookPage(enteredText);
  }

  function takePicHandler(imageUri) {
    setSelectedPic(imageUri);
  }

  function saveQuote() {
    const quoteData = new Quote(bookToRate, bookPage, selectedPic);
    console.log(quoteData);

    onCreateQuote(quoteData);
  }
  return (
    <ScrollView>
      <Text>Sidan:</Text>
      <TextInput onChangeText={changePageHandler} value={bookPage}></TextInput>
      <ImagePicker onTakePic={takePicHandler} />
      <FlatButton onPress={saveQuote}>Spara citatet</FlatButton>
    </ScrollView>
  );
}

export default QuoteForm;
