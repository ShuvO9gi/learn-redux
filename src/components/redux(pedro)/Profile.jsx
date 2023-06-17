import { useSelector } from "react-redux";

export default function Profile() {
  //useSelector hook used for accessing the value of state
  const user = useSelector((state) => state.users.value);
  const themeColor = useSelector((state) => state.themes.value);

  return (
    <div style={{ color: themeColor }}>
      <h1>Profile Page</h1>
      <div>Name: {user.name}</div>
      <div>Age: {user.age}</div>
      <div>Email: {user.email}</div>
    </div>
  );
}
