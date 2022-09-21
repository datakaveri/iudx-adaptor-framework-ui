/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import ImageButton from '../../../shared/components/ImageButton';
import environment from '../../../../environments';
import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import Loader from '../../../shared/components/Loader';

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LabelsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: ${props => (props.type === 'RULES' ? 'pointer' : 'default')};
  :hover {
    background-color: ${props => (props.type === 'RULES' ? '#e5e5e5' : 'none')};
  }
`;

const LabelsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
`;

const Labels = styled.div`
  margin-top: 5px;
  padding: 10px 0px 10px 0px;
  width: 25%;
  text-align: start;
`;

const GreenLabel = styled.div`
  margin-top: 5px;
  padding: 10px 0px 10px 0px;
  width: 25%;
  text-align: start;
  color: green;
`;

const Splitter = styled.div`
  width: 10px;
`;

function Adaptor({ name, adaptorType, last, status, id, dispatch, callbackMethod }) {
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const stopAdaptor = async jobId => {
    setLoader(true);
    setMessage('Stopping adaptor, please wait...');
    await dispatch(AdaptorAction.stopJob(jobId));
    setLoader(false);
    callbackMethod();
  };
  const restartAdaptor = async jobId => {
    setLoader(true);
    setMessage('Starting adaptor, please wait...');
    await dispatch(AdaptorAction.startJob(jobId));
    setLoader(false);
    callbackMethod();
  };

  const deleteAdaptor = async jobId => {
    setLoader(true);
    setMessage('Deleting adaptor, please wait...');
    await dispatch(AdaptorAction.deleteJob(jobId));
    setLoader(false);
    callbackMethod();
  };

  const viewRules = async jobId => {
    navigate(`/adaptors/${jobId}/rules`);
  };

  return (
    <LabelsRow
      type={adaptorType}
      onClick={() => {
        if (adaptorType === 'RULES') {
          viewRules(id);
        }
      }}>
      <Loader open={loader} message={message} />
      <LabelsContainer>
        <Labels>
          <b>{name}</b>
        </Labels>
        <Labels>
          <b>{adaptorType}</b>
        </Labels>
        <Labels>{moment(last).format('lll')}</Labels>
        <Labels>
          <a
            href={environment.GRAFANA_DASHBOARD_URL.replace('JOBNAME', name)}
            target="_blank"
            rel="noreferrer">
            Open
          </a>
        </Labels>
        <GreenLabel>
          <b>{status}</b>
        </GreenLabel>
      </LabelsContainer>

      {status === 'running' ? (
        <ImageButton
          Solid=""
          Text="Stop"
          color="#C77D00"
          hoverColor="#C77D00"
          icon="stop.png"
          hoverIcon="stopWhite.png"
          hoverTextColor="white"
          onClicked={() => {
            stopAdaptor(id);
          }}
        />
      ) : status === 'stopped' ||
        status === 'cg-failed' ||
        status === 'canceled' ? (
        <Buttons>
          <ImageButton
            Solid=""
            Text="Restart"
            color="#009E5F"
            icon="refresh.png"
            hoverIcon="refreshWhite.png"
            hoverColor="#009E5F"
            hoverTextColor="white"
            onClicked={() => {
              restartAdaptor(id);
            }}
          />
          <Splitter />
          <ImageButton
            Solid="Solid"
            Text="Delete"
            color="#EA4335"
            icon="delete.png"
            hoverIcon="delete.png"
            hoverColor="#9b241a"
            hoverTextColor="white"
            onClicked={() => {
              deleteAdaptor(id);
            }}
          />
        </Buttons>
      ) : status === 'cg-completed' ? (
        <Buttons>
          <ImageButton
            Solid=""
            Text="Start"
            color="#009E5F"
            icon="refresh.png"
            hoverIcon="refreshWhite.png"
            hoverColor="#009E5F"
            hoverTextColor="white"
            onClicked={() => {
              restartAdaptor(id);
            }}
          />
          <Splitter />
          <ImageButton
            Solid="Solid"
            Text="Delete"
            color="#EA4335"
            icon="delete.png"
            hoverIcon="delete.png"
            hoverColor="#9b241a"
            hoverTextColor="white"
            onClicked={() => {
              deleteAdaptor(id);
            }}
          />
        </Buttons>
      ) : (
        ''
      )}
    </LabelsRow>
  );
}

Adaptor.propTypes = {
  name: PropTypes.string,
  adaptorType: PropTypes.string,
  last: PropTypes.string,
  status: PropTypes.string,
  id: PropTypes.string,
  dispatch: PropTypes.func,
  callbackMethod: PropTypes.func,
};

Adaptor.defaultProps = {
  name: PropTypes.string,
  adaptorType: PropTypes.string,
  last: PropTypes.string,
  status: PropTypes.string,
  id: PropTypes.string,
  dispatch: PropTypes.func,
  callbackMethod: PropTypes.func,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Adaptor);
