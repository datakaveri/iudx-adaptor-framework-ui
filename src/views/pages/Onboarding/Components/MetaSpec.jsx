import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Button, InputLabel } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Validator } from 'jsonschema';

import { Title } from '../../../shared/components/SpecComponents';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import ToastsAction from '../../../../stores/toasts/ToastsAction';
import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import MetaSpecInputModel from '../../../../stores/adaptor/models/specInput/metaSpec/MetaSpecInputModel';
import RulesEngineAction from '../../../../stores/rulesEngine/RulesEngineAction';

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

const metaSpecSchema = {
  type: 'object',
  required: ['adaptorType', 'name'],
  properties: {
    adaptorType: {
      title: 'Adaptor Type',
      type: 'string',
    },
    name: {
      title: 'Name',
      type: 'string',
    },
    schedulePattern: {
      title: 'Schedule Pattern',
      type: 'string',
    },
  },
};

const MetaSpec = ({ dispatch, metaSpec, metaSpecRules }) => {
  const Menu = useContext(MenuApi);
  const [spaceError, setSpaceError] = useState(false);
  const v = new Validator();

  return (
    <div>
      <Title>Meta Spec</Title>
      <hr />
      <LeftMargin>
        <Flex>
          <AdaptorForm
            onSubmit={values => {
              const pattern = /^[a-zA-Z0-9]+$/;
              if (values.name.indexOf(' ') >= 0) setSpaceError(true);

              if (!pattern.test(values.name)) setSpaceError(true);
              else setSpaceError(false);

              if (Menu.menuOption === 'etl') {
                const reqBody = {
                  name: values.name,
                  schedulePattern:
                    values.schedulePattern !== ''
                      ? values.schedulePattern
                      : undefined,
                };
                dispatch(AdaptorAction.saveMetaSpec(reqBody));
              } else if (Menu.menuOption === 'rules') {
                const reqBody = {
                  name: values.name,
                  adaptorType: 'RULES',
                };

                if (v.validate(reqBody, metaSpecSchema).valid) {
                  dispatch(RulesEngineAction.saveMetaSpec(reqBody));
                  dispatch(
                    ToastsAction.add(
                      'Saved successfully!',
                      'SUCCESS',
                      'success',
                    ),
                  );
                } else {
                  dispatch(
                    ToastsAction.add('Invalid Schema', 'SUCCESS', 'success'),
                  );
                }
              }
            }}>
            {() => (
              <FormWrapper>
                <Group>
                  <AdaptorInput
                    inputlabel="Name"
                    name="name"
                    initialValue={
                      Menu.menuOption === 'etl'
                        ? metaSpec.name
                        : metaSpecRules.name
                    }
                  />
                </Group>
                {spaceError ? (
                  <InputLabel
                    style={{
                      marginLeft: '10px',
                      marginBottom: '10px',
                      color: 'red',
                    }}>
                    {' '}
                    Please remove white spaces
                  </InputLabel>
                ) : (
                  ''
                )}
                {Menu.menuOption === 'etl' ? (
                  <Group>
                    <AdaptorInput
                      optional
                      inputlabel="Schedule Pattern"
                      name="schedulePattern"
                      placeholder="CRON like schedule pattern"
                      initialValue={metaSpec.schedulePattern}
                    />
                  </Group>
                ) : (
                  ''
                )}
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

MetaSpec.propTypes = {
  dispatch: PropTypes.func.isRequired,
  metaSpec: PropTypes.instanceOf(MetaSpecInputModel).isRequired,
  metaSpecRules: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  metaSpec: new MetaSpecInputModel(state.adaptorReducer.metaSpecInput),
  metaSpecRules: state.rulesEngine.metaSpecInput,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MetaSpec);
