import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./components/reduxo/action";


function App() {
  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div className="App">
      <h1>Counter {counter}</h1> 
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      {isLogged ? <div>Valuable Information Restricted without Logging.</div> : ""}
    </div>
  );
}

export default App;
