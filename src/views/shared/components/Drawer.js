import React, { useState } from 'react';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import MenuIcon from '@mui/icons-material/Menu';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '5px',
  },
  icon: {
    color: 'white',
  },
}));

function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/onboarding" className={classes.link}>
                Onboarding
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/adaptors" className={classes.link}>
                My Adaptors
              </Link>
            </ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Drawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.icon}>
        <MenuIcon />
      </IconButton>
    </>
  );
}
export default DrawerComponent;
