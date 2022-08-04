import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <Button onClick={handleClick} variant="outlined" size="small">
      Login
    </Button>
  );
};

export default LoginButton;
