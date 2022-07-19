import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import styled from 'styled-components';
import { Type } from './SpecComponents';

const TextBox = styled.div`
  width: 320px;
`;

export default function InputBox({ name, id }) {
  return (
    <TextBox>
      <Type>{name}</Type>
      <TextField
        style={{ marginLeft: '80px' }}
        id={id}
        variant="outlined"
        size="small"
        fullWidth
      />
    </TextBox>
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
