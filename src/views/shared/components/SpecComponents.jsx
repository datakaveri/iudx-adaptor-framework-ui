import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function BTN({ Solid, Text, Enabled = true }) {
  const ColoredButton = styled.button`
    background-color: ${props =>
      props.solid === 'Solid' ? 'rgb(31,31,31)' : 'white'};
    color: ${props => (props.solid === 'Solid' ? 'white' : 'rgb(31,31,31)')};
    border-radius: 5px;
    font-family: 'Inter';
    border-color: rgb(31, 31, 31);
    margin-right: 20px;
    height: 48px;
    padding: 0px 30px;
    margin-top: 20px;
    &:disabled {
      background-color: grey;
      color: white;
    }
    &:hover {
      background-color: rgb(96, 96, 96);
      color: ${props => (props.solid === 'Solid' ? 'rgb(31,31,31)' : 'white')};
    }
  `;

  return (
    <ColoredButton
      disabled={Enabled}
      solid={Solid}
      onClick={() => console.log('CLICKED')}
      type="button">
      {Text}
    </ColoredButton>
  );
}

BTN.propTypes = {
  Solid: PropTypes.string,
  Text: PropTypes.string,
  solid: PropTypes.string,
  Enabled: PropTypes.bool,
};

BTN.defaultProps = {
  Solid: PropTypes.string,
  Text: PropTypes.string,
  solid: PropTypes.string,
  Enabled: PropTypes.bool,
};

export const Line = styled.hr`
  height: 3px;
  color: rgb(29, 29, 29);
  background-color: rgb(29, 29, 29);
`;

export const Title = styled.h1`
  font-family: 'Inter';
  font-size: 32px;
  padding-left: 80px;
  color: black;
`;

export const Type = styled.h3`
  font-family: 'Inter';
  font-size: 14px;
  padding-left: 80px;
  padding-top: 8px;
`;
