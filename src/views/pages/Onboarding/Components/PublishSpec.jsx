import React from 'react';
import {Switch,TextField } from '@mui/material';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import "prismjs/themes/prism.css";
import { display } from '@mui/system';

import BTN, { Title, Type } from '../../../shared/components/SpecComponents';

require('prismjs/components/prism-jsx');

export default function PublishSpec() {
  const [jsonData,setData]=React.useState(' ');
    return (
        <div className='app'>
        <Title>Publish Spec</Title>
        <hr/>
        <div style={{display:'flex', flexDirection:"row"}}>
        <div style={{width:"320px"}} className="textbox">
        <Type>Type</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>URL</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Port</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Username</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Password</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Sink Name</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Tag Name</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        </div>
        <div style={{width:"500px",marginLeft:"250px"}} className="textbox">
        <Type>Json Data</Type>
        <Editor disabled value={jsonData} highlight={(value)=>highlight(value, languages.jsx)} padding={50}
        onValueChange={(value)=>setData(value)}
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
        </div>
        <div style={{marginTop:"20px",marginLeft:"80px"}}>
        <BTN Solid="Solid" Text="Run" />
        <BTN Solid="_" Text="Stop Execution" />
        </div>
        </div>
  );
}