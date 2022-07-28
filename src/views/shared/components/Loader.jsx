import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
`;

const LoaderMessage = styled.h5`
  font-family: 'Inter';
`;
const Loader = ({ open, message }) => (
  <Backdrop
    open={open}
    sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}>
    <Flex>
      <CircularProgress color="inherit" />
      <LoaderMessage>{message}</LoaderMessage>
    </Flex>
  </Backdrop>
);

Loader.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default Loader;
