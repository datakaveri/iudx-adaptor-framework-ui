import React, { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Adaptor from './Components/Adaptor';
import { Line, Title } from '../../shared/components/SpecComponents';
import ImageButton from '../../shared/components/ImageButton';
import { selectAdaptors } from '../../../selectors/adaptor/AdaptorSelector';
import AdaptorAction from '../../../stores/adaptor/AdaptorAction';

const Page = styled.div`
  align-content: center;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Navbar = styled.div`
  width: 80%;
`;

const NavbarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Tab = styled.div`
  margin: 0px;
  width: 25%;
  text-align: start;
  font-weight: bold;
`;

const Splitter = styled.div`
  width: 50px;
`;

const TabsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
`;

const MyAdaptorsPage = ({ dispatch, adaptors }) => {
  const navigate = useNavigate();
  const [results, setResults] = useState(adaptors);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(AdaptorAction.getAllAdaptors());
    setResults(adaptors);
  }, [dispatch]);

  const callbackAdaptors = () => {
    dispatch(AdaptorAction.getAllAdaptors());
  };

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
    <Page>
      <Helmet>
        <title>Adaptors | IUDX Adaptor Framework</title>
      </Helmet>

      <Navbar>
        <NavbarContent>
          <Buttons>
            <Title>My Adaptors</Title>
            <Splitter />
            <ImageButton
              Solid="Solid"
              Text="Create New"
              color="#2D3648"
              hoverColor="white"
              icon="add.png"
              hoverIcon="addGrey.png"
              hoverTextColor="#2D3648"
              onClicked={() => navigate('/onboarding')}
            />
          </Buttons>
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
        </NavbarContent>

        <TabsBar>
          <Tab>Name</Tab>

          <Tab>Type</Tab>

          <Tab>Last Used</Tab>

          <Tab>Logs</Tab>

          <Tab>Status</Tab>
        </TabsBar>
        <div />
        <Line />

        {isSearched
          ? results.map(adaptor => (
              <Adaptor
                name={adaptor.name}
                adaptorType={adaptor.adaptorType}
                last={adaptor.lastSeen}
                status={adaptor.status}
                id={adaptor.id}
                callbackMethod={callbackAdaptors}
              />
            ))
          : adaptors.map(adaptor => (
              <Adaptor
                name={adaptor.name}
                adaptorType={adaptor.adaptorType}
                last={adaptor.lastSeen}
                status={adaptor.status}
                id={adaptor.id}
                callbackMethod={callbackAdaptors}
              />
            ))}
      </Navbar>
    </Page>
  );
};

MyAdaptorsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adaptors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      adaptorType: PropTypes.string,
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
