import { createTheme, ThemeOptions } from "@mui/material";

const theme = (mode: 'light' | 'dark'): ThemeOptions => createTheme(
  {
    palette: {
      mode: mode,
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#f50057',
      },
    },
    // shape: {
    //   borderRadius: 0,
    // },
    components: {
      // MuiCard: {
      //   styleOverrides: {
      //     root: {
      //       border: '3px solid black',
      //       // borderRadius: '12px',
      //       boxShadow: 'none'
      //     }
      //   }
      // }
    }
  }
);

export default theme;
