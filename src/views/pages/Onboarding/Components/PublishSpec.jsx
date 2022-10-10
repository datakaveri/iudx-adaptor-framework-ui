import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import { Validator } from 'jsonschema';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from '../../../shared/components/SpecComponents';
import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import RulesEngineAction from '../../../../stores/rulesEngine/RulesEngineAction';
import ToastsAction from '../../../../stores/toasts/ToastsAction';
import PublishSpecInputModel from '../../../../stores/adaptor/models/specInput/publishSpec/PublishSpecInputModel';
import RulesPublishSpecInput from '../../../../stores/rulesEngine/models/specInput/publishSpec/PublishSpec';
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
  display: flex;
`;

const publishSpecSchema = {
  type: 'object',
  required: ['type', 'uri'],
  properties: {
    type: {
      title: 'Type',
      type: 'string',
    },
    uri: {
      title: 'Uri',
      type: 'string',
    },
  },
};

const PublishSpec = ({ dispatch, publishSpecInput, publishSpecInputRules }) => {
  const Menu = useContext(MenuApi);
  const v = new Validator();

  return (
    <div>
      <Title>Publish Spec</Title>
      <hr />
      <LeftMargin>
        <Flex>
          <AdaptorForm
            onSubmit={values => {
              if (v.validate(values, publishSpecSchema).valid) {
                dispatch(
                  ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
                );

                if (Menu.menuOption === 'etl') {
                  dispatch(
                    AdaptorAction.savePublishSpec(
                      new PublishSpecInputModel(values),
                    ),
                  );
                } else if (Menu.menuOption === 'rules') {
                  dispatch(RulesEngineAction.savePublishSpec(values));
                }
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
                    name="type"
                    initialValue={
                      Menu.menuOption === 'etl'
                        ? publishSpecInput.type
                        : publishSpecInputRules.type
                    }
                  />
                </Group>

                <Group>
                  <AdaptorInput
                    inputlabel="URI"
                    name="uri"
                    initialValue={
                      Menu.menuOption === 'etl'
                        ? publishSpecInput.uri
                        : publishSpecInputRules.uri
                    }
                  />
                </Group>

                {Menu.menuOption === 'etl' ? (
                  <>
                    <Group>
                      <AdaptorInput
                        inputlabel="Sink Name"
                        name="sinkName"
                        initialValue={publishSpecInput.sinkName}
                      />
                    </Group>

                    <Group>
                      <AdaptorInput
                        inputlabel="Tag Name"
                        name="tagName"
                        initialValue={publishSpecInput.tagName}
                      />
                    </Group>
                  </>
                ) : (
                  ''
                )}

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

PublishSpec.propTypes = {
  dispatch: PropTypes.func.isRequired,
  publishSpecInput: PropTypes.instanceOf(PublishSpecInputModel).isRequired,
  publishSpecInputRules: PropTypes.instanceOf(RulesPublishSpecInput).isRequired,
};

const mapStateToProps = state => ({
  publishSpecInput: new PublishSpecInputModel(
    state.adaptorReducer.publishSpecInput,
  ),
  publishSpecInputRules: new RulesPublishSpecInput(
    state.rulesEngine.publishSpecInput,
  ),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishSpec);
