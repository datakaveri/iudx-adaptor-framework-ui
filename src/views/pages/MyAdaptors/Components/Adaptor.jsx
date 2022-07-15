import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageButton from '../../../shared/components/ImageButton';
import environment from '../../../../environments';

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

const Labels = styled.div`
  width: 25%;
  text-align: start;
`;

function Adaptor({ name, last, status, dispatch }) {
  return (
    <LabelsRow>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '70%',
        }}>
        <p style={{ width: '25%' }}>
          <b>{name}</b>
        </p>
        <p style={{ width: '25%', textAlign: 'start' }}>
          {moment(last).format('lll')}
        </p>
        <p style={{ width: '25%' }}>
          <a
            href={environment.GRAFANA_DASHBOARD_URL.replace('JOBNAME', name)}
            target="_blank"
            rel="noreferrer">
            Open
          </a>
        </p>
        <p style={{ color: 'green', width: '25%', textAlign: 'start' }}>
          <b>{status}</b>
        </p>
      </div>

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
            console.log('Clicked stop');
          }}
        />
      ) : (
        <Buttons>
          <ImageButton
            Solid=""
            Text="Restart"
            color="#009E5F"
            icon="refresh.png"
            hoverIcon="refreshWhite.png"
            hoverColor="#009E5F"
            hoverTextColor="white"
          />
          <div style={{ width: '10px' }} />
          <ImageButton
            Solid="Solid"
            Text="Delete"
            color="#EA4335"
            icon="delete.png"
            hoverIcon="delete.png"
            hoverColor="#9b241a"
            hoverTextColor="white"
          />
        </Buttons>
      )}
    </LabelsRow>
  );
}

Adaptor.propTypes = {
  name: PropTypes.string,
  last: PropTypes.string,
  status: PropTypes.string,
  dispatch: PropTypes.func,
};

Adaptor.defaultProps = {
  name: PropTypes.string,
  last: PropTypes.string,
  status: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Adaptor);
