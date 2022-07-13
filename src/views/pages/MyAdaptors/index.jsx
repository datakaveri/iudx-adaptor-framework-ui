import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Adaptor from './Components/Adaptor';
import { Line } from '../../shared/components/SpecComponents';
import ImageButton from '../../shared/components/ImageButton';
import { selectAdaptors } from '../../../selectors/adaptor/AdaptorSelector';
import AdaptorAction from '../../../stores/adaptor/AdaptorAction';

const Tab = styled.div`
  margin: 0px;
  width: 25%;
  text-align: start;
`;

const MyAdaptorsPage = ({ dispatch, adaptors }) => {
  const [results, setResults] = useState(adaptors);

  useEffect(() => {
    dispatch(AdaptorAction.getAllAdaptors());
    setResults(adaptors);
    console.log(JSON.stringify(results));
  }, [dispatch]);

  const [isSearched, setIsSearched] = useState(false);
  const searchFunction = e => {
    setIsSearched(true);
    setResults(
      adaptors.filter(searchedItem =>
        searchedItem.name.toLowerCase().includes(e.toLowerCase()),
      ),
    );
  };

  return (
    <div
      style={{
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}>
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
            />
          </div>
          <div>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              placeholder="Search"
              onChange={evt => {
                searchFunction(evt.target.value);
              }}
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
        {isSearched
          ? results.map(adaptor => (
              <Adaptor
                name={adaptor.name}
                last={adaptor.lastSeen}
                status={adaptor.status}
              />
            ))
          : adaptors.map(adaptor => (
              <Adaptor
                name={adaptor.name}
                last={adaptor.lastSeen}
                status={adaptor.status}
              />
            ))}
      </div>
    </div>
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
