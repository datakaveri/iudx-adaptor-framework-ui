import { Button } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import ToastsAction from '../../../stores/toasts/ToastsAction';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Home = ({ dispatch }) => {
  const showToast = () => {
    dispatch(
      ToastsAction.add('Notification description.', 'SUCCESS', 'success'),
    );
  };

  return (
    <div>
      <Helmet>
        <title>IUDX Adaptor Framework</title>
      </Helmet>
      <Title>Component styled with styled component!</Title>
      <Button onClick={showToast}>Show Toast</Button>
    </div>
  );
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(Home);
