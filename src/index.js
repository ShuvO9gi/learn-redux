import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "./App";
import store from "./components/redux(davegray)/app/store";
import { fetchPost } from "./components/redux(davegray)/features/posts/postsSlice";
import { fetchUsers } from "./components/redux(davegray)/features/user/userSlice";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

store.dispatch(fetchPost()); //used to show the post for all the time for page loading

store.dispatch(fetchUsers()); //this is used here because we want to show the users when the page load first

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
