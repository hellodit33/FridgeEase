import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import {
  faHouseChimneyUser,
  faUtensils,
  faCartShopping,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Dimensions,
  Image,
} from "react-native";
import Colors from "./constants/Colors";

import SuggestionItem from "./src/screens/SuggestionItem";
import SuggestionInput from "./src/screens/SuggestionInput";
import Shopping from "./src/screens/Shopping";
import RecipesOverview from "./src/screens/RecipesOverview";
import Recipes from "./src/screens/Recipes";
import Fridge from "./src/screens/Fridge";

//import FavoritesContextProvider from "./store/context/favorites-context";
import IconButton from "./src/components/IcoButton";

import User from "./src/screens/User";
import RateItem from "./src/screens/RateItem";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import AddQuote from "./src/screens/AddQuote";
import AllQuotes from "./src/screens/AllQuotes";
import Map from "./src/screens/Map";
import QuoteDetails from "./src/screens/QuoteDetails";
import FavoriteRecipes from "./src/screens/FavoriteRecipes";
import RecipesDetails from "./src/screens/RecipesDetails";
import Header from "./src/components/Header";
import FoodDetails from "./src/components/FoodDetails";
import Diets from "./src/screens/Diets";

import Allergies from "./src/screens/Allergies";
import LoadingOverlay from "./src/UI/LoadingOverlay";
import {
  AuthContext,
  AuthProvider,
  UidContext,
} from "./src/components/AppContext";
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
      initialRouteName="Fridge"
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",

        headerStyle: { backgroundColor: Colors.blue },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.blue },
        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: Colors.green,
        tabBarActiveBackgroundColor: Colors.darkblue,
      })}
    >
      <BottomTabs.Screen
        name="Fridge"
        component={Fridge}
        options={{
          title: "Mitt kylskåp",
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

          headerTitle: () => <Header title="Min sida" />,
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} color={Colors.green} size={24} />
          ),
        }}
      ></BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
}
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.blue },
        headerTintColor: "grey",
        sceneContainerStyle: { backgroundColor: "white" },
        drawerContentStyle: { backgroundColor: "white" },
        drawerInactiveTintColor: "purple",
        drawerActiveTintColor: "black",
        drawerActiveBackgroundColor: "purple",
      }}
    >
      <Drawer.Screen
        name="Shopping"
        component={Shopping}
        options={{
          title: "Inköpslista",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size}></Ionicons>
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Min sida",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size}></Ionicons>
          ),
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.blue },

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

      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="RecipesOverview" component={RecipesOverview} />
      <Stack.Screen name="RecipesDetails" component={RecipesDetails} />

      <Stack.Screen
        name="RateItem"
        component={RateItem}
        options={{ presentation: "modal", title: "Ge ett betyg" }}
      />
      <Stack.Screen
        name="AddQuote"
        component={AddQuote}
        options={{ title: "Lägg till ett foto på ett citat" }}
      />
      <Stack.Screen
        name="AllQuotes"
        component={AllQuotes}
        options={({ navigation }) => ({
          title: "Se alla citat",
          headerRight: () => (
            <IconButton
              icon="add"
              size={24}
              color={"white"}
              onPress={() => navigation.navigate("AddQuote")}
            />
          ),
        })}
      />

      <Stack.Screen
        name="QuoteDetails"
        component={QuoteDetails}
        options={{ title: "Citatet" }}
      />

      <Stack.Screen
        name="FavoriteRecipes"
        component={FavoriteRecipes}
        options={{ title: "Mina favoritrecept" }}
      />
      <Stack.Screen
        name="Diets"
        component={Diets}
        options={{ title: "Mina dieter" }}
      />
      <Stack.Screen
        name="Allergies"
        component={Allergies}
        options={{ title: "Mina allergier" }}
      />

      <Stack.Screen
        name="FoodDetails"
        component={FoodDetails}
        options={{ title: "Food Details" }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingOverlay message="Vänta" />;
  }
  /* const authCtx = useContext(AuthContext);*/
  /* const [uid, setUid] = useState(null);

  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    const tokenJson = await token.toString();

    await setUid(tokenJson);
    console.log(tokenJson);
    console.log("true");
  };

  loadProfile();

  /* 
  const [login, setLogIn] = useState(false);
  const dispatch = useDispatch();

  const fetchToken = async () => {
    

const token = await AsyncStorage.getItem("token")

      .then(() => {
        setUid(token);
        console.log(uid);
        console.log("hello");
      })
      .catch((err) => console.log("No token"));
  };
  useEffect(() => {
    fetchToken();
    if (uid) {
      setLogIn(true);
    }
  }, [uid]);
  /* const fetchToken = async () => {
      await axios({
        method: "get",
        url: "https://f56e-213-163-151-83.eu.ngrok.io",
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
          console.log(uid);
          console.log("hello");
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
    if (uid) {
      dispatch(getUser(uid));
      setLogIn(true);
    }
  }, [uid, dispatch]);*/
  return (
    <NavigationContainer>
      {userToken !== null ? <AuthenticatedStack /> : <AuthStack />}

      {/*!authCtx.isAuthenticated && <AuthStack />*/}
    </NavigationContainer>
  );
}

function Root() {
  /* const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
        console.log(authCtx);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, [authCtx]);
  if (isTryingLogin) {
    return <LoadingOverlay />;
  }*/
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

const store = configureStore({ reducer: rootReducer });

store.dispatch(fetchFood());

export default function App() {
  return (
    <>
      <StatusBar style="dark" />

      <Provider store={store}>
        <Root />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.blue,
  },
});
