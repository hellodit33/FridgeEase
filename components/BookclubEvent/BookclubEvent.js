import { ScrollView, View, TextInput, Text } from "react-native";
import BookClubLocation from "./BookClubLocation";
import FlatButton from "../../UI/FlatButton";
import Colors from "../../constants/Colors";
import { Event } from "../../models/event";
import { useState } from "react";

function BookClubEvent({ onCreateEvent }) {
  const [enteredBook, setEnteredBook] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [selectedHost, setSelectedHost] = useState();

  const [pickedLocation, setPickedLocation] = useState();

  function changeBookHandler(enteredText) {
    setEnteredBook(enteredText);
  }

  function changeDateHandler(enteredDate) {
    setSelectedDate(enteredDate);
  }

  function changeHostHandler(enteredHost) {
    setSelectedHost(enteredHost);
  }
  function pickLocationHandler(location) {
    setPickedLocation(location);
  }

  function saveBookclub() {
    const eventData = new Event(
      enteredBook,
      selectedDate,
      selectedHost,
      pickedLocation
    );
    console.log(eventData);
  }
  return (
    <ScrollView>
      <Text>Boken att läsa:</Text>
      <TextInput
        onChangeText={changeBookHandler}
        value={enteredBook}
      ></TextInput>
      <Text>Datum för bokklubben:</Text>
      <TextInput
        onChangeText={changeDateHandler}
        value={selectedDate}
        keyboardType="default"
      ></TextInput>
      <Text>Värden:</Text>
      <TextInput
        keyboardType="default"
        onChangeText={changeHostHandler}
        value={selectedHost}
      ></TextInput>

      <View>
        <BookClubLocation onPickLocation={pickLocationHandler} />
      </View>
      <FlatButton color={Colors.brown} size={24} onPress={saveBookclub}>
        Spara
      </FlatButton>
    </ScrollView>
  );
}

export default BookClubEvent;
