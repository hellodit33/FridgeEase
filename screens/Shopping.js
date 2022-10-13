import { FlatList, StyleSheet, View } from "react-native";
import YearGridTile from "../components/YearGridTile.js";
import { YEARS } from "../data/data.js";

function Shopping({ navigation }) {
  function renderYearItem(itemData) {
    function pressHandler() {
      navigation.navigate("BooksOverview", {
        categoryId: itemData.item.id,
        year: itemData.item.year,
      });
    }
    return (
      <YearGridTile
        year={itemData.item.year}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }
  return (
    <>
      <View style={styles.yearsContainer}>
        <FlatList
          data={YEARS}
          keyExtractor={(item) => item.id}
          renderItem={renderYearItem}
          numColumns={2}
        ></FlatList>
      </View>
    </>
  );
}

export default Shopping;

const styles = StyleSheet.create({
  yearsContainer: {
    backgroundColor: "black",
  },
});
