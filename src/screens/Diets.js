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
import { getUser, updateDiet } from "../../store/redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { showMessage, hideMessage } from "react-native-flash-message";
import UpdateButton from "../UI/UpdateButton";

function Diets(props) {
  const items = [
    {
      id: "1",
      name: "Vegetarisk",
    },
    {
      id: "2",
      name: "Vegansk",
    },
    {
      id: "3",
      name: "Glutenfritt",
    },
    {
      id: "4",
      name: "LCHF",
    },
    {
      id: "5",
      name: "Pescetariansk",
    },
  ];
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [selectedDiets, setSelectedDiets] = useState([]);

  const onSelectedItemsChange = (selectedDiets) => {
    // Set Selected Items
    setSelectedDiets([...selectedDiets], selectedDiets);
    console.log(selectedDiets);
  };

  function updateDiets() {
    showMessage({
      duration: 4000,
      message: "Din kost är nu uppdaterad",
      backgroundColor: Colors.green,
      color: "white",
    });
    dispatch(updateDiet(userData._id, selectedDiets));
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
            Här kan du fylla i din kost så att du bara får upp recept som passar
            just din kost i vår app. Det går alltid att justera din kost ifall
            du ändrar dig.
          </Text>
        </View>
        <UpdateButton onPress={() => updateDiets()}>
          Uppdatera din kost
        </UpdateButton>

        <View style={styles.selectDiet}>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="name"
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedDiets}
            fontFamily="Intermedium"
            itemFontFamily="Interlight"
            fontSize={17}
            itemFontSize={17}
            selectText="Välj din kost"
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor={Colors.green}
            tagBorderColor={Colors.green}
            tagTextColor={Colors.green}
            searchInputPlaceholderText="Sök din kost"
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

        {userData.diet.length > 0 && (
          <View style={styles.diets}>
            <Text style={styles.dietsTitle}>Din nuvarande kost:</Text>
            <FlatList
              data={userData.diet}
              extraData={userData.diet}
              contentContainerStyle={styles.flatlistDiet}
              keyExtractor={() => Math.random()}
              renderItem={({ item }) => (
                <Text style={styles.dietsItem}>{item}</Text>
              )}
            />
          </View>
        )}
      </View>
    </>
  );
}

export default Diets;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignContent: "center",
    marginVertical: 20,
  },
  diets: {
    width: "80%",

    marginHorizontal: 30,
    justifyContent: "center",
    alignContent: "center",
  },
  flatlistDiet: { paddingHorizontal: 10 },
  dietsTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
  },
  dietsItem: {
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
  selectDiet: {
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
