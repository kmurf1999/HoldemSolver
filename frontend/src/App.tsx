import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function ProtectedRoute({ component: Component, ...rest }: any): React.ReactElement {
    function isAuthenticated() {
        const jwt = localStorage.getItem('jwt');
        const csrf = localStorage.getItem('csrf');
        return jwt && csrf;
    }
    return (
        <Route {...rest} render={(props) => {
            return isAuthenticated()
                ? <Component {...props}/>
                : <Redirect to="/login"/>
        }}/>
    );
}

export default function App(): React.ReactElement {
  return (
    <Router>
      <Switch>

        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <ProtectedRoute path="/home" component={Home}/>
        <Route path="/" component={Landing}/>
      </Switch>
    </Router>
  );
}
