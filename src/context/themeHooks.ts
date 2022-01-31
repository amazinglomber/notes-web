import { useContext } from 'react';
import ThemeContext from './ThemeContext';
import { useTheme } from '@mui/material';

const useNotesTheme = () => {
  const theme = useTheme();
  return {...useContext(ThemeContext), theme};
};

export default useNotesTheme;
