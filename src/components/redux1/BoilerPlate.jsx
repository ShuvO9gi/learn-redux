/* import { createStoreHook } from "react-redux";

//ACTION INCREMENT
const increment = () => {
  return {
    type: "INCREMENT"
  };
}
const decrement = () => {
  return {
    type: "DECREMENT"
  };
}

//REDUCER
const counter = (state = 0, action) => {
    switch(action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state;
    }
}

let store = createStoreHook(counter);

//display it in the console
store.subscribe(() => console.log(store.getState()));

//DISPATCH
store.dispatch(increment());
store.dispatch(decrement()); */