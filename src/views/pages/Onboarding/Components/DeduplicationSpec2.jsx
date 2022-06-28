import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from '../../../shared/components/SpecComponents';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import ToastsAction from '../../../../stores/toasts/ToastsAction';
import DeduplicationSpecInputModel from '../../../../stores/adaptor/models/specInput/deduplicationSpec/DeduplicationSpecInputModel';

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

const DeduplicationSpec2 = ({ dispatch, deduplicationSpecInput }) => (
  <div>
    <Title>Deduplication Spec</Title>
    <hr />
    <div style={{ marginLeft: '80px' }}>
      <div style={{ display: 'flex' }}>
        <AdaptorForm
          onSubmit={values => {
            dispatch(
              ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
            );
            dispatch(
              AdaptorAction.saveDeduplicationSpec(
                new DeduplicationSpecInputModel(values),
              ),
            );
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
                  initialValue={deduplicationSpecInput.type}
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
  deduplicationSpecInput: PropTypes.instanceOf(DeduplicationSpecInputModel)
    .isRequired,
};

const mapStateToProps = state => ({
  deduplicationSpecInput: new DeduplicationSpecInputModel(
    state.adaptorReducer.deduplicationSpecInput,
  ),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(DeduplicationSpec2);
