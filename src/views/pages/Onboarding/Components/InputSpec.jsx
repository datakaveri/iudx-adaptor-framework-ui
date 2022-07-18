import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, InputLabel, Switch } from '@mui/material';
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
  const [bypassExecution, setBypassExecution] = React.useState(false);

  useEffect(() => {
    const res = [];
    inputSpec.result.map(el => res.push(JSON.parse(el)));
    setInputSpecData(res);
  }, [inputSpec]);

  return (
    <div>
      <Title>Input Spec</Title>
      <hr />
      <LeftMargin>
        <Flex>
          <AdaptorForm
            onSubmit={values => {
              const headers = {
                username: 'user',
                password: 'user-password',
                'Content-Type': 'application/json',
              };
              const requestBody = {
                inputSpec: {
                  type: values.type,
                  url: values.url,
                  requestType: values.requestType,
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
                dispatch(AdaptorAction.requestInputSpec(requestBody, headers));
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
                  <AdaptorInput
                    inputlabel="Request Type"
                    inputtype="select"
                    selectoptions={[
                      { key: 'GET', value: 'GET' },
                      { key: 'POST', value: 'POST' },
                    ]}
                    name="requestType"
                    placeholder="GET / POST"
                    initialValue={inputSpecInput.requestType}
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
                  <Group style={{ marginTop: '10px' }}>
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
