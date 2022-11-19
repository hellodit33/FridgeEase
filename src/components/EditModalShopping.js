import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import IcoButton from "./IcoButton";
import Colors from "../../constants/Colors";
import PrimaryButton from "./PrimaryButton";
import { Ionicons } from "@expo/vector-icons";

function EditModalShopping(props) {
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
          {/* <Text style={styles.foodExp}>
            {props.passedData.expiration}
            {props.passedData.expiration > 1 ? " dagar" : " dag"}
          </Text>*/}
          <Pressable style={styles.close} onPress={props.onEditFood}>
            <Ionicons name="close" size={24} color={Colors.darkpink}></Ionicons>
          </Pressable>
        </View>
        <View styles={styles.moreInfoToChange}>
          <View style={styles.foodChange}>
            <TextInput placeholder="Kvantité">
              {props.passedData.quantity}
            </TextInput>
            <Ionicons name="create" color={Colors.green} size={20}></Ionicons>
          </View>
          <View style={styles.foodChange}>
            <TextInput placeholder="Ekologisk eller icke-ekologisk"></TextInput>
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

        <PrimaryButton onPress={props.onEditFood}>Spara</PrimaryButton>
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
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  modalTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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
  close: {
    marginLeft: 100,
  },
});
