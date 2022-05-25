import React from 'react';
import {Switch,TextField } from '@mui/material';
import styled from 'styled-components';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
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
export default function FailureRecoverySpec() {

    const [delay, setDelay] = React.useState('');
    
   
    return (
        <div className='app'>
        <Title>Failure Recovery Spec</Title>
        <hr/>
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

        <div style={{marginTop:"20px"}}>
        <ColoredButton>Run</ColoredButton>
        <BorderedButton>Stop Execution</BorderedButton>
        </div>
        </div>
  );
}