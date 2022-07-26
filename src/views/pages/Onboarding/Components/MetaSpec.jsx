import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, InputLabel } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from '../../../shared/components/SpecComponents';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import ToastsAction from '../../../../stores/toasts/ToastsAction';
import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
import MetaSpecInputModel from '../../../../stores/adaptor/models/specInput/metaSpec/MetaSpecInputModel';

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
const MetaSpec2 = ({ dispatch, metaSpec }) => {
  const [spaceError, setSpaceError] = useState(false);

  return (
    <div>
      <Title>Meta Spec</Title>
      <hr />
      <LeftMargin>
        <Flex>
          <AdaptorForm
            onSubmit={values => {
              if (values.name.indexOf(' ') >= 0) setSpaceError(true);
              else {
                setSpaceError(false);
                const reqBody = {
                  name: values.name,
                  schedulePattern:
                    values.schedulePattern !== ''
                      ? values.schedulePattern
                      : undefined,
                };
                dispatch(
                  ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
                );
                dispatch(AdaptorAction.saveMetaSpec(reqBody));
                console.log(values);
              }
            }}>
            {() => (
              <FormWrapper>
                <Group>
                  <AdaptorInput
                    inputlabel="Name"
                    name="name"
                    initialValue={metaSpec.name}
                  />
                </Group>
                {spaceError ? (
                  <InputLabel style={{ marginLeft: '10px', color: 'red' }}>
                    {' '}
                    Please remove white spaces
                  </InputLabel>
                ) : (
                  ''
                )}
                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Schedule Pattern"
                    name="schedulePattern"
                    placeholder="CRON like schedule pattern"
                    initialValue={metaSpec.schedulePattern}
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

MetaSpec2.propTypes = {
  dispatch: PropTypes.func.isRequired,
  metaSpec: PropTypes.instanceOf(MetaSpecInputModel).isRequired,
};

const mapStateToProps = state => ({
  metaSpec: new MetaSpecInputModel(state.adaptorReducer.metaSpecInput),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MetaSpec2);
