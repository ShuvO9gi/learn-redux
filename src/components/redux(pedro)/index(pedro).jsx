import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import userTheme from "./components/redux/features/theme";
import userReducer from "./components/redux/features/user";

const store = configureStore({
  reducer: {
    users: userReducer,
    themes: userTheme,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
