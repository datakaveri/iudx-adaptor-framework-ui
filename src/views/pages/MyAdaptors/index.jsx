import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import styled from 'styled-components';

import Adaptor from './Components/Adaptor';
import { Line } from '../../shared/components/SpecComponents';
import ImageButton from '../../shared/components/ImageButton';

import MyAdaptorsAction from '../../../stores/myAdaptors/MyAdaptorsAction';

const Page = styled.div`
  align-content: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;

function MyAdaptorsPage({ dispatch, allAdaptors }) {
  const [adaptors, setAdaptors] = useState();

  useEffect(() => {
    const headers = {
      username: 'testuser',
      password: 'testuserpassword',
      'Content-Type': 'application/json',
    };
    dispatch(MyAdaptorsAction.requestGetAdaptors(headers));
    setAdaptors(allAdaptors?.adaptors);
  }, []);

  return (
    <Page>
      <div style={{ width: '80%' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'center',
              width: '40%',
            }}>
            <h1>My Adapters</h1>
            <div style={{ width: '50px' }} />
            <ImageButton
              Solid="Solid"
              Text="Create New"
              color="#2D3648"
              hoverColor="white"
              icon="add.png"
              hoverIcon="addGrey.png"
              hoverTextColor="#2D3648"
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search"
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '70%',
            }}>
            <p style={{ margin: '0px', width: '30%', textAlign: 'start' }}>
              <b>Name</b>
            </p>
            <p style={{ margin: '0px', width: '30%', textAlign: 'start' }}>
              <b>Last Used</b>
            </p>
            <p style={{ margin: '0px', width: '30%', textAlign: 'start' }}>
              <b>Status</b>
            </p>
          </div>
          <div />
        </div>
        <Line />
        <Adaptor name="Adapter1" last="27, Jan, 2022, 17:45" status="Running" />
        <Adaptor name="Adapter1" last="27, Jan, 2022, 17:45" status="" />
      </div>
    </Page>
  );
}

MyAdaptorsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  // eslint-disable-next-line react/forbid-prop-types
  // eslint-disable-next-line react/forbid-prop-types
  allAdaptors: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  allAdaptors: state.myAdaptorsReducer.allAdaptors,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAdaptorsPage);
