import React from 'react';
import PropTypes from 'prop-types';
import ImageButton from '../../../shared/components/ImageButton';

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
        <p style={{ width: '30%' }}>
          <b>{name}</b>
        </p>
        <p style={{ width: '30%', textAlign: 'start' }}>{last}</p>
        <p style={{ color: 'green', width: '30%', textAlign: 'start' }}>
          <b>{status}</b>
        </p>
      </div>

      {status === 'Running' ? (
        <ImageButton
          Solid=""
          Text="stop"
          color="#C77D00"
          icon="stop.png"
          hoverIcon="stopWhite.png"
        />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <ImageButton
            Solid=""
            Text="Restart"
            color="#009E5F"
            icon="refresh.png"
            hoverIcon="refreshWhite.png"
          />
          <div style={{ width: '10px' }} />
          <ImageButton
            Solid="Solid"
            Text="Delete"
            color="#EA4335"
            icon="delete.png"
            hoverIcon="deleteRed.png"
          />
        </div>
      )}
    </div>
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
