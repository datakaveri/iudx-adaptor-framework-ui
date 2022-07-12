import React from 'react';
import PropTypes from 'prop-types';
import ImageButton from '../../../shared/components/ImageButton';
import StyledDiv from './Div';

function stopClick() {
  alert('adaptor stoped!');
}
function deleteClick() {
  alert('adaptor deleted!');
}
function restartClick() {
  alert('adaptor restarted!');
}
export default function Adapter({ name, last, status }) {
  return (
    <StyledDiv>
      <StyledDiv width="70%">
        <p style={{ width: '30%' }}>
          <b>{name}</b>
        </p>
        <p style={{ width: '30%', textAlign: 'start' }}>{last}</p>
        <p style={{ color: 'green', width: '30%', textAlign: 'start' }}>
          <b>{status}</b>
        </p>
      </StyledDiv>

      {status === 'Running' ? (
        <ImageButton
          Solid=""
          Text="stop"
          color="#C77D00"
          hoverColor="#C77D00"
          icon="stop.png"
          hoverIcon="stopWhite.png"
          hoverTextColor="white"
          onClicked={stopClick}
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
            onClicked={restartClick}
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
            onClicked={deleteClick}
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
