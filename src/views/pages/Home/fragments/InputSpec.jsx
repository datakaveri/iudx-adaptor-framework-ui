import React from 'react';
import { Switch } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import styled from 'styled-components';
import InputBox from '../../../shared/components/InputBox';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const InputSpecScheduleJobDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  &:p {
    margin-right: 200px;
  }
`;

export default function InputSpec() {
  const [scheduleJob, setScheduleJob] = React.useState(false);
  const [type, setType] = React.useState(' ');
  const [api, setAPI] = React.useState(' ');

  return (
    <div className="app">
      <Title>Input Specs</Title>
      <hr />
      <form>
        <div style={{ width: '320px' }} className="textbox">
          <FormControl sx={{ m: 1, minWidth: '320px', marginLeft: '80px' }}>
            <InputLabel id="Type" style={{ padding: '8px 0px 0px 0px' }}>
              Type
            </InputLabel>
            <Select
              labelId="TypeDropDown"
              id="TypeDropDown"
              value={type}
              label="TypeDropDown"
              onChange={e => setType(e.target.value)}>
              <MenuItem value="HTTP">HTTP</MenuItem>
              <MenuItem value="MQTT">MQTT</MenuItem>
              <MenuItem value="AMQP">AMQP</MenuItem>
              <MenuItem value="GRPC">GRPC</MenuItem>
            </Select>
          </FormControl>
          <InputBox name="URL" id="URLId" />
          <br />
          <FormControl sx={{ m: 1, minWidth: '320px', marginLeft: '80px' }}>
            <InputLabel id="requestType" style={{ padding: '8px 0px 0px 0px' }}>
              Request Type
            </InputLabel>
            <Select
              id="apiType"
              labelId="apiType"
              value={api}
              label="apiType"
              onChange={e => setAPI(e.target.value)}>
              <MenuItem value="GET">GET</MenuItem>
              <MenuItem value="POST">POST</MenuItem>
            </Select>
          </FormControl>
          <br />
          <InputSpecScheduleJobDiv>
            <Type>Schedule Job</Type>
            <Switch
              {...label}
              checked={scheduleJob}
              onChange={(ev, val) => setScheduleJob(val)}
            />
          </InputSpecScheduleJobDiv>
        </div>

        {!scheduleJob ? (
          <div style={{ width: '320px' }} className="textbox">
            <InputBox name="Polling Interval" id="PollingId" />
          </div>
        ) : (
          <>
            <Title className="Title">Minio Config</Title>
            <hr />
            <div style={{ width: '320px' }} className="textbox">
              <InputBox name="URL" id="URLId2" />
              <InputBox name="Bucket" id="BucketId" />
              <InputBox name="State Name" id="StateNameId" />
              <InputBox name="Access Key" id="AccessKeyId" />
              <InputBox name="Secret Key" id="SecretKeyId" />
            </div>
          </>
        )}
        <div style={{ marginLeft: '80px' }}>
          <BTN Solid="Solid" Text="Run" />
          <BTN Solid="_" Text="Stop Execution" />
        </div>
      </form>
    </div>
  );
}
