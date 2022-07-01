import React from 'react';
import { TextField } from '@mui/material';
import Adapter from './Components/Adapter';

import { Line } from '../../shared/components/SpecComponents';
import ImageButton from '../../shared/components/ImageButton';

export default function MyAdaptersPage() {
  return (
   <div style={{alignContent:"center",alignItems:"center",justifyContent:"center",display:"flex"}}>
    <div style={{width:"80%"}}>
      <div
        style={{
          
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'center',
            width: '40%',
          }}>
          <h1>My Adapters</h1>
          <div style={{ width: '50px' }} />
          <ImageButton
            Solid="Solid"
            Text="Create New"
            color="#2D3648"
            hoverColor="white"
            icon="add.png"
            hoverIcon="addGrey.png"
            hoverTextColor="#2D3648"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholder="Search"
          />
        </div>
      </div>
      <div
        style={{
          
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '70%',
          }}>
          <p style={{ margin: '0px', width: '30%', textAlign: 'start' }}>
            <b>Name</b>
          </p>
          <p style={{ margin: '0px', width: '30%', textAlign: 'start' }}>
            <b>Last Used</b>
          </p>
          <p style={{ margin: '0px', width: '30%', textAlign: 'start' }}>
            <b>Status</b>
          </p>
        </div>
        <div />
      </div>
      <Line />
      <Adapter name="Adapter1" last="27, Jan, 2022, 17:45" status="Running" />
      <Adapter name="Adapter1" last="27, Jan, 2022, 17:45" status="" />
      </div>
      </div>
  );
}
