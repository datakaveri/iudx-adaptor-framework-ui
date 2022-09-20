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
  justify-content: space-between;
  width: 100%;
`;

const Labels = styled.div`
  margin-top: 5px;
  padding: 10px 0px 10px 0px;
  width: 25%;
  text-align: start;
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
          <b>{ruleName}</b>
        </Labels>
        <Labels>
          <b>{sqlQuery}</b>
        </Labels>
        <Labels>
          <b>{queueName}</b>
        </Labels>
        <Labels>
          <b>{exchangeName}</b>
        </Labels>
        <Labels>{moment(createdAt).format('lll')}</Labels>
        <ImageButton
          Solid="Solid"
          Text="Delete"
          color="#EA4335"
          icon="delete.png"
          hoverIcon="delete.png"
          hoverColor="#9b241a"
          hoverTextColor="white"
          onClicked={deleteRule}
        />
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
