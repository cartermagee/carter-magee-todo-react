import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import { MyThemeProvider } from './style-utils/ThemeContext';
import GlobalStyle from './style-utils/globalStyles';
import GlobalFont from './style-utils/fonts/fonts';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <MyThemeProvider>
    <GlobalFont />
    <GlobalStyle />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MyThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
