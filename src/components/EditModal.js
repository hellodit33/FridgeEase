import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Modal,
  TextInput,
  Image,
} from "react-native";
import IcoButton from "./IcoButton";
import Colors from "../../constants/Colors";
import PrimaryButton from "./PrimaryButton";

function EditModal(props) {
  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={styles.editView}>
        <Image
          style={styles.userImage}
          source={{
            uri:
              "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
              props.foodItem.foodLogo,
          }}
        ></Image>
        <Text> {props.foodItem.foodName}</Text>
        <TextInput placeholder="Expiration">
          {props.foodItem.foodExpiration}
        </TextInput>
        <TextInput placeholder="Carbon"> {props.foodItem.foodCarbon}</TextInput>
      </View>
      <PrimaryButton onPress={props.onEditFood}>Spara</PrimaryButton>
    </Modal>
  );
}

export default EditModal;

const styles = StyleSheet.create({
  editView: {
    backgroundColor: Colors.blue,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
