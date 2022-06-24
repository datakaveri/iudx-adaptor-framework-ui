import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button, InputLabel, Switch } from '@mui/material';
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
import InputSpecInputModel from '../../../../stores/adaptor/models/specInput/inputSpec/InputSpecInputModel';

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

const TransformSpec2 = ({ dispatch, transformSpecInput }) => (
  <div>
    <Title>Transform Spec</Title>
    <hr />
    <div style={{ marginLeft: '80px' }}>
      <div style={{ display: 'flex' }}>
        <AdaptorForm
          onSubmit={values => {
            console.log(values);
            dispatch(AdaptorAction.saveParseSpec(values));
          }}>
          {() => (
            <FormWrapper>
              <Group>
                <AdaptorInput
                  inputlabel="Type"
                  inputtype="select"
                  selectoptions={['Jolt', 'Vanilla Javascript', 'jsPath']}
                  name="type"
                />
              </Group>

              <Group style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Button type="submit">Run</Button>
              </Group>
            </FormWrapper>
          )}
        </AdaptorForm>
      </div>
    </div>
  </div>
);

TransformSpec2.propTypes = {
  dispatch: PropTypes.func.isRequired,
  transformSpecInput: PropTypes.instanceOf(InputSpecInputModel).isRequired,
};

const mapStateToProps = state => ({
  transformSpecInput: new InputSpecInputModel(
    state.adaptorReducer.transformSpecInput,
  ),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(TransformSpec2);
