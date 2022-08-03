import React from 'react';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';

const LoginButton = () => {
  const handleClick = () => {
    console.log('CLICKED LOGIN');
  };

  return (
    <NavLink>
      <Button onClick={handleClick} variant="outlined" size="small">
        Login
      </Button>
    </NavLink>
  );
};

export default LoginButton;
