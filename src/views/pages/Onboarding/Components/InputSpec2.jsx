import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, TextareaAutosize } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import { Title } from '../../../shared/components/SpecComponents';
import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import InputSpecResponseModel from '../../../../stores/adaptor/models/inputSpecResponse/InputSpecResponseModel';
import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
  margin-bottom: 1em;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;

const InputSpec2 = ({ dispatch, inputSpec }) => {
  const [scheduleJob, setScheduleJob] = useState(false);
  const [inputSpecData, setInputSpecData] = useState(
    new InputSpecResponseModel(),
  );
  return (
    <div>
      <Title>Input Spec</Title>
      <hr />
      <AdaptorForm
        onSubmit={values => {
          const requestBody = {
            type: values.type,
            url: values.url,
            requestType: values.requestType,
            headers: {
              'content-type': 'application/json',
            },
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
          };
          console.log(requestBody);
          dispatch(AdaptorAction.requestInputSpec(requestBody));
          setInputSpecData(inputSpec);
          console.log('Input Spec Data');
          console.log(inputSpecData);
        }}>
        {() => (
          <FormWrapper>
            <Group>
              <AdaptorInput
                inputlabel="Type"
                inputtype="select"
                selectoptions={['HTTP', 'MQTT', 'AMQP', 'GRPC']}
                name="type"
                placeholder="type"
              />
            </Group>
            <Group>
              <AdaptorInput inputlabel="URL" name="url" placeholder="URL" />
            </Group>
            <Group>
              <AdaptorInput
                inputlabel="Request Type"
                inputtype="select"
                selectoptions={['GET', 'POST']}
                name="requestType"
                placeholder="GET / POST"
              />
            </Group>
            <Group>
              <Switch
                inputlabel="Scheduled Job"
                checked={scheduleJob}
                onChange={(evt, val) => setScheduleJob(val)}
              />
            </Group>

            {scheduleJob ? (
              <FormWrapper>
                <Title>Minio Config</Title>
                <hr />
                <Group>
                  <AdaptorInput
                    inputlabel="URL"
                    name="minioUrl"
                    placeholder="Minio URL"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Bucket"
                    name="minioBucket"
                    placeholder="Minio Bucket"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="State Name"
                    name="minioStateName"
                    placeholder="Minio State Name"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Access Key"
                    name="minioAccessKey"
                    placeholder="Minio Access Key"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Secret Key"
                    name="minioSecretKey"
                    placeholder="Minio Secret Key"
                  />
                </Group>
              </FormWrapper>
            ) : (
              <Group>
                <AdaptorInput
                  inputlabel="Polling Interval"
                  name="pollingInterval"
                  placeholder="Polling Interval"
                />
              </Group>
            )}

            <Group>
              <button type="submit">Submit</button>
            </Group>
          </FormWrapper>
        )}
      </AdaptorForm>
      <TextareaAutosize
        // disabled={!bypassExecution}
        value={inputSpecData}
        // highlight={value => highlight(value, languages.jsx)}
      />
    </div>
  );
};

InputSpec2.propTypes = {
  dispatch: PropTypes.func.isRequired,
  inputSpec: PropTypes.instanceOf(InputSpecResponseModel).isRequired,
};

const mapStateToProps = state => ({
  inputSpec: new InputSpecResponseModel(state.adaptorReducer.inputSpec),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(InputSpec2);
