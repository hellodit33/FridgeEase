import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  faHouseChimneyUser,
  faUtensils,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { StyleSheet } from "react-native";
import Colors from "./constants/Colors";
import Shopping from "./src/screens/Shopping";
import Recipes from "./src/screens/Recipes";
import RecipeInDetail from "./src/screens/RecipeInDetail";

import User from "./src/screens/User";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import FavoriteRecipes from "./src/screens/FavoriteRecipes";
import Header from "./src/components/Header";
import Diets from "./src/screens/Diets";

import Allergies from "./src/screens/Allergies";
import LoadingOverlay from "./src/UI/LoadingOverlay";
import { AuthContext, AuthProvider } from "./src/components/AppContext";
import { getUser } from "./store/redux/actions/user.actions";
import { useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "Fridge Ease",
        headerShown: false,
        headerStyle: { backgroundColor: Colors.blue },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.blue },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Logga in" }}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function BottomNav() {
  // const authCtx = useContext(AuthContext);

  return (
    <BottomTabs.Navigator
      initialRouteName="MyFridge"
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",

        headerStyle: { backgroundColor: Colors.blue },

        tabBarStyle: {
          backgroundColor: Colors.blue,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 12,
        },
        contentStyle: { backgroundColor: Colors.blue },

        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: Colors.green,
        tabBarActiveBackgroundColor: Colors.darkblue,
      })}
    >
      <BottomTabs.Screen
        name="MyFridge"
        component={MyFridge}
        options={{
          title: "Mitt kylskåp",
          contentStyle: { backgroundColor: Colors.blue },

          headerTitle: () => <Header title="Mitt kylskåp" />,
          headerStyle: { backgroundColor: Colors.blue },
          tabBarIcon: () => (
            <FontAwesomeIcon
              icon={faHouseChimneyUser}
              color={Colors.green}
              size={24}
            />
          ),
        }}
      ></BottomTabs.Screen>
      <BottomTabs.Screen
        name="Recipes"
        component={Recipes}
        options={{
          title: "Mina recept",
          contentStyle: { backgroundColor: Colors.blue },

          headerTitle: () => <Header title="Mina recept" />,
          tabBarIcon: () => (
            <FontAwesomeIcon icon={faUtensils} color={Colors.green} size={24} />
          ),
        }}
      />

      <BottomTabs.Screen
        name="Shopping"
        component={Shopping}
        options={{
          contentStyle: { backgroundColor: Colors.blue },

          title: "Min inköpslista",

          headerTitle: () => <Header title="Min inköpslista" />,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faCartShopping}
              color={Colors.green}
              size={24}
            />
          ),
        }}
      ></BottomTabs.Screen>

      <BottomTabs.Screen
        name="Profile"
        component={User}
        options={{
          title: "Min profil",
          contentStyle: { backgroundColor: Colors.blue },

          headerTitle: () => <Header title="Min sida" />,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={Colors.green} size={24} />
          ),
        }}
      ></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.blue },
        cardStyle: { height: "100%" },

        contentStyle: { backgroundColor: Colors.blue },
      }}
    >
      <Stack.Screen
        name="BottomTabss"
        component={BottomNav}
        options={{
          headerStyle: { backgroundColor: Colors.blue },
          headerShown: false,
        }}
      />

      <Stack.Screen name="RecipeInDetail" component={RecipeInDetail} />

      <Stack.Screen
        name="FavoriteRecipes"
        component={FavoriteRecipes}
        options={{
          title: "Mina favoritrecept",
          headerTitle: () => <Header title="Mina favoritrecept" />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Diets"
        component={Diets}
        options={{
          title: "Min kost",
          headerTitle: () => <Header title="Min kost" />,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Allergies"
        component={Allergies}
        options={{
          title: "Mina allergier",
          headerTitle: () => <Header title="Mina allergier" />,
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isLoading, userToken, uid } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(uid);
    console.log("hello");
    if (uid) {
      dispatch(getUser(uid));
    }
  }, [uid]);

  if (isLoading) {
    return <LoadingOverlay message="Ge oss en kort stund..." />;
  }

  return (
    <NavigationContainer>
      {userToken !== null ? (
        <FavoritesContextProvider>
          <AuthenticatedStack />
        </FavoritesContextProvider>
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
}

function Root() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
import { fetchFood } from "./store/redux/actions/fridge.actions";
import { Provider } from "react-redux";
import rootReducer from "./store/redux/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { StatusBar } from "expo-status-bar";
import { fetchRecipes } from "./store/redux/actions/recipe.actions";
import FavoritesContextProvider from "./store/context/favorites-context";
import FlashMessage from "react-native-flash-message";
import MyFridge from "./src/screens/MyFridge";

const store = configureStore({ reducer: rootReducer });

store.dispatch(fetchFood());
store.dispatch(fetchRecipes());

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <Provider store={store}>
        <Root />
        <FlashMessage position="top" />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.blue,
  },
});
