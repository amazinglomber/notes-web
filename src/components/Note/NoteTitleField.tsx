import React from 'react';
import { InputBase, InputBaseProps, styled } from '@mui/material';

const NoteTitleField = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    ...theme.typography.h4
  }
}))

export default NoteTitleField;
