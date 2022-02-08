import { useContext } from 'react';
import ThemeContext from './ThemeContext';
import { useTheme } from '@mui/material';
import { NoteColors } from '../theme';

const useNotesTheme = () => {
  const theme = useTheme();

  return {...useContext(ThemeContext), theme};
};

export default useNotesTheme;
