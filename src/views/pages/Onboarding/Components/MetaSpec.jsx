import React from 'react';
import styled from 'styled-components';
import InputBox from '../../../shared/components/InputBox';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';


export default function MetaSpec() {
  
  return (
    <div className="app">
      <Title>Meta Spec</Title>
      <hr />
      <form>
        <div style={{ width: '320px' }} className="textbox">
          
          <InputBox name="Name" />
        <InputBox name="Schedule Pattern" id="SchedulePattern" />
        </div>

       
      
      </form>
    </div>
  );
}
