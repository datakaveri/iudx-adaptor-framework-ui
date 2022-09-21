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
import InputSpecResponseModel from '../../../../stores/adaptor/models/inputSpecResponse/InputSpecResponseModel';
import EditorStyle from '../../../shared/constants/EditorStyle';
import Loader from '../../../shared/components/Loader';

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

const LeftMargin = styled.div`
  margin-left: 80px;
`;

const Flex = styled.div`
  display: flex;
`;

const ParseSpec = ({ dispatch, parseSpec, parseSpecInput, inputSpec }) => {
  const [parseSpecData, setParseSpecData] = useState('');
  const [trickle, setTrickle] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setParseSpecData(parseSpec);
    setTrickle(
      parseSpecInput.trickle.length === 0
        ? ''
        : JSON.stringify(parseSpecInput.trickle, null, 4),
    );
  }, [parseSpec]);

  return (
    <div>
      <Loader open={loader} message="Running Parse Spec" />
      <Title>Parse Spec</Title>
      <hr />
      <LeftMargin>
        <Flex>
          <AdaptorForm
            onSubmit={async values => {
              const headers = {
                'Content-Type': 'application/json',
              };

              const spec = {
                ...values,
                trickle: trickle !== '' ? JSON.parse(trickle) : undefined,
              };

              const requestBody = {
                inputData: inputSpec,
                parseSpec: spec,
              };
              dispatch(AdaptorAction.saveParseSpec(spec));
              setLoader(true);
              await dispatch(
                AdaptorAction.requestParseSpec(requestBody, headers),
              );
              setLoader(false);
              dispatch(
                ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
              );
            }}>
            {() => (
              <FormWrapper>
                <Group>
                  <AdaptorInput
                    inputlabel="Serialization Format Type"
                    inputtype="select"
                    selectoptions={[
                      { key: 'JSON', value: 'json' },
                      { key: 'XML (Currently not supported)', value: 'xml' },
                    ]}
                    name="type"
                    initialValue={parseSpecInput.type}
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    inputlabel="Message Container"
                    inputtype="select"
                    selectoptions={[
                      { key: 'Array', value: 'array' },
                      { key: 'String', value: 'string' },
                    ]}
                    name="messageContainer"
                    initialValue={parseSpecInput.messageContainer}
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    inputlabel="Input Datetime format"
                    name="inputTimeFormat"
                    initialValue={parseSpecInput.inputTimeFormat}
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Output Datetime format"
                    name="outputTimeFormat"
                    initialValue={parseSpecInput.outputTimeFormat}
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
                  <InputLabel style={{ marginLeft: '10px' }}>
                    Trickle
                  </InputLabel>
                  <Editor
                    disabled={false}
                    value={trickle}
                    highlight={value => highlight(value, languages.jsx)}
                    padding={15}
                    onValueChange={value => setTrickle(value)}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                      overflow: 'auto',
                      marginTop: '5px',
                      flex: 'display',
                      width: '500px',
                      height: '250px',
                      border: '1px solid',
                      borderColor: 'black',
                      borderRadius: '3px',
                    }}
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
              <InputLabel>Input Data</InputLabel>
            </SwitchDiv>
            <Editor
              disabled
              value={
                inputSpec.message === ''
                  ? ''
                  : JSON.stringify(
                      JSON.parse(inputSpec.result[0]).Data,
                      null,
                      4,
                    )
              }
              highlight={value => highlight(value, languages.jsx)}
              padding={20}
              style={EditorStyle}
            />
            <SwitchDiv style={{ marginTop: '25px' }}>
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
              style={EditorStyle}
            />
          </Group>
        </Flex>
      </LeftMargin>
    </div>
  );
};

ParseSpec.propTypes = {
  dispatch: PropTypes.func.isRequired,
  parseSpec: PropTypes.instanceOf(ParseSpecResponseModel).isRequired,
  parseSpecInput: PropTypes.instanceOf(ParseSpecInputModel).isRequired,
  inputSpec: PropTypes.instanceOf(InputSpecResponseModel).isRequired,
};

const mapStateToProps = state => ({
  parseSpec: new ParseSpecResponseModel(state.adaptorReducer.parseSpec),
  parseSpecInput: new ParseSpecInputModel(state.adaptorReducer.parseSpecInput),
  inputSpec: new InputSpecResponseModel(state.adaptorReducer.inputSpec),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(ParseSpec);
