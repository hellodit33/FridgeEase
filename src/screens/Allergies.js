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
import { updateDiet } from "../../store/redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
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
function Allergies(props) {
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const onSelectedItemsChange = (selectedAllergies) => {
    // Set Selected Items
    setSelectedAllergies(selectedAllergies);
  };

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
            color={Colors.darkpink}
            size={40}
          />
          <Text style={styles.text}>
            Här kan du fylla i dina allergier så att du bara får upp recept som
            inte innehåller det du inte kan äta. Det går alltid att ändra dessa
            allergier.
          </Text>
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
            searchInputPlaceholderText="Sök din allergi"
            searchInputStyle={styles.search}
            selectedItemTextColor={Colors.lightgreen}
            selectedItemIconColor={Colors.lightgreen}
            itemTextColor={Colors.darkgreen}
            displayKey="name"
            styleDropdownMenuSubsection={styles.dropdown}
            submitButtonColor={Colors.green}
            submitButtonText="Uppdatera dina allergier"
            styleInputGroup={styles.searchinput}
            styleTextDropdown={styles.selectText}
            styleTextDropdownSelected={styles.selectTextSelected}
          />
        </View>
        <View style={styles.allergies}>
          <FlatList
            data={selectedAllergies}
            extraData={selectedAllergies}
            contentContainerStyle={styles.flatlistAllergy}
            keyExtractor={() => Math.random()}
            renderItem={({ item }) => (
              <Pressable>
                <Text style={styles.allergiesItem}>{item}</Text>
              </Pressable>
            )}
          />
        </View>
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
    height: "100%",

    marginHorizontal: 30,
    justifyContent: "center",
    alignContent: "center",
  },
  flatlistAllergy: { paddingHorizontal: 10 },
  allergiesItem: {
    textAlign: "center",
    color: "white",
    backgroundColor: Colors.green,
    fontWeight: "bold",
    borderRadius: 30,
    padding: 10,
    borderColor: Colors.lightblue,
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
});
