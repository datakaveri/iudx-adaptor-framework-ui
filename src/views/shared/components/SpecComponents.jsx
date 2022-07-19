import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default function BTN({ Solid, Text, onClick, disabled }) {
  const ColoredButton = styled.button`
    background-color: ${props =>
      props.solid === 'Solid' ? 'rgb(31,31,31)' : 'grey'};
    color: ${props => (props.solid === 'Solid' ? 'white' : 'rgb(31,31,31)')};
    cursor: ${disabled ? 'not-allowed' : 'grab'};
    border-radius: 5px;
    font-family: 'Inter';
    border-color: rgb(31, 31, 31);
    margin-right: 20px;
    height: 48px;
    padding: 0px 30px;
    margin-top: 10px;

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
      disabled={disabled}
      solid={Solid}
      onClick={onClick}
      type="submit"
    >
      {Text}
    </ColoredButton>
  );
}

BTN.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  Solid: PropTypes.string,
  Text: PropTypes.string,
  solid: PropTypes.string,
};

BTN.defaultProps = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  Solid: PropTypes.string,
  Text: PropTypes.string,
  solid: PropTypes.string,
};

export const Line = styled.hr`
  height: 3px;
  color: rgb(29, 29, 29);
  background-color: rgb(29, 29, 29);
`;

export const Title = styled.h1`
  /* font-family: 'Inter'; */
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
