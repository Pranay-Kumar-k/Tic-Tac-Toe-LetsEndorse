import React from "react";
import './App.css';
import { UserContext } from "./context/UserContext";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Play from "./components/Play/Play";
import UserAuth from "./components/Auth/UserAuth";

function App() {
  const [user,setUser] = React.useState(null);
  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{user,setUser}}>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/play/:id" component={Play} />
            <Route exact path="/player" component={UserAuth} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;

