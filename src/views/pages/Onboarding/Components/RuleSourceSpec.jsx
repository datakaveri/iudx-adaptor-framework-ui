import React, { useContext } from 'react';
import styled from 'styled-components';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Title } from '../../../shared/components/SpecComponents';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';

import MetaSpecInputModel from '../../../../stores/adaptor/models/specInput/metaSpec/MetaSpecInputModel';
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

const RuleSourceSpec = ({ dispatch, metaSpec }) => {
  const Menu = useContext(MenuApi);

  return (
    <div>
      <Title>Rule Source Spec</Title>
      <hr />
      <LeftMargin>
        <Flex>
          <AdaptorForm
            onSubmit={values => {
              console.log(values);
            }}>
            {() => (
              <FormWrapper>
                <Group>
                  <AdaptorInput
                    inputlabel="Type"
                    inputtype="select"
                    selectoptions={[{ key: 'RMQ', value: 'rmq' }]}
                    name="type"
                    placeholder="type"
                  />
                </Group>
                <Group>
                  <AdaptorInput inputlabel="URL" name="url" placeholder="URL" />
                </Group>
                <Group>
                  <AdaptorInput
                    inputlabel="Queue Name"
                    name="queueName"
                    placeholder="Queue Name"
                  />
                </Group>

                <Title>Parse Spec</Title>
                <hr />
                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Type"
                    inputtype="select"
                    selectoptions={[{ key: 'JSON', value: 'json' }]}
                    name="parseSpecType"
                    placeholder="type"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Message Container"
                    name="parseSpecMessageContainer"
                    placeholder="Message Container"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    optional
                    inputlabel="Timestamp Path"
                    name="parseSpecTimestampPath"
                    placeholder="Timestamp Path"
                  />
                </Group>
                <Group>
                  <AdaptorInput
                    optional
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

RuleSourceSpec.propTypes = {
  dispatch: PropTypes.func.isRequired,
  metaSpec: PropTypes.instanceOf(MetaSpecInputModel).isRequired,
};

const mapStateToProps = state => ({
  metaSpec: new MetaSpecInputModel(state.adaptorReducer.metaSpecInput),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(RuleSourceSpec);
