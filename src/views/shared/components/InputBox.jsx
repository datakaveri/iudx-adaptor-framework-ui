import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Type } from './SpecComponents';

export default function InputBox({ name, id}) {
  return (
    <div style={{ width: '320px' }} className="textbox">
      <Type>{name}</Type>
      <TextField
        style={{ marginLeft: '80px' }}
        id={id}
        variant="outlined"
        size="small"
        fullWidth
       
      />
    </div>
  );
}

InputBox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
};

InputBox.defaultProps = {
  name: PropTypes.string,
  id: PropTypes.string,
};
