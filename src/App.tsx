import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import NavigationDrawer from './components/NavigationDrawer/NavigationDrawer';
import NavBar from './components/NavBar';
import { NavBarOffset } from './components/NavBar/NavBar';

function App() {

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      <NavigationDrawer />
      <div>
        <NavBarOffset />
        <Outlet />
      </div>
    </Box>
  );
}

export default App;
