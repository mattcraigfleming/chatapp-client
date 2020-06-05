import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Auth/Login";

const Routes = () => {
  const isLoggedIn = () => {
    return localStorage.getItem("authTokens") != null;
  };
  return (
    <Router>
      <Switch>
        {isLoggedIn() && <Route path="/login" component={Login} />}
        <Route
          path="/"
          render={(props) => {
            if (!isLoggedIn()) {
              return <Dashboard {...props} />;
            }
            return <Redirect to="/login" />;
          }}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
