import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "../../../features/counter";

const Counting = () => {
  const counts = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const [incrementValue, setIncrementValue] = useState(0);

  const addValue = Number(incrementValue) || 0;
  const resetAll = () => {
    setIncrementValue(0);
    dispatch(reset());
  };

  return (
    <section>
      <p>Counting: {counts}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input
        type="text"
        value={incrementValue}
        onChange={(e) => setIncrementValue(e.target.value)}
      />
      <div>
        <button onClick={() => dispatch(incrementByAmount(addValue))}>
          Increment By Amount
        </button>
        <button onClick={resetAll}>ResetAll</button>
      </div>
    </section>
  );
};

export default Counting;
