import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home/home";
import Header from "./components/header/header";
import Profile from "./pages/profile";
import Proyecto from "./pages/proyecto";

export default function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/proyecto" exact>
          <Proyecto />
        </Route>
      </Switch>
    </Router>
  );
}
