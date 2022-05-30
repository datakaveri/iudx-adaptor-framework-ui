import React,{useEffect} from 'react';
import { Switch, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import "prismjs/themes/prism.css";
import { display } from '@mui/system';
import InputBox from '../../../shared/components/InputBox';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';
// import getData from '../../../../stores/RunInputSpecAPI/runinputspec'

const axios = require('axios').default;

const baseURL= 'http://0.0.0.0:4010'

require('prismjs/components/prism-jsx');

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
  const [jsonData,setData]=React.useState('');
  
  const getData=async ()=>{
    await axios({
        method: 'post',
        url: `${baseURL}/onboard/run-input-spec`,
        headers: {}, 
        data: {
            
                "inputSpec": {
                  "type": "http",
                  "url": "https://rs.iudx.org.in/ngsi-ld/v1/entity/abc",
                  "requestType": "GET",
                  "pollingInterval": -1,
                  "headers": {
                    "content-type": "application/json"
                  },
                  "boundedJob": true,
                  "minioConfig": {
                    "url": "http://minio1:9000",
                    "bucket": "custom-state",
                    "stateName": "test-state-job",
                    "accessKey": "minio",
                    "secretKey": "minio123"
                  }
                }
              
        }
      }).then(
        (response)=>{
            const responseJson=response
            console.log(response.data.result.data[0])
            // return responseJson.data.result
            setData(JSON.stringify(response.data,null,4))
        }
    ).catch(
        (error)=>{
            console.log(error)
        }
    );
    }

  useEffect(() => {
      getData()
  },[]);


  return (
    <div className="app">
      <Title>Input Spec</Title>
      <hr />
      <div style={{display:'flex', flexDirection:"row"}}>
      <div>
      <form>
        <div style={{ width: '320px' }} className="textbox">
          <FormControl sx={{ m: 1, minWidth: '320px', marginLeft: '80px',marginTop:"8px"}}>
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
        <div style={{ marginLeft: '80px',display:'flex',flexDirection:'row' }}>
          <BTN Solid="Solid" Text="Run" />
          <BTN Solid="_" Text="Stop Execution" />
        </div>
      </form>
      </div>
      <div>
        
        {/* <TextField value={jsonData}/> */}
      <div style={{width:"450px",marginLeft:"200px"}} className="textbox">
        <Type>Json Data</Type>
        <Editor disabled value={jsonData}
         highlight={(value)=>highlight(value, languages.js)} padding={10}
        
        style={{
          height:(jsonData)?"400px":"150px",
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          overflow: 'auto',
          marginLeft:"80px",
          flex: display,
          width: "100%",
          border: "1px solid #b7b0b0",
          borderRadius:"3px"
        }}/>
        </div>
      </div>
      </div>
    </div>
  );
}
