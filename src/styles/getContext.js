/* eslint-disable no-underscore-dangle */

import { create, SheetsRegistry } from 'jss';
import preset from 'jss-preset-default';
import { createMuiTheme } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';

const black = {
  50: '#e0e0e0',
  100: '#b3b3b3',
  200: '#808080',
  300: '#4d4d4d',
  400: '#262626',
  500: '#000000',
  600: '#000000',
  700: '#000000',
  800: '#000000',
  900: '#000000',
  A100: '#a6a6a6',
  A200: '#8c8c8c',
  A400: '#737373',
  A700: '#666666',
  contrastDefaultColor: 'light',
};

const theme = createMuiTheme({
  palette: {
    primary: black,
    secondary: green,
  },
  typography: {
    fontFamily: "'Roboto Mono', monospace",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    display1: {
      fontSize: '2.125rem',
      fontWeight: 400,
      fontFamily: "'Roboto Mono', monospace",
      lineHeight: '1.20588em',
      marginLeft: '-.04em',
      color: '#034694',
    },
    headline: {
      fontSize: '.5rem',
      fontWeight: 400,
      fontFamily: "'Roboto Mono', monospace",
      lineHeight: '.35417em',
      color: 'rgba(255, 255, 255, 0.87)',
    },
    title: {
      fontSize: '.3125rem',
      fontWeight: 500,
      fontFamily: "'Roboto Mono', monospace",
      lineHeight: '.16667em',
      color: 'rgba(255, 255, 255, 0.87)',
    },
    subheading: {
      fontSize: 'rem',
      fontWeight: 400,
      fontFamily: "'Roboto Mono', monospace",
      lineHeight: '.5em',
      color: 'rgba(255, 255, 255, 0.87)',
    },
    body2: {
      fontSize: '.89rem',
      fontWeight: 500,
      fontFamily: "'Roboto Mono', monospace",
      lineHeight: '1.49em',
      color: 'rgba(255, 255, 255, 0.87)',
    },
    body1: {
      fontSize: '.875rem',
      fontWeight: 400,
      fontFamily: "'Roboto Mono', monospace",
      lineHeight: '.46429em',
      color: 'rgba(255, 255, 255, 0.87)',
    },
    caption: {
      fontSize: '.75rem',
      fontWeight: 400,
      fontFamily: "'Roboto Mono', monospace",
      lineHeight: '.375em',
      color: 'rgba(255, 255, 255, 0.54)',
    },
  },
});

// Configure JSS
const jss = create(preset());
jss.options.createGenerateClassName = createGenerateClassName;

const createContext = () => ({
  jss,
  theme,
  sheetsManager: new Map(),
  sheetsRegistry: new SheetsRegistry(),
});

export default () => {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext();
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext();
  }

  return global.__INIT_MATERIAL_UI__;
};
