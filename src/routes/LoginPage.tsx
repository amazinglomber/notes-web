import React from 'react';
import {  Button, Card, CardContent, Typography } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import { useAuth0 } from '@auth0/auth0-react';
import Spacer from '../components/Spacer/Spacer';
import { useTranslation } from 'react-i18next';

export interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
  const { t } = useTranslation();
  const { loginWithRedirect } = useAuth0();

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
            xs: 1,
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
          <DescriptionIcon sx={{ fontSize: 120, mb: 2 }} />
          <Typography variant="h5" sx={{ mb: 2 }}>{t('login.title')}</Typography>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>{t('login.description')}</Typography>

          <Spacer />
          <Spacer />

          <Button
            size="large"
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleLogInClick}
          >
            {t('login.loginBtn')}
          </Button>
          <Spacer />

        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
