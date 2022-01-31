import React from 'react';
import { InputBase, InputBaseProps, styled, useTheme } from '@mui/material';

const NoteTitleField: React.FC<InputBaseProps> = ({ fullWidth, multiline, onChange, ...other }) => {
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    // Prevent from inserting newline characters.
    event.target.value = event.target.value.replace(/[\r\n\v]+/g, "");

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <InputBase
      sx={{
        ...theme.typography.h5
      }}
      fullWidth={fullWidth ?? true}
      multiline={multiline ?? true}
      onChange={handleChange}
      {...other}
    />
  );
};

export default NoteTitleField;
