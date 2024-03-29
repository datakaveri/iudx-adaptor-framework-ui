import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from '@mui/material';

const MenuDialogBox = ({
  openMenu,
  menuOption,
  setOpenMenu,
  setMenuOption,
}) => {
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  const handleChangeMenu = event => {
    setMenuOption(event.target.value);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      open={openMenu}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') {
          return;
        }
        handleCloseMenu();
      }}>
      <DialogTitle>Select an option</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <Select
              labelId="demo-dialog-select-label"
              id="demo-dialog-select"
              value={menuOption}
              onChange={handleChangeMenu}>
              <MenuItem value="etl">ETL</MenuItem>
              <MenuItem value="rules">Rules Engine</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseMenu}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

MenuDialogBox.propTypes = {
  openMenu: PropTypes.bool.isRequired,
  setOpenMenu: PropTypes.func.isRequired,
  menuOption: PropTypes.string.isRequired,
  setMenuOption: PropTypes.func.isRequired,
};

export default MenuDialogBox;
