import "./App.css";
import { UserContextProvider } from "./context/UserContext";
import Router from "./router";

function App() {
  return (
    <div className="h-screen ">
      <UserContextProvider>
        <Router></Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
