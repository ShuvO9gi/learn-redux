import { useDispatch } from "react-redux";
import { login, logout } from "./features/user";

export default function Login() {
  //useDispatch hook used to access the modifiying value of state
  const dispatch = useDispatch();

  return (
    <>
      <button
        onClick={() =>
          dispatch(login({ name: "Redux", age: 16, email: "learn@redux.com" }))
        }
      >
        Login
      </button>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </>
  );
}
