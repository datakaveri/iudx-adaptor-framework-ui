import React from 'react';
import styled from 'styled-components';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';
import { display } from '@mui/system';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';
import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import TransformSpecResponseModel from '../../../../stores/adaptor/models/transformSpecResponse/TransformSpecResponseModel';

require('prismjs/components/prism-jsx');

const TransformSpec = ({ dispatch, transformSpec }) => {
  const [format, setFormat] = React.useState('');
  const [jsonData, setData] = React.useState(' ');

  const callTransformSpec = () => {
    dispatch(
      AdaptorAction.requestTransformSpec({
        inputData: [
          {
            id: '123',
            k: 1.5,
            time: '2021-04-01T12:00:01+05:30',
          },
          {
            id: '4356',
            k: 2.5,
            time: '2021-04-01T12:00:01+05:30',
          },
        ],
        transformSpec: {
          type: 'jsPath',
          template:
            "{ 'observationDateTime': '2021', 'co2': { 'avgOverTime': 100}, 'id': 'abc'}",
          jsonPathSpec: [
            {
              outputKeyPath: '$.observationDateTime',
              inputValuePath: '$.time',
            },
            {
              outputKeyPath: '$.co2.avgOverTime',
              inputValuePath: '$.k1',
            },
            {
              outputKeyPath: '$.name',
              inputValuePath: '$.k2',
              regexFilter: '^(?!.*reject).*',
            },
            {
              outputKeyPath: '$.id',
              inputValuePath: '$.deviceId',
              valueModifierScript: "value.split('-')[0]",
            },
          ],
        },
      }),
    );
  };

  return (
    <div className="app">
      <Title>Transform Spec</Title>
      <hr />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ width: '320px' }} className="textbox">
          <Type>Type</Type>
          <FormControl sx={{ m: 1, minWidth: '320px', marginLeft: '80px' }}>
            <InputLabel id="formattype">Select</InputLabel>
            <Select
              labelId="format"
              id="format"
              value={format}
              label="Select"
              onChange={e => setFormat(e.target.value)}>
              <MenuItem value="Jolt">Jolt</MenuItem>
              <MenuItem value="JSON">JSON</MenuItem>
              <MenuItem value="JsPath">JsPath</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div
          style={{ width: '500px', marginLeft: '250px' }}
          className="textbox">
          <Type>Json Data</Type>
          <Editor
            disabled
            value={jsonData}
            highlight={value => highlight(value, languages.jsx)}
            padding={50}
            onValueChange={value => setData(value)}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              overflow: 'auto',
              marginLeft: '80px',
              flex: display,
              width: '100%',
              border: '1px solid #b7b0b0',
              borderRadius: '3px',
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: '20px', marginLeft: '80px' }}>
        <BTN Solid="Solid" Text="Run" />
        <BTN Solid="_" Text="Stop Execution" />
        <Button onClick={callTransformSpec}>Click me</Button>
      </div>
    </div>
  );
};

TransformSpec.propTypes = {
  dispatch: PropTypes.func.isRequired,
  transformSpec: PropTypes.instanceOf(TransformSpecResponseModel).isRequired,
};

const mapStateToProps = state => ({
  transformSpec: state.adaptorReducer.transformSpec,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransformSpec);
