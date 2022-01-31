import React, { useEffect } from 'react';
import { Box, Toolbar } from '@mui/material';
import { Outlet, useRoutes } from 'react-router-dom';
import NavigationDrawer from './components/NavigationDrawer/NavigationDrawer';
import NavBar from './components/NavBar';
import { NavBarOffset } from './components/NavBar/NavBar';
import { useAuth0 } from '@auth0/auth0-react';
import routes from './routes';
import { useAppDispatch } from './store/hooks';
import appReducer, { appSlice } from './store/reducers/appReducer';

const App = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const routing = useRoutes(routes(isAuthenticated));

  const dispatch = useAppDispatch();

  useEffect(() => {
    getAccessTokenSilently()
      .then((token) => {
        dispatch(appSlice.actions.setAuthToken(token));
      });
  }, []);

  return (
    <>
      {routing}
    </>
  );
}

export default App;
