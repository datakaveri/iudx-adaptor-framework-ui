import React from 'react';
import { Switch } from '@mui/material';
import InputBox from '../../../shared/components/InputBox';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function InputSpec() {
  const [scheduleJob, setScheduleJob] = React.useState(false);

  return (
    <div className="app">
      <h1 className="Title">Input Specs</h1>
      <hr />
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
        <div className="InputSpec_ScheduleJob">
          <p>Schedule Job</p>
          <Switch
            {...label}
            checked={scheduleJob}
            onChange={(ev, val) => setScheduleJob(val)}
          />
        </div>

        {!scheduleJob ? (
          <InputBox name="Polling Interval" id="PollingId" />
        ) : (
          <>
            <h1 className="Title">Minio Config</h1>
            <hr />
            <InputBox name="URL" id="URLId2" />
            <InputBox name="Bucket" id="BucketId" />
            <InputBox name="State Name" id="StateNameId" />
            <InputBox name="Access Key" id="AccessKeyId" />
            <InputBox name="Secret Key" id="SecretKeyId" />
          </>
        )}

        <button className="ColoredButton" onClick={null} type="button">
          Run
        </button>

        <button className="BoderedButton" onClick={null} type="button">
          Stop Execution
        </button>
      </form>
    </div>
  );
}
