import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux';
import App from './App';
import { GlobalStyle } from './styles';
import { ApolloProvider } from '@apollo/client';

import client from './apollo';
import { login } from './redux/auth/actions';

if (localStorage.getItem('jwt') && localStorage.getItem('csrf')) {
    const jwt = localStorage.getItem('jwt') as string;
    const csrf = localStorage.getItem('csrf') as string;
    store.dispatch(login(jwt, csrf));
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
