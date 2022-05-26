import React from 'react';
import styled from 'styled-components';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';


export default function TransformSpec(){
    const [format, setFormat] = React.useState('');
    return (
        <div className='app'>
        <Title>Transform Spec</Title>
        <hr/>
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

        <div style={{marginTop:"20px",marginLeft:"80px"}}>
        <BTN Solid="Solid" Text="Run" />
        <BTN Solid="_" Text="Stop Execution" />
        </div>
        </div>
  );
}
