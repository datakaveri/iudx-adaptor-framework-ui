import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from '../../../shared/components/SpecComponents';
import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import RulesEngineAction from '../../../../stores/rulesEngine/RulesEngineAction';
import ToastsAction from '../../../../stores/toasts/ToastsAction';
import FailureRecoverySpecInputModel from '../../../../stores/adaptor/models/specInput/failureRecoverySpec/FailureRecoverySpecInputModel';
import MenuApi from '../../../../utilities/MenuApi';

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

const FailureRecoverySpec = ({
  dispatch,
  failureRecoverySpecInput,
  failureRecoverySpecInputRules,
}) => {
  const Menu = useContext(MenuApi);

  return (
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
              if (Menu.menuOption === 'etl')
                dispatch(AdaptorAction.saveFailureRecoverySpec(values));
              else if (Menu.menuOption === 'rules')
                dispatch(RulesEngineAction.saveFailureRecoverySpec(values));
            }}>
            {() => (
              <FormWrapper>
                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Type"
                    inputtype="select"
                    selectoptions={[
                      { key: 'Exponential Delay', value: 'exponential-delay' },
                      { key: 'Fixed Delay', value: 'fixed-delay' },
                    ]}
                    name="type"
                    initialValue={
                      Menu.menuOption === 'etl'
                        ? failureRecoverySpecInput.type
                        : failureRecoverySpecInputRules.type
                    }
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Initial Backoff"
                    name="initial-backoff"
                    initialValue={
                      Menu.menuOption === 'etl'
                        ? failureRecoverySpecInput['initial-backoff']
                        : failureRecoverySpecInputRules['initial-backoff']
                    }
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Max Backoff"
                    name="max-backoff"
                    initialValue={
                      Menu.menuOption === 'etl'
                        ? failureRecoverySpecInput['max-backoff']
                        : failureRecoverySpecInputRules['max-backoff']
                    }
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Backoff Multiplier"
                    name="backoff-multiplier"
                    initialValue={
                      Menu.menuOption === 'etl'
                        ? failureRecoverySpecInput['backoff-multiplier']
                        : failureRecoverySpecInputRules['backoff-multiplier']
                    }
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Reset Backoff Threshold"
                    name="reset-backoff-threshold"
                    initialValue={
                      Menu.menuOption === 'etl'
                        ? failureRecoverySpecInput['reset-backoff-threshold']
                        : failureRecoverySpecInputRules[
                            'reset-backoff-threshold'
                          ]
                    }
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Jitter Factor"
                    name="jitter-factor"
                    initialValue={
                      Menu.menuOption === 'etl'
                        ? failureRecoverySpecInput['jitter-factor']
                        : failureRecoverySpecInputRules['jitter-factor']
                    }
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
};

FailureRecoverySpec.propTypes = {
  dispatch: PropTypes.func.isRequired,
  failureRecoverySpecInput: PropTypes.instanceOf(FailureRecoverySpecInputModel)
    .isRequired,
  failureRecoverySpecInputRules: PropTypes.instanceOf(
    FailureRecoverySpecInputModel,
  ).isRequired,
};

const mapStateToProps = state => ({
  failureRecoverySpecInput: new FailureRecoverySpecInputModel(
    state.adaptorReducer.failureRecoverySpecInput,
  ),
  failureRecoverySpecInputRules: new FailureRecoverySpecInputModel(
    state.rulesEngine.failureRecoverySpecInput,
  ),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FailureRecoverySpec);
