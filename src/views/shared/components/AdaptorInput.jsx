/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { useField } from 'react-final-form';
import styled from 'styled-components';
import { TextField, Select, MenuItem, InputLabel, Switch } from '@mui/material';

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
  min-height: 20px;
`;

export const SwitchDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
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
      {props.inputtype === 'switch' ? (
        ''
      ) : (
        <InputLabel
          style={{
            marginLeft: '10px',
            fontWeight: props.optional ? 'normal' : 'bold',
          }}>
          {props.optional ? '' : '*'}
          {props.inputlabel}
        </InputLabel>
      )}
      {props.inputtype ? (
        <div>
          {props.inputtype === 'select' ? (
            <Select style={{ width: '320px' }} {...inputProps}>
              {props.selectoptions.map(el => (
                <MenuItem key={el.key} value={el.value}>
                  {el.key}
                </MenuItem>
              ))}
            </Select>
          ) : (
            ''
          )}
          {props.inputtype === 'switch' ? (
            <SwitchDiv>
              <InputLabel style={{ marginLeft: '10px' }}>
                {props.inputlabel}
              </InputLabel>
              <Switch
                checked={props.initialValue}
                onChange={(evt, val) => props.onChange(val)}
              />
            </SwitchDiv>
          ) : (
            ''
          )}
          {props.inputtype === 'text_container' ? (
            <TextField
              multiline
              rows={5}
              style={{ width: '320px' }}
              {...inputProps}
            />
          ) : (
            ''
          )}
        </div>
      ) : (
        <TextField style={{ width: '320px' }} {...inputProps} />
      )}
      <ErrorText>{touched && (error || submitError) ? error : ''}</ErrorText>
    </InputWrapper>
  );
};

export default AdaptorInput;
