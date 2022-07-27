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
import PublishSpecInputModel from '../../../../stores/adaptor/models/specInput/publishSpec/PublishSpecInputModel';

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

const PublishSpec = ({ dispatch, publishSpecInput }) => (
  <div>
    <Title>Publish Spec</Title>
    <hr />
    <LeftMargin>
      <Flex>
        <AdaptorForm
          onSubmit={values => {
            dispatch(
              ToastsAction.add('Saved successfully!', 'SUCCESS', 'success'),
            );
            dispatch(
              AdaptorAction.savePublishSpec(new PublishSpecInputModel(values)),
            );
          }}
        >
          {() => (
            <FormWrapper>
              <Group>
                <AdaptorInput
                  inputlabel="Type"
                  name="type"
                  initialValue={publishSpecInput.type}
                />
              </Group>

              <Group>
                <AdaptorInput
                  inputlabel="URI"
                  name="uri"
                  initialValue={publishSpecInput.uri}
                />
              </Group>

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

PublishSpec.propTypes = {
  dispatch: PropTypes.func.isRequired,
  publishSpecInput: PropTypes.instanceOf(PublishSpecInputModel).isRequired,
};

const mapStateToProps = state => ({
  publishSpecInput: new PublishSpecInputModel(
    state.adaptorReducer.publishSpecInput,
  ),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(PublishSpec);
