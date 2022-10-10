import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Validator } from 'jsonschema';

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

const inputSpecRulesSchema = {
  type: 'object',
  required: ['type', 'uri', 'queueName', 'sourceId', 'parseSpec'],
  properties: {
    type: {
      title: 'Type',
      type: 'string',
      enum: ['rmq'],
    },
    uri: {
      title: 'Uri',
      type: 'string',
    },
    queueName: {
      title: 'Queue Name',
      type: 'string',
    },
    sourceId: {
      title: 'Source ID',
      type: 'string',
    },
    parseSpec: {
      title: 'Parse Spec',
      type: 'object',
      required: ['type', 'messageContainer', 'timestampPath', 'staticKey'],
      properties: {
        type: {
          title: 'Type',
          type: 'string',
          enum: ['json'],
        },
        messageContainer: {
          title: 'Message Container',
          type: 'string',
        },
        timestampPath: {
          title: 'Timestamp Path',
          type: 'string',
        },
        staticKey: {
          title: 'Static Key',
          type: 'string',
        },
      },
    },
  },
};

const InputSpecRules = ({ dispatch, inputSpec }) => {
  const Menu = useContext(MenuApi);
  const v = new Validator();

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
                parseSpec: {
                  type: values.parseSpecType,
                  messageContainer: values.parseSpecMessageContainer,
                  timestampPath: values.parseSpecTimestampPath,
                  staticKey: values.parseSpecStaticKey,
                },
              };

              if (v.validate(reqBody, inputSpecRulesSchema).valid) {
                dispatch(RulesEngineAction.saveInputSpec(reqBody));
                dispatch(
                  ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
                );
              } else {
                dispatch(
                  ToastsAction.add('Invalid Schema', 'SUCCESS', 'success'),
                );
              }
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
