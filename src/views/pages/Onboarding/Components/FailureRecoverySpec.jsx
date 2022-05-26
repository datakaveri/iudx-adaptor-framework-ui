import React from 'react';
import {Switch,TextField } from '@mui/material';
import styled from 'styled-components';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import "prismjs/themes/prism.css";
import { display } from '@mui/system';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';


export default function FailureRecoverySpec() {

    const [delay, setDelay] = React.useState('');
    const [jsonData,setData]=React.useState(' ');
   
    return (
        <div className='app'>
        <Title>Failure Recovery Spec</Title>
        <hr/>
        <div style={{display:'flex', flexDirection:"row"}}>
        <div style={{width:"320px"}} className="textbox">
        
        <Type>Type</Type>
        <FormControl sx={{ m: 1, minWidth: "320px",marginLeft:"80px" }}>
        <InputLabel id="delaytype">Select</InputLabel>
        <Select
          labelId="delaytype"
          id="delaytype"
          value={delay}
          label="Select"
          onChange={e=>setDelay(e.target.value)}
        >  
        <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value='Fixed Delay'>Fixed Delay</MenuItem>
          <MenuItem value="Exponential Delay">Exponential Delay</MenuItem>
        </Select>
      </FormControl>


        
        { delay==="Fixed Delay"?(
          <>
          <Type>Attemps</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Delay</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>

          </>
        ):
        (
        <>
        
        <Type>Initial Backoff</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Max Backoff</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Backoff Multiplier</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Reset Backoff Threshold</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Jitter Factor</Type>
        <TextField style={{marginLeft:"80px"}} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        </>
        
       )}
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