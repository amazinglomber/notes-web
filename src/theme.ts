import { createTheme, Palette, PaletteColorOptions, ThemeOptions } from "@mui/material";

const defaultTheme = createTheme();

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

const theme = (mode: 'light' | 'dark'): ThemeOptions => createTheme(
  {
    palette: {
      mode: mode,
      background: {
        default: mode === 'light' ? '#f6f6f6' : '#121212',
      },
      primary: { main: '#b1d3f3' },
      secondary: { main: '#f50057' },
      success: { main: '#ccf38d' },
      info: { main: '#b1d3f3' },
      warning: { main: '#ffe897' },
      error: { main: '#ff9191' },
      noteGrey: defaultTheme.palette.augmentColor({
        color: { main: NoteColors.Grey },
        name: 'noteGrey'
      }),
      notePurple: defaultTheme.palette.augmentColor({
        color: { main: NoteColors.Purple },
        name: 'noteGrey'
      }),
      noteBlue: defaultTheme.palette.augmentColor({
        color: { main: NoteColors.Blue },
        name: 'noteGrey'
      }),
      noteLightGreen: defaultTheme.palette.augmentColor({
        color: { main: NoteColors.LightGreen },
        name: 'noteGrey'
      }),
      noteDarkGreen: defaultTheme.palette.augmentColor({
        color: { main: NoteColors.DarkGreen },
        name: 'noteGrey'
      }),
      noteYellow: defaultTheme.palette.augmentColor({
        color: { main: NoteColors.Yellow },
        name: 'noteGrey'
      }),
      noteOrange: defaultTheme.palette.augmentColor({
        color: { main: NoteColors.Orange },
        name: 'noteGrey'
      }),
      noteRed: defaultTheme.palette.augmentColor({
        color: { main: NoteColors.Red },
        name: 'noteGrey'
      }),
      notePink: defaultTheme.palette.augmentColor({
        color: { main: NoteColors.Pink },
        name: 'noteGrey'
      }),
    },
    typography: {
      fontFamily: 'Montserrat',
    },
    shape: {
      borderRadius: 10,
    },
  }
);

export default theme;

declare module '@mui/material/styles' {
  interface Palette {
    noteGrey: Palette['primary'],
    notePurple: Palette['primary'],
    noteBlue: Palette['primary'],
    noteLightGreen: Palette['primary'],
    noteDarkGreen: Palette['primary'],
    noteYellow: Palette['primary'],
    noteOrange: Palette['primary'],
    noteRed: Palette['primary'],
    notePink: Palette['primary'],
  }

  interface PaletteOptions {
    noteGrey: PaletteOptions['primary'],
    notePurple: PaletteOptions['primary'],
    noteBlue: PaletteOptions['primary'],
    noteLightGreen: PaletteOptions['primary'],
    noteDarkGreen: PaletteOptions['primary'],
    noteYellow: PaletteOptions['primary'],
    noteOrange: PaletteOptions['primary'],
    noteRed: PaletteOptions['primary'],
    notePink: PaletteOptions['primary'],
  }
}
