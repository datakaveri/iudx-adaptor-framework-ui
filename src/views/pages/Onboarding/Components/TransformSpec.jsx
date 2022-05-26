import React from 'react';
import styled from 'styled-components';
import Select from '@mui/material/Select';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import "prismjs/themes/prism.css";
import { display } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';

require('prismjs/components/prism-jsx');

export default function TransformSpec(){
    const [format, setFormat] = React.useState('');
    const [jsonData,setData]=React.useState(' ');
    return (
        <div className='app'>
        <Title>Transform Spec</Title>
        <hr/>
        <div style={{display:'flex', flexDirection:"row"}}>
        <div style={{width:"320px"}} className="textbox">
        
        <Type>Type</Type>
        <FormControl sx={{ m: 1, minWidth: "320px",marginLeft:"80px" }}>
        <InputLabel id="formattype">Select</InputLabel>
        <Select
          labelId="format"
          id="format"
          value={format}
          label="Select"
          onChange={e=>setFormat(e.target.value)}
        >  
          <MenuItem value='Jolt'>Jolt</MenuItem>
          <MenuItem value='JSON'>JSON</MenuItem>
          <MenuItem value="JsPath">JsPath</MenuItem>
        </Select>
      </FormControl>
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
