import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import "prismjs/themes/prism.css";
import { display } from '@mui/system';
import FormControl from '@mui/material/FormControl';
import { Title ,Type} from '../../../shared/components/SpecComponents';

require('prismjs/components/prism-jsx');

export default function DuplicationSpec() {
  const [type, setType] = React.useState(' ');
  const [jsonData,setData]=React.useState(' ');
  return (
    <div className="app">
      <Title>Deduplication Spec</Title>
      <hr />
      <div style={{display:'flex', flexDirection:"row"}}>
        <div>
      <FormControl sx={{ m: 1, minWidth: '320px', marginLeft: '80px' }}>
        <InputLabel id="dup" style={{ padding: '8px 0px 0px 0px' }}>
          Type
        </InputLabel>
        <Select
          id="dupDropDown"
          labelId="dupDropDown"
          value={type}
          label="dupDropDown"
          onChange={e => setType(e.target.value)}>
          <MenuItem value="TimeBased">Time Based</MenuItem>
          <MenuItem value="ExtraKeyBased">Extra Key Based</MenuItem>
        </Select>
      </FormControl>
      </div>
      <div style={{width:"450px",marginLeft:"150px"}} className="textbox">
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
    </div>
  );
}
