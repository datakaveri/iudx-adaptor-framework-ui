import React, { useContext } from 'react';
import { Button } from '@mui/material';
import AuthApi from '../../../utilities/AuthApi';

const LogoutButton = () => {
  const Auth = useContext(AuthApi);
  const handleClick = () => {
    Auth.setAuth(false);
  };

  return (
    <Button onClick={handleClick} variant="outlined" size="small">
      Logout
    </Button>
  );
};

export default LogoutButton;
