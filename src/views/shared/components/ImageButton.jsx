import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function ImageButton({
  Solid,
  Text,
  Enabled = true,
  icon,
  color,
}) {
  const IconButton = styled.button`
    background-color: ${props =>
      props.solid === 'Solid' ? props.color : 'white'};
    color: ${props => (props.solid === 'Solid' ? 'white' : props.color)};
    font-weight: 700;
    border-radius: 5px;
    font-family: 'Inter';
    border-color: ${props => props.color};
    height: 36px;
    padding: 0px 30px;
    &:disabled {
      background-color: grey;
      color: white;
    }
  `;

  return (
    <IconButton
      disabled={Enabled}
      solid={Solid}
      color={color}
      onClick={() => console.log('CLICKED')}
      type="button">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          style={{ width: '20px', height: '20px', marginRight: '10px' }}
          src={icon}
          alt="pic"
        />
        {Text}
      </div>
    </IconButton>
  );
}

ImageButton.propTypes = {
  Solid: PropTypes.string,
  Text: PropTypes.string,
  solid: PropTypes.string,
  Enabled: PropTypes.bool,
  color: PropTypes.string,
  icon: PropTypes.string,
};

ImageButton.defaultProps = {
  Solid: PropTypes.string,
  Text: PropTypes.string,
  solid: PropTypes.string,
  Enabled: PropTypes.bool,
  color: PropTypes.string,
  icon: PropTypes.string,
};
