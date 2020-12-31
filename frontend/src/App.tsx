import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { RootState } from './redux';

import Landing from './pages/Landing';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import Footer from './components/Footer';
import Nav from './components/Nav';

function ProtectedRoute({ isLoggedIn, component: Component, ...rest }: any): React.ReactElement {
    return (
        <Route {...rest} render={(props) => {
            return isLoggedIn
                ? <Component {...props}/>
                : <Redirect to="/login"/>
        }}/>
    );
}

function mapStateToProps(state: RootState) {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
}

const connector = connect(mapStateToProps, null);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function App(props: Props): React.ReactElement {
  const { isLoggedIn } = props;
  return (
    <Router>
      <Nav/>
        <main>
            <Switch>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <ProtectedRoute isLoggedIn={isLoggedIn} path="/home" component={Home}/>
              <Route path="/" component={Landing}/>
            </Switch>
        </main>
      <Footer/>
    </Router>
  );
}

export default connector(App);
