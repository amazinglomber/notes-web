import React, { createContext, useState } from 'react';
import { ThemeProvider } from '@mui/material';
import theme from '../theme';

interface IThemeContext {
  mode: 'light' | 'dark';
  toggleDark: () => void;
}

/**
 * Loads theme mode from localstorage, if null returns light by default.
 * Prevents users from changing that field manually.
 */
const loadModeFromLocalStorage = (): IThemeContext['mode'] => {
  let mode = localStorage.getItem('mode') ?? 'light';
  if (!['light', 'dark'].includes(mode)) {
    mode = 'light;'
  }

  return mode as 'light' | 'dark';
}

const saveModeToLocalStorage = (mode: IThemeContext['mode']) => {
  localStorage.setItem('mode', mode);
};

const initialState: IThemeContext = {
  mode: loadModeFromLocalStorage(),
  toggleDark: () => {},
};

const ThemeContext = createContext<IThemeContext>(initialState);

export const NotesThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>(initialState.mode);

  const toggleDark = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';

    setMode(newMode);
    saveModeToLocalStorage(newMode);
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleDark }}>
      <ThemeProvider theme={theme(mode)}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
