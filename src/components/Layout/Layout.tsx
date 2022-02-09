
import React, { useEffect } from 'react';
import NavBar from '../NavBar';
import NavigationDrawer from '../NavigationDrawer/NavigationDrawer';
import { NavBarOffset } from '../NavBar/NavBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import useMatchesDesktop from '../../hooks/useMatchesDesktop';
import { appSlice } from '../../store/reducers/appReducer';
import { useAppDispatch } from '../../store/hooks';
import { useAuth0 } from '@auth0/auth0-react';

export interface LayoutProps {}

const Layout: React.FC<LayoutProps> = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const matchesDesktop = useMatchesDesktop();

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        dispatch(appSlice.actions.setAuthToken(token));
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);

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
