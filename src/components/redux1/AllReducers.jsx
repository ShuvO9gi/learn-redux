import { combineReducers } from "redux";
import counterReducer from "./Counter";
import loggedReducer from "./isLogged";

const allReducers = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer
});

export default allReducers;