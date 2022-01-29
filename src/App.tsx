import React from 'react';
import { Box, Button, Container, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, ThemeProvider } from '@mui/material';
import theme from './theme';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import NavigationDrawer from './components/NavigationDrawer/NavigationDrawer';

function App() {

  return (
    <Box sx={{ display: 'flex' }}>
      <NavigationDrawer />
      <Outlet />
    </Box>
  );
}

export default App;
