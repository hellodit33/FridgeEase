import { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  ImageBackground,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import SuggestionItem from "./screens/SuggestionItem";
import SuggestionInput from "./screens/SuggestionInput";
import YearsScreen from "./screens/Shopping";
import BooksOverviewScreen from "./screens/RecipesOverview";
import Recipes from "./screens/Recipes";
import Fridge from "./screens/Fridge";
import Shopping from "./screens/Shopping";

import ToReadContextProvider from "./store/context/toread-context";
import Colors from "./constants/Colors";
import IconButton from "./components/IconButton";

import User from "./screens/User";
import RateItem from "./screens/RateItem";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AuthContextProvider, { AuthContext } from "./store/context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddQuote from "./screens/AddQuote";
import AllQuotes from "./screens/AllQuotes";
import Map from "./screens/Map";
import QuoteDetails from "./screens/QuoteDetails";
import Profile from "./screens/Profile";
import RecipesDetails from "./screens/RecipesDetails";
import RecipesOverview from "./screens/RecipesOverview";
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
  const authCtx = useContext(AuthContext);

  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: Colors.blue },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: Colors.green },
        tabBarActiveTintColor: Colors.green,
        tabBarInactiveTintColor: Colors.green,
        headerRight: () => (
          <View style={styles.headerRight}>
            <IconButton
              icon="person"
              size={20}
              color={Colors.green}
              onPress={() => {
                navigation.navigate("User");
              }}
            />

            <IconButton
              icon="log-out"
              size={20}
              color={Colors.green}
              onPress={authCtx.logout}
            />
          </View>
        ),
      })}
    >
      <BottomTabs.Screen
        name="Recipes"
        component={Recipes}
        options={{
          title: "Recept",
          tabBarLabel: "Recept",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="food" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Fridge"
        component={Fridge}
        options={{
          title: "Mitt kylskåp",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fridge" size={size} color={color} />
          ),
        }}
      ></BottomTabs.Screen>

      <BottomTabs.Screen
        name="Shopping"
        component={Shopping}
        options={{
          title: "Inköpslista",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      ></BottomTabs.Screen>

      <BottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Min sida",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
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
        headerStyle: { backgroundColor: "purple" },
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
        headerStyle: { backgroundColor: Colors.green },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.green },
      }}
    >
      <Stack.Screen
        name="BottomTabss"
        component={BottomNav}
        options={{
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
        name="Map"
        component={Map}
        options={{ title: "Bokklubbens plats" }}
      />
      <Stack.Screen
        name="QuoteDetails"
        component={QuoteDetails}
        options={{ title: "Citatet" }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <ToReadContextProvider>
      <NavigationContainer>
        {!authCtx.isAuthenticated && <AuthStack />}
        {authCtx.isAuthenticated && <AuthenticatedStack />}
      </NavigationContainer>
    </ToReadContextProvider>
  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }
  return <Navigation />;
}
export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    paddingRight: 5,
  },
});
