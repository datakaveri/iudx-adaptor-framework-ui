import React from 'react';
import { Title, Line } from '../../../shared/components/SpecComponents';

export default function DuplicationSpec() {
  return (
    <div className="app">
      <Title>Duplicate Specs</Title>
      <Line />
      <label htmlFor="dupDropDown">Type </label>
      <br />
      <select id="dupDropDown">
        <option value="TimeBased">Time Based</option>
        <option value="ExtraKeyBased">Extra Key Based</option>
      </select>
    </div>
  );
}
