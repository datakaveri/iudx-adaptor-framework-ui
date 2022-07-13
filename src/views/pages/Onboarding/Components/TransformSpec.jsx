import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import { Title } from '../../../shared/components/SpecComponents';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput, {
  SwitchDiv,
} from '../../../shared/components/AdaptorInput';

import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import ToastsAction from '../../../../stores/toasts/ToastsAction';
import TransformSpecInputModel from '../../../../stores/adaptor/models/specInput/transformSpec/TransformSpecInputModel';
import TransformSpecResponseModel from '../../../../stores/adaptor/models/transformSpecResponse/TransformSpecResponseModel';
import ParseSpecResponseModel from '../../../../stores/adaptor/models/parseSpecResponse/ParseSpecResponseModel';

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const selectOptions = [
  { key: 'Jolt', value: 'jolt' },
  { key: 'Vanilla Javascript', value: 'js' },
  { key: 'jsPath', value: 'jsPath' },
];



const TransformSpec = ({
  dispatch,
  parseSpec,
  transformSpec,
  transformSpecInput,
}) => {
  const [transformSpecData, setTransformSpecData] = useState('');
  const [jsonSpec, setJsonSpec] = useState('');
  const [jtitle,setJtitle]=useState('');

  useEffect(() => {
    setTransformSpecData(transformSpec);
    setJsonSpec(
      transformSpecInput.jsonPathSpec.length === 0
        ? ''
        : JSON.stringify(transformSpecInput.jsonPathSpec, null, 4),
    );
  }, [transformSpec]);
  const handleChange = value => {
    console.log('Changed');
    console.log(value.target.value)
    setJtitle(value.target.value)
  };

  return (
    <div>
      <Title>Transform Spec</Title>
      <hr />
      <div style={{ marginLeft: '80px' }}>
        <div style={{ display: 'flex' }}>
          <AdaptorForm
            onSubmit={values => {
              const tfSpec = {
                type: jtitle,
                template: jtitle === "jsPath"? values.template:
                 "",
                jsonPathSpec: JSON.parse(jsonSpec),
              };
              const requestBody = {
                // inputData: parseSpec.result,
                inputData:    [{
                  "id": "123",
                  "k": 1.5,
                  "time": "2021-04-01T12:00:01+05:30"
                },
                {
                  "id": "4356",
                  "k": 2.5,
                  "time": "2021-04-01T12:00:01+05:30"
                }],
                transformSpec: tfSpec,
              };
              const headers = {
                username: 'user',
                password: 'user-password',
                'Content-Type': 'application/json',
              };
              dispatch(
                ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
              );
              dispatch(
                AdaptorAction.saveTransformSpec(
                  new TransformSpecInputModel(requestBody),
                ),
              );
              dispatch(
                AdaptorAction.requestTransformSpec(requestBody, headers),
              );
            }}>
            {() => (
              <FormWrapper>
                <Group>
                  {/* <AdaptorInput
                    inputlabel="Type"
                    inputtype="select"
                    selectoptions={selectOptions}
                    name="type"
                    initialValue={transformSpecInput.type}
                  /> */}
                  <InputLabel>
                  Type
                  </InputLabel>
                  <Select style={{width:"300px"}} onChange={handleChange}>
                    {selectOptions.map(el => (
                      <MenuItem key={el.key} value={el.value} >
                        {el.value}
                      </MenuItem>
                    )
                    )}
                  </Select>
                </Group>

                  {jtitle === "jsPath"?
                  <Group style={{marginTop:"10px"}}>
                  
                  <AdaptorInput
                    inputlabel="Template"
                    name="template"
                    placeholder=""
                    initialValue=" "
                  />
                </Group>:""

                  }
                <Group>
                  <InputLabel style={{ marginLeft: '10px',marginTop:"10px" }}>
                    {jtitle}
                  </InputLabel>
                  <Editor
                    disabled={false}
                    value={jsonSpec}
                    highlight={value => highlight(value, languages.jsx)}
                    padding={15}
                    onValueChange={value => setJsonSpec(value)}
                    style={{
                      fontFamily: '"Fira code", "Fira Mono", monospace',
                      fontSize: 14,
                      overflow: 'auto',
                      marginTop: '5px',
                      flex: 'display',
                      width: '500px',
                      height: '250px',
                      border: '1px solid',
                      borderColor: 'black',
                      borderRadius: '3px',
                    }}
                  />
                </Group>

                <Group style={{ marginTop: '10px', marginBottom: '10px' }}>
                  <Button type="submit">Run</Button>
                </Group>
              </FormWrapper>
            )}
          </AdaptorForm>
          <Group style={{ marginLeft: '400px', marginTop: '20px' }}>
            <SwitchDiv>
              <InputLabel>JSON Response</InputLabel>
            </SwitchDiv>
            <Editor
              disabled
              value={
                transformSpecData.message === ''
                  ? ''
                  : JSON.stringify(transformSpecData, null, 4)
              }
              highlight={value => highlight(value, languages.jsx)}
              padding={20}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
                overflow: 'auto',

                flex: 'display',
                width: '500px',
                height: '250px',
                border: '1px solid',
                borderColor: '#b7b0b0',
                borderRadius: '3px',
              }}
            />
          </Group>
        </div>
      </div>
    </div>
  );
};

TransformSpec.propTypes = {
  dispatch: PropTypes.func.isRequired,
  parseSpec: PropTypes.instanceOf(ParseSpecResponseModel).isRequired,
  transformSpec: PropTypes.instanceOf(TransformSpecResponseModel).isRequired,
  transformSpecInput: PropTypes.instanceOf(TransformSpecInputModel).isRequired,
};

const mapStateToProps = state => ({
  parseSpec: new ParseSpecResponseModel(state.adaptorReducer.parseSpec),
  transformSpec: new TransformSpecResponseModel(
    state.adaptorReducer.transformSpec,
  ),
  transformSpecInput: new TransformSpecInputModel(
    state.adaptorReducer.transformSpecInput,
  ),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransformSpec);
