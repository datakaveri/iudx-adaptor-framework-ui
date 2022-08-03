import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import styled from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthApi from '../../../utilities/AuthApi';
import ToastsAction from '../../../stores/toasts/ToastsAction';

const theme = createTheme();

const logo = require('../../shared/components/iudx.jpg');

const Logo = styled.img`
  height: 80px;
  width: 80px;
  alt: iudx;
`;

const Login = ({ dispatch }) => {
  const Auth = useContext(AuthApi);

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const creds = {
      username: data.get('username'),
      password: data.get('password'),
    };

    if (
      creds.username === 'testuser' ||
      creds.password === 'testuserpassword'
    ) {
      Auth.setAuth(true);
      Cookies.set('user', 'loginTrue');
    } else {
      dispatch(
        ToastsAction.add('Invalid username / password', 'SUCCESS', 'success'),
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <Logo src={logo} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              name="username"
              autoComplete="Username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
