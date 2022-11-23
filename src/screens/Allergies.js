import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Button,
} from "react-native";
import Colors from "../../constants/Colors";
import MultiSelect from "react-native-multiple-select";
import { Component, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import LoadingOverlay from "../UI/LoadingOverlay";
import { getUser, updateAllergy } from "../../store/redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "expo-checkbox";
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";

function Allergies(props) {
  const items = [
    { name: "Mjölk", id: "1" },
    { name: "Gluten", id: "2" },
    { name: "Ägg", id: "3" },
    { name: "Jordnötter", id: "4" },
    { name: "Fisk", id: "5" },
    { name: "Skaldjur", id: "6" },
    { name: "Nötter", id: "7" },
    { name: "Soja", id: "8" },
    { name: "Fröer", id: "9" },
  ];
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const onSelectedItemsChange = (selectedAllergies) => {
    // Set Selected Items
    setSelectedAllergies([...selectedAllergies], selectedAllergies);
    console.log(selectedAllergies);
  };

  function updateAllergies() {
    showMessage({
      duration: 4000,
      message: "Dina allergier är nu uppdaterade",
      backgroundColor: Colors.green,
      color: "white",
    });
    dispatch(updateAllergy(userData._id, selectedAllergies));
    dispatch(getUser(userData._id));
  }

  const [loaded] = useFonts({
    alk: require("../../assets/fonts/Alkalami-Regular.ttf"),
    Intermedium: require("../../assets/fonts/Inter-Medium.ttf"),
    Interbold: require("../../assets/fonts/Inter-Bold.ttf"),
    Interlight: require("../../assets/fonts/Inter-Light.ttf"),
  });

  if (!loaded) {
    return <LoadingOverlay message="Ge oss en kort stund" />;
  }
  return (
    <>
      <View style={styles.main}>
        <View style={styles.textView}>
          <Ionicons
            style={{ marginHorizontal: 8 }}
            name="pizza"
            color={Colors.darkgreen}
            size={40}
          />
          <Text style={styles.text}>
            Här kan du fylla i dina allergier så att du bara får upp recept som
            passar dig i vår app. Det går alltid att justera dina allergier.
          </Text>
        </View>
        <View style={styles.updateView}>
          <Pressable
            style={styles.updateButton}
            onPress={() => updateAllergies()}
          >
            <Text style={styles.updateText}>Uppdatera dina allergier</Text>
          </Pressable>
        </View>
        <View style={styles.selectAllergy}>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="name"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedAllergies}
            fontFamily="Intermedium"
            itemFontFamily="Interlight"
            fontSize={17}
            itemFontSize={17}
            selectText="Välj dina allergier"
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor={Colors.green}
            tagBorderColor={Colors.green}
            tagTextColor={Colors.green}
            searchInputPlaceholderText="Sök dina allergier"
            searchInputStyle={styles.search}
            selectedItemTextColor={Colors.lightgreen}
            selectedItemIconColor={Colors.lightgreen}
            itemTextColor={Colors.darkgreen}
            displayKey="name"
            styleDropdownMenuSubsection={styles.dropdown}
            hideSubmitButton
            styleInputGroup={styles.searchinput}
            styleTextDropdown={styles.selectText}
            styleTextDropdownSelected={styles.selectTextSelected}
          />
        </View>

        {userData.allergy.length > 0 && (
          <View style={styles.allergies}>
            <Text style={styles.allergiesTitle}>
              Dina nuvarande allergier är:
            </Text>
            <FlatList
              data={userData.allergy}
              extraData={userData.allergy}
              contentContainerStyle={styles.flatlistAllergy}
              keyExtractor={() => Math.random()}
              renderItem={({ item }) => (
                <Text style={styles.allergiesItem}>{item}</Text>
              )}
            />
          </View>
        )}
      </View>
    </>
  );
}

export default Allergies;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: "center",
    marginVertical: 20,
  },
  allergies: {
    width: "80%",

    marginHorizontal: 30,
    justifyContent: "center",
    alignContent: "center",
  },
  flatlistAllergy: { paddingHorizontal: 10 },
  allergiesTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  allergiesItem: {
    textAlign: "center",
    color: Colors.darkgreen,
    backgroundColor: Colors.darkblue,
    fontWeight: "bold",
    borderRadius: 30,
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    marginVertical: 10,
  },
  textView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: { color: Colors.green, fontWeight: "bold", fontSize: 15, width: "80%" },
  selectAllergy: {
    marginHorizontal: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  dropdown: { borderRadius: 30, paddingHorizontal: 20, height: 50, width: 100 },
  searchinput: { paddingHorizontal: 10 },

  search: {
    padding: 10,
    color: Colors.green,
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "Intermedium",
  },
  indicator: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  selectText: {
    paddingHorizontal: 20,
    fontFamily: "Intermedium",
  },
  selectTextSelected: {
    paddingHorizontal: 20,
    fontFamily: "Intermedium",
    fontSize: 15,
    color: Colors.lightgreen,
  },
  updateButton: {
    padding: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: 2,
    backgroundColor: Colors.darkgreen,
    width: "60%",
    borderRadius: 30,
  },
  updateText: {
    color: "white",
    fontWeight: "bold",
  },

  updateView: {
    marginVertical: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
