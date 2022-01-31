import React from 'react';
import { Route } from '@mui/icons-material';
import { RouteProps } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import Loading from '../Loading';

export interface ProtectedRouteProps extends RouteProps {
  component: React.FC
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component, children, ...other}) => {

  const Element = withAuthenticationRequired(component, {
    onRedirecting: () => <Loading />,
  });

  return (
    <Route
      element={<Element />}
      {...other}
    >
      {children}
    </Route>
  );
};

export default ProtectedRoute;
