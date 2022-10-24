import { Root } from "./App";
import { StatusBar } from "expo-status-bar";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./store/redux/reducers";
import { Provider } from "react-redux";
import { fetchFood } from "./store/redux/actions/fridge.actions";
import AuthContextProvider from "./store/context/auth-context";

const store = configureStore({ reducer: rootReducer });

store.dispatch(fetchFood());

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <Provider store={store}>
        <AuthContextProvider>
          <Root />
        </AuthContextProvider>
      </Provider>
    </>
  );
}
