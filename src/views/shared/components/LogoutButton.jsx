import React, { useContext } from 'react';
import { Button } from '@mui/material';
import Cookies from 'js-cookie';
import AuthApi from '../../../utilities/AuthApi';

const LogoutButton = () => {
  const Auth = useContext(AuthApi);
  const handleClick = () => {
    Auth.setAuth(false);
    Cookies.remove('user');
    Cookies.remove('password');
  };

  return (
    <Button onClick={handleClick} variant="outlined" size="small">
      Logout
    </Button>
  );
};

export default LogoutButton;
