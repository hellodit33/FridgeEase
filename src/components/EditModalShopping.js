import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  Image,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import Checkbox from "expo-checkbox";

import IcoButton from "./IcoButton";
import Colors from "../../constants/Colors";
import PrimaryButton from "./PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  editFoodFromShopping,
  getUser,
} from "../../store/redux/actions/user.actions";
import { useSelector, useDispatch } from "react-redux";

function EditModalShopping(props) {
  const [isChecked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const [enteredQuantityText, setEnteredQuantityText] = useState("");
  const [enteredBioText, setEnteredBioText] = useState(false);
  const userData = useSelector((state) => state.userReducer);

  function quantityInputHandler(enteredQuantity) {
    setEnteredQuantityText(enteredQuantity);
  }

  function bioInputHandler(enteredBio) {
    setEnteredBioText(enteredBio);
  }

  async function editFoodInShopping() {
    if (enteredQuantityText.length > 0 || isChecked || !isChecked) {
      dispatch(
        editFoodFromShopping(
          userData._id,
          props.passedData.id,
          isChecked,
          enteredQuantityText
        )
      );
      dispatch(getUser(userData._id));
      setEnteredBioText("");
      setEnteredQuantityText("");
      console.log("edited");
      props.closeModal();
    } else {
      Alert.alert(
        "Oops!",
        "Kvantité eller ekologiska val saknas. Fyll gärna i någon av dem för att kunna gå vidare",
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
      <KeyboardAvoidingView style={styles.editView}>
        <View style={styles.modalTitle}>
          <Image
            style={styles.userImage}
            source={{
              uri:
                "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                props.passedData.logo,
            }}
          ></Image>
          <Text style={styles.foodText}>{props.passedData.name}</Text>
          {props.passedData.existingBioQuality === true && <Text>Eko</Text>}
          <Text style={styles.foodExp}>{props.passedData.quantity}</Text>

          <Pressable onPress={props.onEditFood}>
            <Ionicons name="close" size={24} color={Colors.darkpink}></Ionicons>
          </Pressable>
        </View>
        <View styles={styles.moreInfoToChange}>
          <View style={styles.foodChange}>
            <TextInput
              placeholder="Ändra kvantité"
              onChangeText={quantityInputHandler}
              value={enteredQuantityText}
            ></TextInput>

            <Ionicons name="create" color={Colors.green} size={20}></Ionicons>
          </View>
          <View style={styles.ekoChange}>
            <View style={styles.checkbox}>
              <Checkbox
                style={{ marginRight: 10 }}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? Colors.green : undefined}
              />
              {!isChecked ? (
                <Text>Icke-ekologisk</Text>
              ) : (
                <Text>Ekologisk</Text>
              )}
            </View>
            {/*<TextInput
              onChangeText={bioInputHandler}
              value={enteredBioText}
              placeholder="Ekologisk eller icke-ekologisk"
            ></TextInput>*/}
            <Ionicons name="create" color={Colors.green} size={20}></Ionicons>
          </View>

          <View style={styles.carbonInfo}>
            <Text style={styles.recipesText}>
              {props.passedData.carbon === "A"
                ? "Mycket låg klimatpåverkan"
                : props.passedData.carbon === "B"
                ? "Relativt låg klimatpåverkan"
                : props.passedData.carbon === "C"
                ? "Medelhög klimatpåverkan"
                : props.passedData.carbon === "D"
                ? "Relativt hög klimatpåverkan"
                : props.passedData.carbon === "E"
                ? "Mycket hög klimatpåverkan"
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
                      ? Colors.lightyellow
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
        </View>

        <PrimaryButton onPress={editFoodInShopping}>Spara</PrimaryButton>
        <PrimaryButton onPress={props.closeModal}>Avbryt</PrimaryButton>
        <Pressable style={styles.deleteFromList}>
          <Text style={styles.deleteFromListText}>
            Ta bort varan från min shoppinglista
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

export default EditModalShopping;

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
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 200,
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
  moreInfoToChange: {},
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
  ekoChange: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.grey,
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
  },
  checkbox: {
    flexDirection: "row",
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
  deleteFromList: {
    marginHorizontal: 15,
    justifyContent: "center",
    alignContent: "center",
  },
  deleteFromListText: {
    textDecorationLine: "underline",
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
  },
});
