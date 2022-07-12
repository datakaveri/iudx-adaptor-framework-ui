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

const InputSpec = ({ dispatch, inputSpec, inputSpecInput }) => {
  const [scheduleJob, setScheduleJob] = useState();
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
      <div style={{ marginLeft: '80px' }}>
        <div style={{ display: 'flex' }}>
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
              console.log('Input Spec');
              console.table(requestBody);
              dispatch(AdaptorAction.saveInputSpec(requestBody));
              dispatch(AdaptorAction.saveInputSpec(new InputSpecInputModel(values)));
              dispatch(AdaptorAction.requestInputSpec(requestBody, headers));
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
                  <AdaptorInput
                    inputlabel="Scheduled Job"
                    inputtype="switch"
                    initialValue={inputSpecInput.boundedJob}
                    checked={scheduleJob}
                    onChange={setScheduleJob}
                  />
                </Group>

                {scheduleJob ? (
                  <div>
                    <Title>Minio Config</Title>
                    <hr />
                    <FormWrapper>
                      <Group>
                        ~
                        <AdaptorInput
                          inputlabel="URL"
                          name="minioUrl"
                          placeholder="Minio URL"
                          initialValue={inputSpecInput.minioConfig.url}
                        />
                      </Group>
                      <Group>
                        <AdaptorInput
                          inputlabel="Bucket"
                          name="minioBucket"
                          placeholder="Minio Bucket"
                          initialValue={inputSpecInput.minioConfig.bucket}
                        />
                      </Group>
                      <Group>
                        <AdaptorInput
                          inputlabel="State Name"
                          name="minioStateName"
                          placeholder="Minio State Name"
                          initialValue={inputSpecInput.minioConfig.stateName}
                        />
                      </Group>
                      <Group>
                        <AdaptorInput
                          inputlabel="Access Key"
                          name="minioAccessKey"
                          placeholder="Minio Access Key"
                          initialValue={inputSpecInput.minioConfig.accessKey}
                        />
                      </Group>
                      <Group>
                        <AdaptorInput
                          inputlabel="Secret Key"
                          name="minioSecretKey"
                          placeholder="Minio Secret Key"
                          initialValue={inputSpecInput.minioConfig.secretKey}
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
                  <Button type="submit">Run and Save</Button>
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

            <Editor
              disabled={!bypassExecution}
              value={
                inputSpecData.message === ''
                  ? ''
                  : JSON.stringify(inputSpecData, null, 4)
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
                borderColor: bypassExecution ? 'black' : '#b7b0b0',
                borderRadius: '3px',
              }}
            />
          </Group>
        </div>
      </div>
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
