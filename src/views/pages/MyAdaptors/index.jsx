import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import styled from 'styled-components';

import Adaptor from './Components/Adaptor';
import StyledDiv from './Components/Div';
import { Line } from '../../shared/components/SpecComponents';
import ImageButton from '../../shared/components/ImageButton';

import MyAdaptorsAction from '../../../stores/myAdaptors/MyAdaptorsAction';

const Page = styled.div`
  align-content: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;
function createNewClick() {
  alert('new adaptor created');
}
function MyAdaptorsPage({ dispatch, allAdaptors }) {
  const [adaptors, setAdaptors] = useState();

  useEffect(() => {
    const headers = {
      username: 'testuser24',
      password: 'testuserpassword',
      'Content-Type': 'application/json',
    };
    dispatch(MyAdaptorsAction.requestGetAdaptors(headers));
    setAdaptors(allAdaptors?.adaptors);
    console.log(allAdaptors);
  }, []);

  return (
    <Page>
      <div style={{ width: '80%' }}>
        <StyledDiv>
          <StyledDiv contentJustify="start" width="40%">
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
              onClicked={createNewClick}
            />
          </StyledDiv>
          <div>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search"
            />
          </div>
        </StyledDiv>
        <StyledDiv>
          <StyledDiv width="70%">
            <p style={{ margin: '0px', width: '30%', textAlign: 'start' }}>
              <b>Name</b>
            </p>
            <p style={{ margin: '0px', width: '30%', textAlign: 'start' }}>
              <b>Last Used</b>
            </p>
            <p style={{ margin: '0px', width: '30%', textAlign: 'start' }}>
              <b>Status</b>
            </p>
          </StyledDiv>
          <div />
        </StyledDiv>
        <Line />

        {/* {allAdaptors?.map(item => (
          <Adaptor name={item.name} last={item.last} status={item.status} />
        ))} */}

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
