import React from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from '../../../shared/components/SpecComponents';
import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import AdaptorAction from '../../../../stores/adaptor/AdaptorAction';
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

const PublishSpec = ({ dispatch, publishSpecInput }) => (
  <div>
    <Title>Publish Spec</Title>
    <hr />
    <div style={{ marginLeft: '80px' }}>
      <div style={{ display: 'flex' }}>
        <AdaptorForm
          onSubmit={values => {
            dispatch(
              AdaptorAction.savePublishSpec(new PublishSpecInputModel(values)),
            );
          }}>
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
                  inputlabel="URL"
                  name="url"
                  initialValue={publishSpecInput.url}
                />
              </Group>

              <Group>
                <AdaptorInput
                  inputlabel="Port"
                  name="port"
                  initialValue={publishSpecInput.port}
                />
              </Group>

              <Group>
                <AdaptorInput
                  inputlabel="Username"
                  name="username"
                  initialValue={publishSpecInput.username}
                />
              </Group>

              <Group>
                <AdaptorInput
                  inputlabel="Password"
                  name="password"
                  initialValue={publishSpecInput.password}
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
      </div>
    </div>
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
