import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from '../../../shared/components/SpecComponents';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

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

const DeduplicationSpec2 = ({ dispatch, parseSpecInput }) => (
  <div>
    <Title>Deduplication Spec</Title>
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
                  selectoptions={[
                    'Time Based',
                    'Extra Key Based (Currently not supported)',
                  ]}
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

DeduplicationSpec2.propTypes = {
  dispatch: PropTypes.func.isRequired,
  parseSpecInput: PropTypes.instanceOf(InputSpecInputModel).isRequired,
};

const mapStateToProps = state => ({
  parseSpecInput: new InputSpecInputModel(state.adaptorReducer.parseSpecInput),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DeduplicationSpec2);
