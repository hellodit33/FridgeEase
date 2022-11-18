import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import YearGridTile from "../components/YearGridTile.js";
import Colors from "../../constants/Colors.js";
import { useSelector } from "react-redux";
import { useState } from "react";
import IcoButton from "../components/IcoButton.js";
import EditModal from "../components/EditModal.js";

function Shopping({ navigation }) {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  function openModal(item) {
    setModalIsVisible(true);
    console.log(item._id);
    console.log(item.foodName);
    setItemToEdit(item._id);
    console.log(itemToEdit);
  }
  function closeModal() {
    setModalIsVisible(false);
  }
  const userData = useSelector((state) => state.userReducer);
  const fridge = useSelector((state) => state.intoFridgeReducer);
  /*const fridgeNames = fridge.*/
  const userShopping = userData.shoppingList;

  /*    {usersData.map((user) => {
                        for (let i = 0; i < userData.following.length; i++) {
                          if (user._id === userData.following[i]) {
                            return (
                              <li key={user._id}>
                                <img src={user.picture} alt="user-pic" />
                                <h4>{user.pseudo}</h4>
                                <div className="follow-handler">
                                  <FollowHandler
                                    idToFollow={user._id}
                                    type={"suggestion"}
                                  />
                                </div>
                              </li>
                            );
                          }
                        }
                        return null;
                      })} */

  /*const renderShoppingList = () => {
    for (let i = 0; i < userShopping.length; i++) {


        if (userShopping[i] === fridge)}
  };*/

  function renderMyFridge() {
    const editInFridge = (item) => {
      dispatch(
        editFoodFromFridge(
          userData._id,
          item._id,
          item.foodExpiration,
          item.foodQuantity
        )
      );
      dispatch(getUser(userData._id));
      closeModal();
    };
    const deleteInFridge = (item) => {
      dispatch(deleteFoodFromFridge(userData._id, item._id));
      dispatch(getUser(userData._id));
    };

    function renderCarbon({ item }) {
      if (item.foodCarbon > 300) {
        return <Text style={styles.itemCarbon}>B</Text>;
      }
      if (item.foodCarbon <= 300) {
        return <Text style={styles.itemCarbon}>A</Text>;
      }
    }
    const renderFridge = ({ item }) => {
      /*   for (let i = 0; i < userData.usersfood.length; i++) {
        if (userData.usersfood[i] === item._id) */ {
        return (
          <>
            <ScrollView>
              <Pressable onPress={() => handlePressToRecipe(item)}>
                <View style={styles.userFridgeItem}>
                  <View style={styles.userImageView}>
                    <Image
                      style={styles.userImage}
                      source={{
                        uri:
                          "https://raw.githubusercontent.com/hellodit33/FridgeEase/main/assets/logos/" +
                          item.foodLogo,
                      }}
                    ></Image>
                  </View>
                  <View style={styles.itemView}>
                    <Text style={styles.itemName}>{item}</Text>
                  </View>
                  <View style={styles.expView}>
                    <Text style={styles.itemExp}>
                      {item.foodExpiration} dagar
                    </Text>
                  </View>
                  <View style={styles.carbonView}>
                    {/*<Text style={styles.itemCarbon}>{item.foodCarbon} CO2</Text>*/}
                    {renderCarbon({ item })}
                  </View>
                  <View style={styles.editItem}>
                    <IcoButton
                      icon="create-outline"
                      size={24}
                      color={Colors.green}
                      onPress={() => openModal(item)}
                    />
                  </View>

                  <View style={styles.deleteItem}>
                    <IcoButton
                      icon="close-outline"
                      size={24}
                      color={Colors.green}
                      onPress={() => deleteInFridge(item)}
                    />

                    <EditModal
                      visible={modalIsVisible}
                      foodItem={item}
                      onEditFood={() => editInFridge()}
                    />
                  </View>
                </View>
                {/*selectToRecipe.includes(item._id) &&
                  !unselectToRecipe.includes(item._id) && (
                    <View style={styles.overlayToRecipe} />
                  )*/}
              </Pressable>
            </ScrollView>
          </>
        );
      }
    };

    return (
      <FlatList
        data={userData.shoppingList}
        extraData={userData.shoppingList}
        keyExtractor={(item) => Math.random(userData._id)}
        renderItem={renderFridge}
        contentContainerStyle={{}}
      ></FlatList>
    );
  }
  return <View>{renderMyFridge()}</View>;
}

export default Shopping;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.blue,
    margin: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
