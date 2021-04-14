import React from "react";
import './App.css';
import { UserContext } from "./context/UserContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  const [user,setUser] = React.useState(null);
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{user,setUser}}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
