import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#d65555',
    },
    secondary: {
      main: '#854c19',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
