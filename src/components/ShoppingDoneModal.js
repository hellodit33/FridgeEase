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

import IcoButton from "./IcoButton";
import Colors from "../../constants/Colors";
import PrimaryButton from "./PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  editFoodFromShopping,
  getUser,
  removeShoppingList,
} from "../../store/redux/actions/user.actions";
import { useSelector, useDispatch } from "react-redux";

function ShoppingDoneModal(props) {
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const removeShopping = () => {
    dispatch(removeShoppingList(userData._id));
    dispatch(getUser(userData._id));
    props.closeModal();
  };
  return (
    <Modal
      style={styles.modal}
      visible={props.visible}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.deleteView}>
        <View style={styles.deleteTitle}>
          <Ionicons name="alert-circle-outline" size={30}></Ionicons>
          <Text style={styles.infoTitle}>Har du handlat klart?</Text>
        </View>
        <Text style={styles.infoText}>
          Vill du ta bort alla varor från din shoppinglista? Alla matvaror som
          du har tryckt på är nu med i ditt kylskåp. Om du har glömt att trycka
          på vissa matvaror som du har köpt, avbryt och gå tillbaka.
        </Text>
        <View style={styles.buttons}>
          <Pressable onPress={removeShopping} style={styles.yesButton}>
            <Ionicons size={20} color="white" name="checkmark-circle-outline" />
            <Text style={styles.buttonText}>Ja, jag har handlat klart.</Text>
          </Pressable>
          <Pressable onPress={props.closeModal} style={styles.cancelButton}>
            <Ionicons size={20} color="white" name="close-circle-outline" />
            <Text style={styles.buttonText}>Avbryt</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export default ShoppingDoneModal;

const styles = StyleSheet.create({
  modal: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteView: {
    backgroundColor: "white",
    borderRadius: 30,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 200,
    justifyContent: "center",
    borderColor: "black",
    borderWidth: 4,
  },
  deleteTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
  },
  yesButton: {
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.green,
    padding: 10,
    margin: 5,
  },
  cancelButton: {
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.darkpink,
    padding: 10,
    margin: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  infoText: {
    fontWeight: "bold",
    margin: 10,
  },
  infoTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.darkgreen,
    marginLeft: 20,
  },
});
