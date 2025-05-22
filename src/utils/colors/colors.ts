import { ThemeProvider, createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#272727',
    },
  },
});


export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e8e8eF',
    },
  },
});
