import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { InputLabel, Switch, TextareaAutosize } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import BTN, { Title, Type } from '../../../shared/components/SpecComponents';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput, {
  SwitchDiv,
} from '../../../shared/components/AdaptorInput';

import InputSpecResponseModel from '../../../../stores/adaptor/models/inputSpecResponse/InputSpecResponseModel';
import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';

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

const InputSpec2 = ({ dispatch }) => (
  <div>
    <Title>Meta Spec</Title>
    <hr />
    <div style={{ marginLeft: '80px' }}>
      <div style={{ display: 'flex' }}>
        <AdaptorForm
          onSubmit={() => {
            console.log('hello');
          }}>
          {() => (
            <FormWrapper>
              <Group>
                <AdaptorInput inputlabel="Name" name="name" />
              </Group>
              <Group>
                <AdaptorInput
                  inputlabel="Schedule Pattern"
                  name="schedulePattern"
                  placeholder="CRON "
                />
              </Group>
            </FormWrapper>
          )}
        </AdaptorForm>
      </div>
    </div>
  </div>
);

InputSpec2.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  inputSpec: new InputSpecResponseModel(state.adaptorReducer.inputSpec),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(InputSpec2);
