import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

export const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'dev-s24evrct.us.auth0.com';
  const clientId = '62eGWhkXlfDidOnfsCIgOk7wGalRpxGi';

  const history = useHistory();

 const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  }; 

  const url = 'http://localhost:3000/home';

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={url}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};


