import ChangeColor from "./components/redux/ChangeColor";
import Login from "./components/redux/Login";
import Profile from "./components/redux/Profile";

function App() {
  return (
    <div className="App">
      <Profile />
      <Login />
      <ChangeColor />
    </div>
  );
}

export default App;
