import React from 'react';
import {Switch,TextField } from '@mui/material';

import BTN, { Title, Type } from '../../../shared/components/SpecComponents';


export default function PublishSpec() {


    return (
        <div className='app'>
        <Title>Publish Spec</Title>
        <hr/>
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
        <div style={{marginTop:"20px",marginLeft:"80px"}}>
        <BTN Solid="Solid" Text="Run" />
        <BTN Solid="_" Text="Stop Execution" />
        </div>
        </div>
  );
}