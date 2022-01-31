import React from 'react';
import { AppBar, Toolbar, IconButton, useMediaQuery, styled, Theme, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { drawerWidth } from '../NavigationDrawer/NavigationDrawer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectNavigationDrawerOpened } from '../../store/selectors';
import useNotesTheme from '../../context/themeHooks';
import { appSlice } from '../../store/reducers/appReducer';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const matchesDesktop = useMatchesDesktop();

  const dispatch = useAppDispatch();

  const handleMenuClick = () => {
    dispatch(appSlice.actions.setDrawerOpen(true));
  };

  /**
   * Hides drawer in desktop mode.
   * @param theme
   */
  const calculateZIndex = (theme: Theme) => {
    const drawerZIndex = theme.zIndex.drawer;

    if (matchesDesktop) {
      // apply z index above drawer
      return drawerZIndex + 1;
    }

    return drawerZIndex;
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          bottom: 'auto',
          zIndex: (theme) => calculateZIndex(theme),
        }}
      >
        <Toolbar>
          {!matchesDesktop && (
            <IconButton
              color="inherit"
              onClick={handleMenuClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notes
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export const NavBarOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default NavBar;
