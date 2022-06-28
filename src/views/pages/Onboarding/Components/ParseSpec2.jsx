import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, InputLabel } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import { Title } from '../../../shared/components/SpecComponents';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import ToastsAction from '../../../../stores/toasts/ToastsAction';
import AdaptorInput, {
  SwitchDiv,
} from '../../../shared/components/AdaptorInput';

import ParseSpecResponseModel from '../../../../stores/adaptor/models/parseSpecResponse/ParseSpecResponseModel';
import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import ParseSpecInputModel from '../../../../stores/adaptor/models/specInput/parseSpec/ParseSpecInputModel';

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ParseSpec2 = ({ dispatch, parseSpec, parseSpecInput }) => {
  const [parseSpecData, setParseSpecData] = useState('');

  useEffect(() => {
    setParseSpecData(parseSpec);
  }, [parseSpec]);

  return (
    <div>
      <Title>Parse Spec</Title>
      <hr />
      <div style={{ marginLeft: '80px' }}>
        <div style={{ display: 'flex' }}>
          <AdaptorForm
            onSubmit={values => {
              dispatch(
                ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
              );
              dispatch(
                AdaptorAction.saveParseSpec(new ParseSpecInputModel(values)),
              );
              dispatch(AdaptorAction.requestParseSpec(values));
            }}>
            {() => (
              <FormWrapper>
                <Group>
                  <AdaptorInput
                    inputlabel="Serialization Format Type"
                    inputtype="select"
                    selectoptions={['JSON', 'XML (Currently not supported)']}
                    name="type"
                    initialValue={parseSpecInput.type}
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    inputlabel="Message Contained"
                    inputtype="select"
                    selectoptions={['Array', 'String']}
                    name="messageContainer"
                    initialValue={parseSpecInput.messageContainer}
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    inputlabel="Input Datetime format"
                    name="inputDateTimeFormat"
                    initialValue={parseSpecInput.inputDateTimeFormat}
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Output Datetime format"
                    name="outputDateTimeFormat"
                    initialValue={parseSpecInput.outputDateTimeFormat}
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Container Path"
                    name="containerPath"
                    initialValue={parseSpecInput.containerPath}
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Timestamp Path"
                    name="timestampPath"
                    initialValue={parseSpecInput.timestampPath}
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Key Path"
                    name="keyPath"
                    initialValue={parseSpecInput.keyPath}
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Trickle"
                    name="trickle"
                    initialValue={parseSpecInput.trickle}
                  />
                </Group>
                <Group style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <Button type="submit">Run and Save</Button>
                </Group>
              </FormWrapper>
            )}
          </AdaptorForm>
          <Group style={{ marginLeft: '400px', marginTop: '20px' }}>
            <SwitchDiv>
              <InputLabel>JSON Response</InputLabel>
            </SwitchDiv>
            <Editor
              disabled
              value={
                parseSpecData.message === ''
                  ? ''
                  : JSON.stringify(parseSpecData, null, 4)
              }
              highlight={value => highlight(value, languages.jsx)}
              padding={20}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                overflow: 'auto',

                flex: 'display',
                width: '500px',
                height: '250px',
                border: '1px solid',
                borderColor: '#b7b0b0',
                borderRadius: '3px',
              }}
            />
          </Group>
        </div>
      </div>
    </div>
  );
};

ParseSpec2.propTypes = {
  dispatch: PropTypes.func.isRequired,
  parseSpec: PropTypes.instanceOf(ParseSpecResponseModel).isRequired,
  parseSpecInput: PropTypes.instanceOf(ParseSpecInputModel).isRequired,
};

const mapStateToProps = state => ({
  parseSpec: new ParseSpecResponseModel(state.adaptorReducer.parseSpec),
  parseSpecInput: new ParseSpecInputModel(state.adaptorReducer.parseSpecInput),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParseSpec2);
