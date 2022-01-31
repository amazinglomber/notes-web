import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';

export interface AuthProviderProps {}

const domain = process.env.REACT_APP_AUTH0_DOMAIN;

if (!domain) {
  throw new Error('No Auth0 domain.');
}

const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

if (!clientId) {
  throw new Error('No Auth0 client id.');
}

const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

if (!audience) {
  throw new Error('No Auth0 audience.');
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      useRefreshTokens={true}
      cacheLocation="localstorage"
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
