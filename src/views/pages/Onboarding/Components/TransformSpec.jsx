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
import EditorStyle from '../../../shared/constants/EditorStyle';
import Loader from '../../../shared/components/Loader';

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

const LeftMargin = styled.div`
  margin-left: 80px;
`;

const Flex = styled.div`
  display: flex;
`;

const TransformSpec = ({
  dispatch,
  parseSpec,
  transformSpec,
  transformSpecInput,
}) => {
  const [transformSpecData, setTransformSpecData] = useState('');
  const [jsonSpec, setJsonSpec] = useState('');
  const [jtitle, setJtitle] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTransformSpecData(transformSpec);
    let javascript = '';
    if (transformSpecInput.type === 'jsPath')
      javascript = transformSpecInput.jsonPathSpec;
    else if (transformSpecInput.type === 'js')
      javascript = transformSpecInput.script;
    else if (transformSpecInput.type === 'jolt')
      javascript = transformSpecInput.joltSpec;
    else javascript = '';
    setJsonSpec(javascript);
  }, [transformSpec]);

  const handleChange = value => {
    setJtitle(value.target.value);
  };

  return (
    <div>
      <Loader open={loader} message="Running Transform Spec" />
      <Title>Transform Spec</Title>
      <hr />
      <LeftMargin>
        <Flex>
          <AdaptorForm
            onSubmit={async values => {
              const tfSpec = {
                type: jtitle,
                template: jtitle === 'jsPath' ? values.template : undefined,
                joltSpec: jtitle === 'jolt' ? jsonSpec : undefined,
                script: jtitle === 'js' ? jsonSpec : undefined,
                jsonPathSpec: jtitle === 'jsPath' ? jsonSpec : undefined,
              };
              const requestBody = {
                inputData: parseSpec.result,

                transformSpec: tfSpec,
              };
              const headers = {
                'Content-Type': 'application/json',
              };
              dispatch(AdaptorAction.saveTransformSpec(tfSpec));
              setLoader(true);
              await dispatch(
                AdaptorAction.requestTransformSpec(requestBody, headers),
              );
              setLoader(false);
              dispatch(
                ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
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
                  <InputLabel>Type</InputLabel>
                  <Select
                    style={{ width: '300px' }}
                    defaultValue={transformSpecInput.type}
                    onChange={handleChange}>
                    {selectOptions.map(el => (
                      <MenuItem key={el.key} value={el.value}>
                        {el.value}
                      </MenuItem>
                    ))}
                  </Select>
                </Group>

                {jtitle === 'jsPath' || transformSpecInput.type === 'jsPath' ? (
                  <Group style={{ marginTop: '10px' }}>
                    <AdaptorInput
                      inputlabel="Template"
                      name="template"
                      placeholder=""
                      initialValue={transformSpecInput.template}
                    />
                  </Group>
                ) : (
                  ''
                )}
                <Group>
                  <InputLabel style={{ marginLeft: '10px', marginTop: '10px' }}>
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
              <InputLabel>Input Data</InputLabel>
            </SwitchDiv>
            <Editor
              disabled
              value={
                parseSpec.message === ''
                  ? ''
                  : JSON.stringify(JSON.parse(parseSpec.result[0]), null, 4)
              }
              highlight={value => highlight(value, languages.jsx)}
              padding={20}
              style={EditorStyle}
            />
            <SwitchDiv style={{ marginTop: '25px' }}>
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
              style={EditorStyle}
            />
          </Group>
        </Flex>
      </LeftMargin>
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
