import React from 'react';
import { InputBase, InputBaseProps, styled } from '@mui/material';

const NoteBodyField = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    ...theme.typography.body1,
  }
}))

export default NoteBodyField;
