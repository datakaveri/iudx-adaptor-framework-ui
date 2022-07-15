import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Adaptor from './Components/Adaptor';
import { Line } from '../../shared/components/SpecComponents';
import ImageButton from '../../shared/components/ImageButton';

import { selectAdaptors } from '../../../selectors/adaptor/AdaptorSelector';
import AdaptorAction from '../../../stores/adaptor/AdaptorAction';

const Page = styled.div`
  align-content: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Tab = styled.div`
  margin: 0px;
  width: 25%;
  text-align: start;
`;

const MyAdaptorsPage = ({ dispatch, adaptors }) => {
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(AdaptorAction.getAllAdaptors());
  }, [dispatch]);

  return (
    <Page>
      <Helmet>
        <title>Adaptors | IUDX Adaptor Framework</title>
      </Helmet>

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
            <h1>My Adaptors</h1>
            <div style={{ width: '50px' }} />
            <ImageButton
              Solid="Solid"
              Text="Create New"
              color="#2D3648"
              hoverColor="white"
              icon="add.png"
              hoverIcon="addGrey.png"
              hoverTextColor="#2D3648"
              onClicked={() => navigate('/onBoarding')}
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
            <Tab>
              <b>Name</b>
            </Tab>

            <Tab>
              <b>Last Used</b>
            </Tab>

            <Tab>
              <b>Logs</b>
            </Tab>

            <Tab>
              <b>Status</b>
            </Tab>
          </div>
          <div />
        </div>
        <Line />
        {adaptors.map(adaptor => (
          <Adaptor
            name={adaptor.name}
            last={adaptor.lastSeen}
            status={adaptor.status}
          />
        ))}
      </div>
    </Page>
  );
};

MyAdaptorsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adaptors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      jarId: PropTypes.string,
      jobId: PropTypes.string,
      lastSeen: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  adaptors: selectAdaptors(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyAdaptorsPage);
