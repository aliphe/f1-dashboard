import { createMuiTheme } from '@material-ui/core';
import { blue, red } from '@material-ui/core/colors';

export default createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});
