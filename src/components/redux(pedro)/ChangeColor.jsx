import { useState } from "react";
import { useDispatch } from "react-redux";
import { themeChange } from "./features/theme";

export default function ChangeColor() {
  const [color, setColor] = useState("");
  const dispatch = useDispatch();

  return (
    <div>
      <input type="text" onChange={(e) => setColor(e.target.value)} />
      <button
        onClick={() => {
          dispatch(themeChange(color));
        }}
      >
        ChangeColor
      </button>
    </div>
  );
}
