
import React from 'react';
import NavBar from '../NavBar';
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import { NavBarOffset } from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      <NavigationDrawer />
      <div style={{ width: '100%' }}>
        <NavBarOffset />
        <Outlet />
      </div>
    </Box>
  );
};

export default Layout;
