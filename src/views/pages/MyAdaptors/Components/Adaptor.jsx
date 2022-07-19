/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageButton from '../../../shared/components/ImageButton';
import environment from '../../../../environments';
import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';

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

function Adaptor({ name, last, status, id, dispatch, callbackMethod }) {
  const stopAdaptor = async jobId => {
    await dispatch(AdaptorAction.stopJob(jobId));
    callbackMethod();
  };
  const restartAdaptor = async jobId => {
    await dispatch(AdaptorAction.startJob(jobId));
    callbackMethod();
  };

  const deleteAdaptor = async jobId => {
    await dispatch(AdaptorAction.deleteJob(jobId));
    callbackMethod();
  };

  return (
    <LabelsRow>
      <LabelsContainer>
        <Labels>
          <b>{name}</b>
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
      ) : status === 'stopped' || status === 'cg-failed' ? (
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
      ) : (
        ''
      )}
    </LabelsRow>
  );
}

Adaptor.propTypes = {
  name: PropTypes.string,
  last: PropTypes.string,
  status: PropTypes.string,
  id: PropTypes.string,
  dispatch: PropTypes.func,
  callbackMethod: PropTypes.func,
};

Adaptor.defaultProps = {
  name: PropTypes.string,
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
