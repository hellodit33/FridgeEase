import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../../constants/Colors";
import PrimaryButton from "../UI/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editFoodExpiration,
  editFoodQuantity,
  getUser,
} from "../../store/redux/actions/user.actions";
import DateTimePickerEvent from "@react-native-community/datetimepicker";
import { differenceInDays, parseISO } from "date-fns";

function EditModalFridge(props) {
  const [today, setToday] = useState(new Date());

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [text, setText] = useState();
  let nowDate =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
  const parse = parseISO(props.passedData.expirationDate);

  function dateDiff() {
    if (props.passedData.expirationDate) {
      let dateDiff = differenceInDays(
        Date.parse(props.passedData.expirationDate),
        Date.parse(today)
      );
      return (
        <Text>
          {dateDiff} {dateDiff > 1 ? " dagar" : " dag"}
        </Text>
      );
    } else {
      return (
        <Text>
          {props.passedData.expiration}
          {props.passedData.expiration > 1 ? " dagar" : " dag"}
        </Text>
      );
    }
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.IOS === "ios");
    setDate(currentDate);
    let temporaryDate = new Date(currentDate);
    let fullDate =
      temporaryDate.getDate() +
      "/" +
      (temporaryDate.getMonth() + 1) +
      "/" +
      temporaryDate.getFullYear();
    setEnteredExpirationFull(temporaryDate);
    setEnteredExpirationText(fullDate);
  };

  const showMode = () => {
    setShow(true);
  };
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const [enteredQuantityText, setEnteredQuantityText] = useState("");
  const [enteredExpirationFull, setEnteredExpirationFull] = useState();
  const [enteredExpirationText, setEnteredExpirationText] = useState(
    props.passedData.expiration
  );

  function quantityInputHandler(enteredQuantity) {
    setEnteredQuantityText(enteredQuantity);
  }

  function expirationInputHandler(enteredExpiration) {
    setEnteredExpirationText(enteredExpiration);
  }
  async function editFoodInFridge() {
    if (enteredQuantityText.length > 0 && enteredExpirationText) {
      dispatch(
        editFoodQuantity(userData._id, props.passedData.id, enteredQuantityText)
      );
      dispatch(
        editFoodExpiration(
          userData._id,
          props.passedData.id,
          enteredExpirationFull
        )
      );
      dispatch(getUser(userData._id));
      setEnteredQuantityText("");
      setEnteredExpirationText("");
      console.log("edited");
      props.closeModal();
    } else if (enteredQuantityText.length > 0) {
      dispatch(
        editFoodQuantity(userData._id, props.passedData.id, enteredQuantityText)
      );
      dispatch(getUser(userData._id));
      setEnteredQuantityText("");
      setEnteredExpirationText("");
      console.log("edited");
      props.closeModal();
    } else if (enteredExpirationText) {
      dispatch(
        editFoodExpiration(
          userData._id,
          props.passedData.id,
          enteredExpirationFull
        )
      );
      dispatch(getUser(userData._id));
      setEnteredQuantityText("");
      setEnteredExpirationText("");
      console.log("edited");
      props.closeModal();
    } else {
      Alert.alert(
        "Oops!",
        "Kvantit?? eller b??st f??re datum saknas. Fyll g??rna i n??gon av dem f??r att kunna g?? vidare. Annars avbryt.",
        [{ text: "Okej", style: "default" }]
      );
    }
  }

  return (
    <Modal
      style={styles.modal}
      visible={props.visible}
      animationType="fade"
      transparent={true}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "padding"}
        style={styles.editView}
      >
        <View style={styles.modalTitle}>
          <Image
            accessibilityLabel={props.passedData.logo}
            style={styles.userImage}
            source={{
              uri:
                "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                props.passedData.logo,
            }}
          ></Image>
          <Text style={styles.foodText}>{props.passedData.name}</Text>

          <Text style={styles.foodExp}>{dateDiff()}</Text>

          <Pressable onPress={props.closeModal}>
            <Ionicons name="close" size={24} color={Colors.darkpink}></Ionicons>
          </Pressable>
        </View>
        <View styles={styles.moreInfoToChange}>
          {props.passedData.quantity && props.passedData.quantity.length > 0 ? (
            <Text style={styles.foodQuantity}>
              Nuvarande kvantit??: {props.passedData.quantity}
            </Text>
          ) : (
            <Text style={styles.foodQuantity}>Ingen nuvarande kvantit??</Text>
          )}
          <View style={styles.carbonInfo}>
            <Text style={styles.recipesText}>
              {props.passedData.carbon === "A"
                ? "Mycket l??g klimatp??verkan"
                : props.passedData.carbon === "B"
                ? "Relativt l??g klimatp??verkan"
                : props.passedData.carbon === "C"
                ? "Medelh??g klimatp??verkan"
                : props.passedData.carbon === "D"
                ? "Relativt h??g klimatp??verkan"
                : props.passedData.carbon === "E"
                ? "Mycket h??g klimatp??verkan"
                : null}
            </Text>
            <Text
              style={[
                styles.foodCarbon,
                {
                  color:
                    props.passedData.carbon === "A"
                      ? "white"
                      : props.passedData.carbon === "B"
                      ? "white"
                      : props.passedData.carbon === "C"
                      ? "black"
                      : props.passedData.carbon === "D"
                      ? "black"
                      : props.passedData.carbon === "E"
                      ? "white"
                      : null,
                  backgroundColor:
                    props.passedData.carbon === "A"
                      ? Colors.darkgreen
                      : props.passedData.carbon === "B"
                      ? Colors.lightgreen
                      : props.passedData.carbon === "C"
                      ? Colors.lightorange
                      : props.passedData.carbon === "D"
                      ? Colors.orange
                      : props.passedData.carbon === "E"
                      ? Colors.red
                      : null,
                },
              ]}
            >
              {props.passedData.carbon}
            </Text>
          </View>
          <View style={styles.foodChange}>
            <TextInput
              placeholder="??ndra b??st f??re datum"
              keyboardType="numbers-and-punctuation"
              onChangeText={expirationInputHandler}
              value={enteredExpirationText}
            ></TextInput>

            <Ionicons
              name="calendar"
              color={Colors.green}
              size={20}
              onPress={() => showMode()}
            ></Ionicons>
          </View>

          {show && (
            <DateTimePickerEvent
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
          <View style={styles.foodChange}>
            <TextInput
              onChangeText={quantityInputHandler}
              value={enteredQuantityText}
              placeholder="??ndra kvantit?? h??r"
              keyboardType="numbers-and-punctuation"
            ></TextInput>
            <Ionicons name="create" color={Colors.green} size={20}></Ionicons>
          </View>
        </View>
        <View style={styles.buttons}>
          <PrimaryButton onPress={editFoodInFridge}>Spara</PrimaryButton>
          <PrimaryButton onPress={props.closeModal}>Avbryt</PrimaryButton>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default EditModalFridge;

const styles = StyleSheet.create({
  modal: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  editView: {
    backgroundColor: "white",
    borderRadius: 30,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    justifyContent: "center",
  },
  userImage: {
    marginLeft: 5,
    marginRight: 10,
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  modalTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  foodText: {
    marginRight: 10,
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 17,
  },

  foodExp: {
    marginLeft: 60,
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.middlepink,
    color: "white",
    fontWeight: "bold",
  },
  foodQuantity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderColor: Colors.green,
    borderWidth: 2,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  foodChange: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: Colors.grey,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },

  carbonInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.grey,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  foodCarbon: {
    fontSize: 16,
    marginTop: -10,
    marginBottom: -10,
    width: 30,
    marginRight: -10,
    borderTopEndRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  buttons: {
    marginBottom: 20,
  },
});
