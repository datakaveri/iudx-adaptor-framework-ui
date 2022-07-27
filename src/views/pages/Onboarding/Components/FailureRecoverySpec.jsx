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

const LeftMargin = styled.div`
  margin-left: 80px;
`;

const Flex = styled.div`
  display: 'flex';
`;

const FailureRecoverySpec = ({ dispatch, failureRecoverySpecInput }) => (
  <div>
    <Title>Failure Recovery Spec</Title>
    <hr />
    <LeftMargin>
      <Flex>
        <AdaptorForm
          onSubmit={values => {
            dispatch(
              ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
            );
            dispatch(AdaptorAction.saveFailureRecoverySpec(values));
          }}
        >
          {() => (
            <FormWrapper>
              <Group>
                <AdaptorInput
                  optional
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
                  optional
                  inputlabel="Initial Backoff"
                  name="initialBackoff"
                  initialValue={failureRecoverySpecInput.initialBackoff}
                />
              </Group>

              <Group>
                <AdaptorInput
                  optional
                  inputlabel="Max Backoff"
                  name="maxBackoff"
                  initialValue={failureRecoverySpecInput.maxBackoff}
                />
              </Group>

              <Group>
                <AdaptorInput
                  optional
                  inputlabel="Backoff Multiplier"
                  name="backoffMultiplier"
                  initialValue={failureRecoverySpecInput.backoffMultiplier}
                />
              </Group>

              <Group>
                <AdaptorInput
                  optional
                  inputlabel="Reset Backoff Threshold"
                  name="resetBackoffThreshold"
                  initialValue={failureRecoverySpecInput.resetBackoffThreshold}
                />
              </Group>

              <Group>
                <AdaptorInput
                  optional
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
      </Flex>
    </LeftMargin>
  </div>
);

FailureRecoverySpec.propTypes = {
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
)(FailureRecoverySpec);
