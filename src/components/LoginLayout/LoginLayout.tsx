import React from 'react';
import {  Button, Card, CardContent, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import Spacer from '../Spacer';
import { useAuth0 } from '@auth0/auth0-react';

export interface LoginLayoutProps {}

const LoginLayout: React.FC<LoginLayoutProps> = () => {
  const { loginWithPopup, loginWithRedirect } = useAuth0();

  const handleLogInClick = () => {
    loginWithRedirect();
  };

  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card
        sx={{
          width: {
            xs: 1, // theme.breakpoints.up('xs')
            sm: 450,
          },
          height: {
            xs: 1,
            sm: 500,
          },
        }}
      >
        <CardContent
          sx={{
            height: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
          }}
        >
          <PersonIcon sx={{ fontSize: 120, mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>Log in</Typography>
          <Typography variant="h6">You have to be logged in to use this app.</Typography>

          <Spacer />

          <Button
            size="large"
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleLogInClick}
          >
            Log in
          </Button>
          {/*<Button variant="text">Create account</Button>*/}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginLayout;
