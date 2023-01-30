import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from '../../../shared/components/SpecComponents';

import ToastsAction from '../../../../stores/toasts/ToastsAction';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import MenuApi from '../../../../utilities/MenuApi';
import RulesEngineAction from '../../../../stores/rulesEngine/RulesEngineAction';
import RulesInputSpecInput from '../../../../stores/rulesEngine/models/specInput/inputSpec/InputSpec';

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

const InputSpecRules = ({ dispatch, inputSpec }) => {
  const Menu = useContext(MenuApi);

  return (
    <div>
      <Title>Input Spec</Title>
      <hr />
      <LeftMargin>
        <Flex>
          <AdaptorForm
            onSubmit={values => {
              const reqBody = {
                type: values.type,
                uri: values.uri,
                queueName: values.queueName,
                sourceId: values.sourceId,
                expiry: values.expiry ? parseInt(values.expiry, 10) : values.expiry,
                parseSpec: {
                  type: values.parseSpecType,
                  messageContainer: values.parseSpecMessageContainer,
                  timestampPath: values.parseSpecTimestampPath,
                  staticKey: values.parseSpecStaticKey,
                },
              };

              dispatch(
                ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
              );
              dispatch(RulesEngineAction.saveInputSpec(reqBody));
            }}>
            {() => (
              <FormWrapper>
                <Group>
                  <AdaptorInput
                    inputlabel="Type"
                    inputtype="select"
                    selectoptions={[{ key: 'RMQ', value: 'rmq' }]}
                    name="type"
                    initialValue={inputSpec.type}
                    placeholder="type"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    initialValue={inputSpec.uri}
                    inputlabel="URI"
                    name="uri"
                    placeholder="URI"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Queue Name"
                    name="queueName"
                    initialValue={inputSpec.queueName}
                    placeholder="Queue Name"
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    inputlabel="Source ID"
                    name="sourceId"
                    initialValue={inputSpec.sourceId}
                    placeholder="Source ID"
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    inputlabel="State Expiry"
                    name="expiry"
                    initialValue={inputSpec.expiry}
                    placeholder="State Expiry"
                  />
                </Group>

                <Title>Parse Spec</Title>
                <hr />
                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Type"
                    inputtype="select"
                    initialValue={
                      inputSpec.parseSpec ? inputSpec.parseSpec.type : ''
                    }
                    selectoptions={[{ key: 'JSON', value: 'json' }]}
                    name="parseSpecType"
                    placeholder="type"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    optional
                    initialValue={
                      inputSpec.parseSpec
                        ? inputSpec.parseSpec.messageContainer
                        : ''
                    }
                    inputlabel="Message Container"
                    name="parseSpecMessageContainer"
                    placeholder="Message Container"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    optional
                    initialValue={
                      inputSpec.parseSpec
                        ? inputSpec.parseSpec.timestampPath
                        : ''
                    }
                    inputlabel="Timestamp Path"
                    name="parseSpecTimestampPath"
                    placeholder="Timestamp Path"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    optional
                    initialValue={
                      inputSpec.parseSpec ? inputSpec.parseSpec.staticKey : ''
                    }
                    inputlabel="Static Key"
                    name="parseSpecStaticKey"
                    placeholder="Static Key"
                  />
                </Group>
                <Group>
                  <Button type="submit">Save</Button>
                </Group>
              </FormWrapper>
            )}
          </AdaptorForm>
        </Flex>
      </LeftMargin>
    </div>
  );
};

InputSpecRules.propTypes = {
  dispatch: PropTypes.func.isRequired,
  inputSpec: PropTypes.instanceOf(RulesInputSpecInput).isRequired,
};

const mapStateToProps = state => ({
  inputSpec: new RulesInputSpecInput(state.rulesEngine.inputSpecInput),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(InputSpecRules);
