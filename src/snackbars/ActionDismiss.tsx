import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export interface ActionDismissProps {
  onClick: () => void,
}

const ActionDismiss: React.FC<ActionDismissProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick} color="inherit">
      <CloseIcon />
    </IconButton>
  );
};

export default ActionDismiss;
