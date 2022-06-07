import React from 'react';
import { TextField } from '@mui/material';
import Adapter from './Components/Adapter';

import { Line } from '../../shared/components/SpecComponents';
import ImageButton from '../../shared/components/ImageButton';

export default function MyAdaptersPage() {
  return (
    <>
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
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '40%',
          }}>
          <h1>My Adapters</h1>
          <ImageButton
            Solid="Solid"
            Text="Create New"
            color="#2D3648"
            icon="add.png"
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            placeholde="Search"
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
          <p style={{ margin: '0px', width: '30%', textAlign: 'center' }}>
            <b>Last Used</b>
          </p>
          <p style={{ margin: '0px', width: '30%', textAlign: 'end' }}>
            <b>Status</b>
          </p>
        </div>
        <div />
      </div>
      <Line />
      <Adapter name="Adapter1" last="27, Jan, 2022, 17:45" status="Running" />
      <Adapter name="Adapter1" last="27, Jan, 2022, 17:45" status="" />
    </>
  );
}
