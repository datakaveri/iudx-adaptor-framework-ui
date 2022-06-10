import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, TextareaAutosize } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';


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
  
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
`;

const InputSpec2 = ({ dispatch, inputSpec }) => {
  const [scheduleJob, setScheduleJob] = useState(false);
  const [inputSpecData, setInputSpecData] = useState({});
  const [bypassExecution, setBypassExecution] = React.useState(false);

  useEffect(() => {
    setInputSpecData(inputSpec);
  }, [inputSpec]);

  return (
    <div>
      <Title>Input Spec</Title>
      <hr />
    <div style={{marginLeft:"80px"}}>
      <div style={{display:"flex"}}>
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
          // console.log('Input Spec Data');
          // console.log(inputSpecData);
        }}>
        {() => (
          <FormWrapper >
            
            <Group >
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
            <Group >
              <Switch
                inputlabel="Scheduled Job"
                checked={scheduleJob}
                onChange={(evt, val) => setScheduleJob(val)}
              />
            </Group>

            {scheduleJob ? (
              <div>
                <Title>Minio Config</Title>
                <hr/>
              <FormWrapper>
                
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
              </div>
            ) : (
              <Group>
                <AdaptorInput
                  inputlabel="Polling Interval"
                  name="pollingInterval"
                  placeholder="Polling Interval"
                />
               
              </Group>
            )}

            <Group style={{marginTop:"10px",marginBottom:"10px"}}>
              
              <BTN Solid= {(!bypassExecution)?"Solid":"_"} disabled={!(!bypassExecution)} Text="RUN" type="submit"/>
            </Group>
          </FormWrapper>
        )}
      </AdaptorForm>
      <Group style={{marginLeft:"400px",marginTop:"20px"}}>
      <Group style={{marginBottom:"10px"}}>
            <Switch
                inputlabel="Bypass Execution"
                checked={bypassExecution}
                
                onChange={(ev, val) => {
                  setBypassExecution(val);
                }}
              />
            </Group>
            
      <Editor
                  disabled={!bypassExecution}
                  value={JSON.stringify(inputSpecData,null,4)}
                  highlight={value => highlight(value, languages.jsx)}
                  padding={20}
                  
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    overflow: 'auto',
                   
                    flex: "display",
                    width: '500px',
                    height: "250px",
                    border: '1px solid',
                    borderColor: bypassExecution ? 'black' : '#b7b0b0',
                    borderRadius: '3px',
                  }}
                /></Group>
                </div>
    </div>
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
