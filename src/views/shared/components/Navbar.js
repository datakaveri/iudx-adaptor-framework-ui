import React from 'react';
import {
  Button,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { NavLink } from 'react-router-dom';
import DrawerComponent from './Drawer';

const logo = require('./iudx.jpg');

const useStyles = makeStyles(() => ({
  navlinks: {
    display: 'flex',
    flexdirection: 'row',
  },
  logo: {
    flexGrow: '1',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: 'grey',
    fontSize: '15px',
    margin: '15px',
    '&:hover': {
      color: 'black',
      borderBottom: '1px solid black',
    },
    '&.active': {
      color: 'black',
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AppBar position="static" color="grey" elevation={0.3}>
      <CssBaseline />
      <Toolbar>
        <img src={logo} height="80px" width="80px" alt="iudx" />
        <Typography className={classes.logo} />
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <NavLink to="/" className={classes.link}>
              Home
            </NavLink>
            <NavLink to="/onboarding" className={classes.link}>
              Onboarding
            </NavLink>
            <NavLink to="/myadaptors" className={classes.link}>
              My Adaptors
            </NavLink>
            <Button variant="outlined" size="small">
              Login/Register
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
