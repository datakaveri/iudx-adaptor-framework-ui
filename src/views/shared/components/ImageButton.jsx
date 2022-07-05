import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function ImageButton({
  Solid,
  Text,
  Enabled = true,
  icon,
  color,
  hoverIcon,
  hoverColor,
  hoverTextColor,
}) {
  const IconButton = styled.button`
    background-color: ${props =>
      props.solid === 'Solid' ? props.color : 'white'};
    color: ${props => (props.solid === 'Solid' ? 'white' : props.color)};
    font-weight: 700;
    width: 140px;
    border-radius: 5px;
    font-family: 'Inter';
    border-color: ${props => props.color};
    height: 36px;
    border: 2px solid;
    padding: 0px 0px 0px 20px;
    &:disabled {
      background-color: grey;
      color: white;
    }
    &:hover {
      background-color: ${hoverColor};
      color: ${hoverTextColor};
      img {
        content: url('${hoverIcon}');
        width: '20px';
        height: '20px';
      }
    }
  `;

  return (
    <IconButton
      disabled={Enabled}
      solid={Solid}
      color={color}
      onClick={() => console.log('CLICKED')}
      type="button">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}>
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
  hoverIcon: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverTextColor: PropTypes.string,
};

ImageButton.defaultProps = {
  Solid: PropTypes.string,
  Text: PropTypes.string,
  solid: PropTypes.string,
  Enabled: PropTypes.bool,
  color: PropTypes.string,
  icon: PropTypes.string,
  hoverIcon: PropTypes.string,
  hoverColor: PropTypes.string,
  hoverTextColor: PropTypes.string,
};