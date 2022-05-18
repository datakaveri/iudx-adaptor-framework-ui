import React from 'react';
import {Switch,TextField } from '@mui/material';
import styled from 'styled-components';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

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
background-color: white;
color: rgb(31, 31, 31);
border-radius: 6px;
border-color: rgb(31, 31, 31);
margin-right: 20px;
height: 48px;
font-family: 'Inter';
padding: 0px 30px;
margin-top: 20px;
`
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
        <div style={{marginTop:"20px"}}>
        <ColoredButton>Run</ColoredButton>
        <BorderedButton>Stop Execution</BorderedButton>
        </div>
        </div>
  );
}