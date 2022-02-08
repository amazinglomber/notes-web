
import React from 'react';
import NavBar from '../NavBar';
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import { NavBarOffset } from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const matchesDesktop = useMatchesDesktop();

  return (
    <Box sx={{ display: 'flex' }}>
      {!matchesDesktop && <NavBar />}
      <NavigationDrawer />
      <div style={{ width: '100%' }}>
        {!matchesDesktop && <NavBarOffset />}
        <Outlet />
      </div>
    </Box>
  );
};

export default Layout;
