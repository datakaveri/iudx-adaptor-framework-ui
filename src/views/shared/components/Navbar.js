import React from "react";
import { TextField, Button } from '@mui/material';
import { fontFamily } from "@mui/system";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  makeStyles,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";

const logo=require('./iudx.jpg')

const useStyles = makeStyles((theme) => ({
  navlinks: {
    display: "flex",
    flexdirection:"row",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
    
  },
  link: {
    fontFamily: '"Fira code", "Fira Mono", monospace',
    textDecoration: "none",
    color: "grey",
    fontSize: "15px",
    margin:"15px",
    "&:hover": {
      color: "black",
      borderBottom: "1px solid black",
    },
  },
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" color="grey" elevation={0.3}>
      <CssBaseline />
      <Toolbar>
        <img src={logo} height="80px" width="80px"  alt="iudx"/>
        <Typography className={classes.logo}/> 
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/" className={classes.link}>
              Home
            </Link>
            <Link to="/onboarding" className={classes.link}>
              Onboarding
            </Link>
            <Link to="/adaptors" className={classes.link}>
              My Adaptors
            </Link>
            <Button variant="outlined" size="small" >Login/Register</Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;