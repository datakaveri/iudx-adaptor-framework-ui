import React from 'react';
import { Switch } from '@mui/material';
import InputBox from '../../../shared/components/InputBox';
import {
  InputSpecScheduleJobDiv,
  Title,
  Line,
  ColoredButton,
} from '../../../shared/components/SpecComponents';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function InputSpec() {
  const [scheduleJob, setScheduleJob] = React.useState(false);

  return (
    <div className="app">
      <Title>Input Specs</Title>
      <Line />
      <form>
        <label htmlFor="TypeDropDown">
          Type
          <br />
          <select id="TypeDropDown">
            <option value="HTTP">HTTP</option>
            <option value="MQTT">MQTT</option>
            <option value="AMQP">AMQP</option>
            <option value="GRPC">GRPC</option>
          </select>
        </label>
        <br />
        <InputBox name="URL" id="URLId" />
        <label htmlFor="apiType">
          Request Type
          <br />
          <select id="apiType">
            <option value="GET">GET</option>
            <option value="POST">POST</option>
          </select>
        </label>
        <br />
        <InputSpecScheduleJobDiv>
          <p>Schedule Job</p>
          <Switch
            {...label}
            checked={scheduleJob}
            onChange={(ev, val) => setScheduleJob(val)}
          />
        </InputSpecScheduleJobDiv>

        {!scheduleJob ? (
          <InputBox name="Polling Interval" id="PollingId" />
        ) : (
          <>
            <Title className="Title">Minio Config</Title>
            <Line />
            <InputBox name="URL" id="URLId2" />
            <InputBox name="Bucket" id="BucketId" />
            <InputBox name="State Name" id="StateNameId" />
            <InputBox name="Access Key" id="AccessKeyId" />
            <InputBox name="Secret Key" id="SecretKeyId" />
          </>
        )}

        <ColoredButton
          solid
          onClick={() => console.log('CLICKED')}
          type="button">
          Run
        </ColoredButton>

        <ColoredButton onClick={null} type="button">
          Stop Execution
        </ColoredButton>
      </form>
    </div>
  );
}
