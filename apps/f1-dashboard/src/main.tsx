import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { ConnectedRouter } from 'connected-react-router';

import App from './app/app';
import store from './app/store';
import { history } from './app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
