/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Loader from '../../../shared/components/Loader';
import RulesEngineAction from '../../../../stores/rulesEngine/RulesEngineAction';
import ImageButton from '../../../shared/components/ImageButton';

const LabelsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LabelsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #e5e5e5;
  }
`;

const Labels = styled.div`
  margin-top: 5px;
  padding: 10px 30px 10px 0px;
  width: 16.67%;
  text-align: start;
`;

const OverflowContainer = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

function Rule({
  id,
  adaptorId,
  ruleName,
  exchangeName,
  queueName,
  sqlQuery,
  createdAt,
  dispatch,
}) {
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState('');

  const deleteRule = async () => {
    setLoader(true);
    setMessage('Deleting rule, please wait...');
    await dispatch(RulesEngineAction.deleteRule(adaptorId, id));
    await dispatch(RulesEngineAction.getRules(adaptorId));
    setLoader(false);
  };

  return (
    <LabelsRow>
      <Loader open={loader} message={message} />
      <LabelsContainer>
        <Labels>
          <OverflowContainer>
            <b>{ruleName}</b>
          </OverflowContainer>
        </Labels>
        <Labels>
          <b>{sqlQuery}</b>
        </Labels>
        <Labels>
          <OverflowContainer>
            <b>{queueName}</b>
          </OverflowContainer>
        </Labels>
        <Labels>
          <OverflowContainer>
            <b>{exchangeName}</b>
          </OverflowContainer>
        </Labels>
        <Labels>{moment(createdAt).format('lll')}</Labels>
        <Labels>
          <ImageButton
            Solid="Solid"
            Text="Delete"
            color="#EA4335"
            icon={require('./delete.png')}
            hoverIcon={require('./delete.png')}
            hoverColor="#9b241a"
            hoverTextColor="white"
            onClicked={deleteRule}
          />
        </Labels>
      </LabelsContainer>
    </LabelsRow>
  );
}

Rule.propTypes = {
  id: PropTypes.number.isRequired,
  adaptorId: PropTypes.string.isRequired,
  ruleName: PropTypes.string.isRequired,
  exchangeName: PropTypes.string.isRequired,
  queueName: PropTypes.string.isRequired,
  sqlQuery: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Rule);
