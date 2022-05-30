import React,{useEffect} from 'react';
import {TextField } from '@mui/material';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import Select from '@mui/material/Select';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import 'prismjs/components/prism-markup';
import "prismjs/themes/prism.css";
import { display } from '@mui/system';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';

require('prismjs/components/prism-jsx');

const axios = require('axios').default;

const baseURL= 'http://0.0.0.0:4010'

export default function ParseSpec(){
    const [format, setFormat] = React.useState('');
    const [message, setMessage]=React.useState(' ');
    const [code, setCode]=React.useState(' ');
    const [timestamp, setTimeStamp]=React.useState(' ');
    const [keypath, setkeyPath]=React.useState(' ');
    const [trickle, setTrickle]=React.useState(' ');
    const [jsonData,setData]=React.useState(' ');

    const getData=async ()=>{
      await axios({
          method: 'post',
          url: `${baseURL}/onboard/run-parse-spec`,
          headers: {}, 
          data: {
            "inputData": {
              "outerkey": "outerkeyval",
              "data": [
                {
                  "time": "2022-05-20T09:09:56Z",
                  "k1": 185,
                  "deviceId": "abc-123"
                },
                {
                  "time": "2022-05-20T09:09:56Z",
                  "k1": 185,
                  "deviceId": "abc-123"
                }
              ]
            },
            "parseSpec": {
              "type": "json",
              "messageContainer": "array",
              "containerPath": "$.messages",
              "timestampPath": "$.time",
              "inputTimeFormat": "yyyy-MM-dd HH:mm:ss",
              "outputTimeFormat": "yyyy-MM-dd'T'HH:mm:ssXXX",
              "keyPath": "$.deviceId",
              "trickle": [
                {
                  "keyPath": "$.someParentKey",
                  "keyName": "someNewKeyName"
                },
                {
                  "keyPath": "$.time",
                  "keyName": "time"
                }
              ]
            }
          }
        }).then(
          (response)=>{
              const responseJson=response
              console.log(response.data)
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
        <div className='app'>
        <Title>Parse Spec</Title>
        <hr/>
        <div style={{display:'flex', flexDirection:"row"}}>
        <div style={{width:"320px"}} className="textbox">
        <Type>Serialization Format Type</Type>
        <FormControl sx={{ m: 1, minWidth: "320px",marginLeft:"80px" }}>
        <InputLabel id="formattype">Select</InputLabel>
        <Select
          labelId="format"
          id="format"
          value={format}
          label="Select"
          onChange={e=>setFormat(e.target.value)}
        >  
        <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value='JSON'>JSON</MenuItem>
          <MenuItem value="XML(Currently Not Supported">XML(Currently Not Supported)</MenuItem>
        </Select>
      </FormControl>
      <Type>Message Container</Type>
        <FormControl sx={{ m: 1, minWidth: "320px",marginLeft:"80px" }}>
        <InputLabel id="messagetype">Select</InputLabel>
        <Select
          labelId="message"
          id="message"
          value={message}
          label="Select"
          onChange={e=>setMessage(e.target.value)}
        >  
          <MenuItem value='Array'>Array</MenuItem>
          <MenuItem value="String">String</MenuItem>
        </Select>
      </FormControl>
      <Type>Input Datatime Format</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Output Datatime Format</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Container Path</Type>
  

      <Editor value={code} highlight={(value)=>highlight(value, languages.jsx)} padding={25}
        onValueChange={(value)=>setCode(value)}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          marginLeft:"80px",
          width: "100%",
          overflow: 'auto',
          border: "1px solid #b7b0b0",
          borderRadius:"3px",
        }}/>
      
        <Type>TimeStamp path</Type>
        <Editor value={timestamp} highlight={(value)=>highlight(value, languages.jsx)} padding={25}
        onValueChange={(value)=>setTimeStamp(value)}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          overflow: 'auto',
          marginLeft:"80px",
          flex: display,
          width: "100%",
          border: "1px solid #b7b0b0",
          borderRadius:"3px"
        }}/>
        <Type>KeyPath</Type>
        <Editor value={keypath} highlight={(value)=>highlight(value, languages.jsx)} padding={25}
        onValueChange={(value)=>setkeyPath(value)}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12,
          overflow: 'auto',
          marginLeft:"80px",
          flex: display,
          width: "100%",
          border: "1px solid #b7b0b0",
          borderRadius:"3px"
        }}/>
        <Type>Trickle</Type>
        <Editor value={trickle} highlight={(value)=>highlight(value, languages.jsx)} padding={25}
        onValueChange={(value)=>setTrickle(value)}
        style={{
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
        <div style={{width:"500px",marginLeft:"250px"}} className="textbox">
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
        <div style={{marginTop:"20px",marginLeft:"80px"}}>
        <BTN Solid="Solid" Text="Run" />
        <BTN Solid="_" Text="Stop Execution" />
        </div>
        </div>
  );
}


