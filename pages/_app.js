import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { store } from '../stores/store';
import SnackbarController from '../components/snackbar'
import '../styles/globals.scss'
import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

function MyApp({ Component, pageProps }) {
  const [ themeConfig, setThemeConfig ] = useState(lightTheme);

  const changeTheme = (dark) => {
    setThemeConfig(dark ? darkTheme : lightTheme)
    localStorage.setItem("yearn.finance-dark-mode", dark ? "dark" : "light");
  }

  useEffect(function() {
    const localStorageDarkMode = window.localStorage.getItem(
      "yearn.finance-dark-mode"
    );
    changeTheme(localStorageDarkMode ? localStorageDarkMode === "dark" : false);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={ themeConfig }>
        <CssBaseline />
        <Component {...pageProps} changeTheme={ changeTheme } />
        <SnackbarController />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
