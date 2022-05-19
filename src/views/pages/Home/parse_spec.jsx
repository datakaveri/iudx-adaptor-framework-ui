import React from 'react';
import {TextField } from '@mui/material';
import styled from 'styled-components';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const Title = styled.h1`
font-family: 'Inter';
  font-size: 32px;
  padding-left:80px;
  color: black;
`;

const Type=styled.h3`
font-family: 'Inter';
font-size:14px;
padding-left:80px;
padding-top:8px;`

const ColoredButton=styled.button`
font-family: 'Inter';
background-color: rgb(31, 31, 31);
    color: white;
    border-radius: 5px;
    border-color: rgb(31, 31, 31);
    margin-right: 20px;
    height: 48px;
    margin-left: 80px;
    padding: 0px 30px;
    margin-top: 20px;
`
const BorderedButton=styled.button`
font-family: 'Inter';
background-color: white;
color: rgb(31, 31, 31);
border-radius: 6px;
border-color: rgb(31, 31, 31);
margin-right: 20px;
height: 48px;

padding: 0px 30px;
margin-top: 20px;
`
export default function ParseSpec(){
    const [format, setFormat] = React.useState('');
    const [message, setMessage]=React.useState(' ');
    return (
        <div className='app'>
        <Title>Parse Spec</Title>
        <hr/>
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
        <TextField multiline rows={4} style={{marginLeft:"80px" }} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>TimeStamp path</Type>
        <TextField multiline rows={4} style={{marginLeft:"80px" }} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>KeyPath</Type>
        <TextField multiline rows={4} style={{marginLeft:"80px" }} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        <Type>Trickle</Type>
        <TextField multiline rows={4} style={{marginLeft:"80px" }} id="outlined-basic"  variant="outlined" size="small" fullWidth/>
        </div>

        <div style={{marginTop:"20px"}}>
        <ColoredButton>Run</ColoredButton>
        <BorderedButton>Stop Execution</BorderedButton>
        </div>
        </div>
  );
}


