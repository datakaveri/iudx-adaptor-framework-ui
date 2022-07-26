import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, InputLabel, Switch, Select, MenuItem } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import { Title } from '../../../shared/components/SpecComponents';
import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput, {
  SwitchDiv,
} from '../../../shared/components/AdaptorInput';

import InputSpecResponseModel from '../../../../stores/adaptor/models/inputSpecResponse/InputSpecResponseModel';
import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import ToastsAction from '../../../../stores/toasts/ToastsAction';
import InputSpecInputModel from '../../../../stores/adaptor/models/specInput/inputSpec/InputSpecInputModel';
import EditorStyle from '../../../shared/constants/EditorStyle';

require('prismjs/components/prism-jsx');

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

const InputSpec = ({ dispatch, inputSpec, inputSpecInput }) => {
  const [scheduleJob, setScheduleJob] = useState(inputSpecInput.boundedJob);
  const [inputSpecData, setInputSpecData] = useState('');
  const [bypassExecution, setBypassExecution] = useState(false);
  const [requestType, setRequestType] = useState('');
  const [headers, setHeaders] = useState('');
  const [requestGenerationScripts, setRequestGenerationScripts] = useState('');

  useEffect(() => {
    const res = [];
    inputSpec.result.map(el => res.push(JSON.parse(el)));
    setInputSpecData(res);
    setHeaders(
      inputSpecInput.headers.length === 0
        ? ''
        : JSON.stringify(inputSpecInput.headers, null, 4),
    );
    setRequestGenerationScripts(
      inputSpecInput.requestGenerationScripts.length === 0
        ? ''
        : JSON.stringify(inputSpecInput.requestGenerationScripts, null, 4),
    );
  }, [inputSpec]);

  const selectoptions = [
    { key: 'GET', value: 'GET' },
    { key: 'POST', value: 'POST' },
  ];

  const handleChange = value => {
    setRequestType(value.target.value);
    console.log(requestType);
  };

  return (
    <div>
      <Title>Input Spec</Title>
      <hr />
      <LeftMargin>
        <Flex>
          <AdaptorForm
            onSubmit={values => {
              const header = {
                username: 'user',
                password: 'user-password',
                'Content-Type': 'application/json',
              };
              const requestBody = {
                inputSpec: {
                  type: values.type,
                  url: values.url,
                  requestType,
                  headers: JSON.parse(headers),
                  postBody: requestType === 'POST' ? values.postBody : '',
                  requestTimeout: values.requestTimeout,
                  requestGenerationScripts: JSON.parse(
                    requestGenerationScripts,
                  ),
                  pollingInterval: !scheduleJob ? values.pollingInterval : -1,
                  boundedJob: scheduleJob ? true : '',
                  minioConfig: !scheduleJob
                    ? ''
                    : {
                        url: values.minioUrl,
                        bucket: values.minioBucket,
                        stateName: values.minioStateName,
                        accessKey: values.minioAccessKey,
                        secretKey: values.minioSecretKey,
                      },
                },
              };
              dispatch(
                ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
              );
              if (!bypassExecution) {
                dispatch(AdaptorAction.requestInputSpec(requestBody, header));
              }
              dispatch(
                AdaptorAction.saveInputSpec(
                  new InputSpecInputModel(requestBody.inputSpec),
                ),
                console.log(scheduleJob),
              );
            }}>
            {() => (
              <FormWrapper>
                <Group>
                  <AdaptorInput
                    inputlabel="Type"
                    inputtype="select"
                    selectoptions={[
                      { key: 'HTTP', value: 'http' },
                      { key: 'MQTT', value: 'mqtt' },
                      { key: 'AMQP', value: 'amqp' },
                      { key: 'GRPC', value: 'grpc' },
                    ]}
                    name="type"
                    placeholder="type"
                    initialValue={inputSpecInput.type}
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="URL"
                    name="url"
                    placeholder="URL"
                    initialValue={inputSpecInput.url}
                  />
                </Group>
                <Group>
                  <InputLabel style={{ marginLeft: '10px' }}>
                    Headers
                  </InputLabel>
                  <Editor
                    disabled={false}
                    value={headers}
                    highlight={value => highlight(value, languages.jsx)}
                    padding={15}
                    onValueChange={value => setHeaders(value)}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                      overflow: 'auto',
                      marginTop: '5px',
                      flex: 'display',
                      width: '320px',
                      height: '150px',
                      border: '1px solid',
                      borderColor: 'black',
                      borderRadius: '3px',
                    }}
                  />
                </Group>
                <Group style={{ marginTop: '15px' }}>
                  <InputLabel style={{ marginLeft: '10px' }}>
                    Request Generation Scripts
                  </InputLabel>
                  <Editor
                    disabled={false}
                    value={requestGenerationScripts}
                    highlight={value => highlight(value, languages.jsx)}
                    padding={15}
                    onValueChange={value => setRequestGenerationScripts(value)}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                      overflow: 'auto',
                      marginTop: '5px',
                      flex: 'display',
                      width: '320px',
                      height: '150px',
                      border: '1px solid',
                      borderColor: 'black',
                      borderRadius: '3px',
                    }}
                  />
                </Group>
                <Group style={{ marginTop: '15px' }}>
                  <InputLabel
                    style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                    *Request Type
                  </InputLabel>
                  <Select
                    style={{ width: '320px' }}
                    defaultValue={inputSpecInput.requestType}
                    onChange={handleChange}>
                    {selectoptions.map(el => (
                      <MenuItem key={el.key} value={el.value}>
                        {el.value}
                      </MenuItem>
                    ))}
                  </Select>
                </Group>
                {requestType === 'POST' ? (
                  <Group style={{ marginTop: '15px' }}>
                    <AdaptorInput
                      optional
                      inputlabel="Post Body"
                      name="postBody"
                      initialValue={inputSpecInput.postBody}
                    />
                  </Group>
                ) : (
                  ''
                )}

                <Group style={{ marginTop: '15px' }}>
                  <AdaptorInput
                    optional
                    inputlabel="Request Timeout"
                    name="requestTimeout"
                    placeholder="in seconds"
                    initialValue={inputSpecInput.requestTimeout}
                  />
                </Group>
                <Group>
                  <SwitchDiv>
                    <InputLabel>Schedule Job</InputLabel>
                    <Switch
                      initialValue={inputSpecInput.boundedJob}
                      checked={scheduleJob}
                      onChange={() => {
                        setScheduleJob(
                          inputSpecInput.boundedJob === 'true'
                            ? scheduleJob
                            : !scheduleJob,
                        );
                      }}
                    />
                  </SwitchDiv>
                </Group>

                {scheduleJob ? (
                  <div>
                    <Title>Minio Config</Title>
                    <hr />
                    <FormWrapper>
                      <Group>
                        <AdaptorInput
                          inputlabel="URL"
                          name="minioUrl"
                          placeholder="Minio URL"
                          initialValue={
                            inputSpecInput.minioConfig
                              ? inputSpecInput.minioConfig.url
                              : ''
                          }
                        />
                      </Group>
                      <Group>
                        <AdaptorInput
                          inputlabel="Bucket"
                          name="minioBucket"
                          placeholder="Minio Bucket"
                          initialValue={
                            inputSpecInput.minioConfig
                              ? inputSpecInput.minioConfig.bucket
                              : ''
                          }
                        />
                      </Group>
                      <Group>
                        <AdaptorInput
                          inputlabel="State Name"
                          name="minioStateName"
                          placeholder="Minio State Name"
                          initialValue={
                            inputSpecInput.minioConfig
                              ? inputSpecInput.minioConfig.stateName
                              : ''
                          }
                        />
                      </Group>
                      <Group>
                        <AdaptorInput
                          inputlabel="Access Key"
                          name="minioAccessKey"
                          placeholder="Minio Access Key"
                          initialValue={
                            inputSpecInput.minioConfig
                              ? inputSpecInput.minioConfig.accessKey
                              : ''
                          }
                        />
                      </Group>
                      <Group>
                        <AdaptorInput
                          inputlabel="Secret Key"
                          name="minioSecretKey"
                          placeholder="Minio Secret Key"
                          initialValue={
                            inputSpecInput.minioConfig
                              ? inputSpecInput.minioConfig.secretKey
                              : ''
                          }
                        />
                      </Group>
                    </FormWrapper>
                  </div>
                ) : (
                  <Group>
                    <AdaptorInput
                      inputlabel="Polling Interval"
                      name="pollingInterval"
                      placeholder="Polling Interval"
                      initialValue={inputSpecInput.pollingInterval}
                    />
                  </Group>
                )}

                <Group style={{ marginTop: '10px', marginBottom: '10px' }}>
                  {!bypassExecution ? (
                    <Button type="submit">Run and Save</Button>
                  ) : (
                    <Button type="submit">Run</Button>
                  )}
                </Group>
              </FormWrapper>
            )}
          </AdaptorForm>
          <Group style={{ marginLeft: '400px', marginTop: '20px' }}>
            <SwitchDiv>
              <InputLabel>Bypass Execution</InputLabel>
              <Switch
                checked={bypassExecution}
                onChange={(ev, val) => {
                  setBypassExecution(val);
                }}
              />
            </SwitchDiv>
            {!bypassExecution ? (
              <Editor
                disabled={bypassExecution}
                value={
                  inputSpecData.message === ''
                    ? ''
                    : JSON.stringify(inputSpecData, null, 4)
                }
                highlight={value => highlight(value, languages.jsx)}
                padding={20}
                style={EditorStyle}
              />
            ) : (
              <div>
                <br />
              </div>
            )}
          </Group>
        </Flex>
      </LeftMargin>
    </div>
  );
};

InputSpec.propTypes = {
  dispatch: PropTypes.func.isRequired,
  inputSpec: PropTypes.instanceOf(InputSpecResponseModel).isRequired,
  inputSpecInput: PropTypes.instanceOf(InputSpecInputModel).isRequired,
};

const mapStateToProps = state => ({
  inputSpec: new InputSpecResponseModel(state.adaptorReducer.inputSpec),
  inputSpecInput: new InputSpecInputModel(state.adaptorReducer.inputSpecInput),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(InputSpec);
