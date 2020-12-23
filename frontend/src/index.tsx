import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux';
import App from './App';
import { GlobalStyle } from './styles';
import { ApolloProvider } from '@apollo/client';

import client from './apollo';

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