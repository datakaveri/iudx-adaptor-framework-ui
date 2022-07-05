import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from '../../../shared/components/SpecComponents';
import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import FailureRecoverySpecInputModel from '../../../../stores/adaptor/models/specInput/failureRecoverySpec/FailureRecoverySpecInputModel';

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

const FailureRecoverySpec2 = ({ dispatch, failureRecoverySpecInput }) => (
  <div>
    <Title>Failure Recovery Spec</Title>
    <hr />
    <div style={{ marginLeft: '80px' }}>
      <div style={{ display: 'flex' }}>
        <AdaptorForm
          onSubmit={values => {
            dispatch(AdaptorAction.saveFailureRecoverySpec(values));
          }}>
          {() => (
            <FormWrapper>
              <Group>
                <AdaptorInput
                  inputlabel="Type"
                  inputtype="select"
                  selectoptions={[
                    { key: 'Exponential Delay', value: 'exponentialDelay' },
                    { key: 'Fixed Delay', value: 'fixedDelay' },
                  ]}
                  name="type"
                  initialValue={failureRecoverySpecInput.type}
                />
              </Group>

              <Group>
                <AdaptorInput
                  inputlabel="Initial Backoff"
                  name="initialBackoff"
                  initialValue={failureRecoverySpecInput.initialBackoff}
                />
              </Group>

              <Group>
                <AdaptorInput
                  inputlabel="Max Backoff"
                  name="maxBackoff"
                  initialValue={failureRecoverySpecInput.maxBackoff}
                />
              </Group>

              <Group>
                <AdaptorInput
                  inputlabel="Backoff Multiplier"
                  name="backoffMultiplier"
                  initialValue={failureRecoverySpecInput.backoffMultiplier}
                />
              </Group>

              <Group>
                <AdaptorInput
                  inputlabel="Reset Backoff Threshold"
                  name="resetBackoffThreshold"
                  initialValue={failureRecoverySpecInput.resetBackoffThreshold}
                />
              </Group>

              <Group>
                <AdaptorInput
                  inputlabel="Jitter Factor"
                  name="jitterFactor"
                  initialValue={failureRecoverySpecInput.jitterFactor}
                />
              </Group>

              <Group style={{ marginTop: '10px', marginBottom: '10px' }}>
                <Button type="submit">Submit</Button>
              </Group>
            </FormWrapper>
          )}
        </AdaptorForm>
      </div>
    </div>
  </div>
);

FailureRecoverySpec2.propTypes = {
  dispatch: PropTypes.func.isRequired,
  failureRecoverySpecInput: PropTypes.instanceOf(FailureRecoverySpecInputModel)
    .isRequired,
};

const mapStateToProps = state => ({
  failureRecoverySpecInput: new FailureRecoverySpecInputModel(
    state.adaptorReducer.failureRecoverySpecInput,
  ),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FailureRecoverySpec2);
