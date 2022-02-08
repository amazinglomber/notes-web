import { createTheme, Palette, ThemeOptions } from "@mui/material";

const theme = (mode: 'light' | 'dark'): ThemeOptions => createTheme(
  {
    palette: {
      mode: mode,
      background: {
        default: mode === 'light' ? '#f6f6f6' : '#333333',
      },
      primary: {
        main: '#a5c8e4',
      },
      secondary: {
        main: '#f50057',
      },
      success: {
        main: '#ccf38d',
      },
      info: {
        main: '#b1d3f3',
      },
      warning: {
        main: '#ffe897',
      },
      error: {
        main: '#ff9191',
      },
    },
    typography: {
      fontFamily: 'Montserrat',
    },
    shape: {
      borderRadius: 10,
    },
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

// declare module '@mui/material/styles' {
//   type PaletteOptions = PaletteOptions & {
//     noteGrey: string,
//     notePurple: string,
//     noteBlue: string,
//     noteLightGreen: string,
//     noteDarkGreen: string,
//     noteYellow: string,
//     noteOrange: string,
//     noteRed: string,
//     notePink: string,
//   }
//
//   interface ThemeOptions {
//     palette?: PaletteOptions,
//   }
// }

export const NoteColors = {
  Grey: '#e3e3e3',
  Purple: '#bec8fa',
  Blue: '#b1d3f3',
  LightGreen: '#ccf38d',
  DarkGreen: '#a4ecce',
  Yellow: '#ffe897',
  Orange: '#ffc961',
  Red: '#ff9191',
  Pink: '#eebcff',
} as {
  [key in NoteColor]: string
};


export default theme;
