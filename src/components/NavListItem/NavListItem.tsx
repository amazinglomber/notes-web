import React from 'react';
import { ListItem, ListItemProps, styled } from '@mui/material';

export interface NavListItemProps extends ListItemProps{
  selected: boolean;
}

const NavListItem: React.FC<NavListItemProps> = ({ selected, children, ...other }) => {
  return (
    <ListItem
      sx={{

      }}
      {...other}
    >
      {children}
    </ListItem>
  );
};

export default NavListItem;
