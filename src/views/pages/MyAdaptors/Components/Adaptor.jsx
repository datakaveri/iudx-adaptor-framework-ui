import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ImageButton from '../../../shared/components/ImageButton';
import environment from '../../../../environments';

export default function Adapter({ name, last, status }) {
  return (
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
      </StyledDiv>

      {status === 'running' ? (
        <ImageButton
          Solid=""
          Text="stop"
          color="#C77D00"
          hoverColor="#C77D00"
          icon="stop.png"
          hoverIcon="stopWhite.png"
          hoverTextColor="white"
        />
      ) : (
        <StyledDiv>
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
        </StyledDiv>
      )}
    </StyledDiv>
  );
}

Adapter.propTypes = {
  name: PropTypes.string,
  last: PropTypes.string,
  status: PropTypes.string,
};

Adapter.defaultProps = {
  name: PropTypes.string,
  last: PropTypes.string,
  status: PropTypes.string,
};
