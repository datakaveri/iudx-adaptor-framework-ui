import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Title, Line } from '../../../shared/components/SpecComponents';

export default function DuplicationSpec() {
  const [type, setType] = React.useState(' ');

  return (
    <div className="app">
      <Title>Duplicate Specs</Title>
      <Line />
      <FormControl sx={{ m: 1, minWidth: '320px', marginLeft: '0px' }}>
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
  );
}
