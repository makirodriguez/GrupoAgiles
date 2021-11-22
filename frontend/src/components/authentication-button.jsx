import React from 'react';

import LoginButton from '../pages/Login/Login';
import {LogoutButton} from '../pages/Logout/Logout';
import { useAuth0 } from '@auth0/auth0-react';

 const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ?
 
  
  <LogoutButton/> :
  <div>  <LoginButton /> </div>
 
};

export default AuthenticationButton;