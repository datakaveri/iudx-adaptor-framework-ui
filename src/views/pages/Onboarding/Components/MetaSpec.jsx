import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
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
const MetaSpec2 = ({ dispatch, metaSpec }) => (
  <div>
    <Title>Meta Spec</Title>
    <hr />
    <LeftMargin>
      <Flex>
        <AdaptorForm
          onSubmit={values => {
            dispatch(
              ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
            );
            dispatch(
              AdaptorAction.saveMetaSpec(new MetaSpecInputModel(values)),
            );
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
              <Group>
                <AdaptorInput
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
