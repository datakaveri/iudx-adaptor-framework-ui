/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useField } from 'react-final-form';
import styled from 'styled-components';
import { TextField, Select, MenuItem, InputLabel } from '@mui/material';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ErrorText = styled.div`
  margin-top: 5px;
  color: #e74c3c;
  font-size: 15px;
  padding: 0px 4px;
  min-height: 24px;
`;

const AdaptorInput = props => {
  const {
    input,
    meta: { error, touched, submitError },
  } = useField(props.name, {
    initialValue: props.initialValue,
    validate: props.validate,
  });

  const inputProps = {
    ...props,
    error: touched && error && true,
    ...input,
  };

  return (
    <InputWrapper>
      <InputLabel>{props.inputlabel}</InputLabel>
      {props.inputtype ? (
        <div>
          {props.inputtype === 'select' ? (
            <Select {...inputProps}>
              {props.selectoptions.map(el => (
                <MenuItem key={el} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          ) : (
            ''
          )}
        </div>
      ) : (
        <TextField {...inputProps} />
      )}
      <ErrorText>{touched && (error || submitError) ? error : ''}</ErrorText>
    </InputWrapper>
  );
};

export default AdaptorInput;
