import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App(): React.ReactElement {
  return (
    <Router>
      <Switch>

        <Route path="/login">
          <Login/>
        </Route>

        <Route path="/register">
          <Register/>
        </Route>

        <Route path="/">
          <Home/>
        </Route>

      </Switch>
    </Router>
  );
}