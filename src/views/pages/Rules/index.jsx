import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import RulesEngineAction from '../../../stores/rulesEngine/RulesEngineAction';
import ImageButton from '../../shared/components/ImageButton';
import { Title, Line } from '../../shared/components/SpecComponents';

import AddRuleDialog from './Components/AddRuleDialog';
import { selectRules } from '../../../selectors/rules/RulesSelector';
import Rule from './Components/Rule';

const Page = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Navbar = styled.div`
  width: 95%;
`;

const NavbarContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Splitter = styled.div`
  width: 50px;
`;

const TabsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
`;

const Tab = styled.div`
  margin: 0px;
  width: 25%;
  font-weight: bold;
  text-align: start;
`;

const Rules = ({ rules, dispatch }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (params.adaptorId) {
      dispatch(RulesEngineAction.getRules(params.adaptorId));
    }
  }, []);

  return (
    <div>
      <AddRuleDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <Page>
        <Navbar>
          <NavbarContent>
            <Buttons>
              <Title>Rules</Title>
              <Splitter />
              <ImageButton
                Solid="Solid"
                Text="Add New"
                color="#2D3648"
                hoverColor="white"
                icon="add.png"
                hoverIcon="addGrey.png"
                hoverTextColor="#2D3648"
                onClicked={() => setOpenDialog(true)}
              />
            </Buttons>
          </NavbarContent>

          <TabsBar>
            <Tab>Rule Name</Tab>

            <Tab>SQL Query</Tab>

            <Tab>Queue Name</Tab>

            <Tab>Exchange Key</Tab>

            <Tab>Created At</Tab>
          </TabsBar>
          <Line />
          {Array.isArray(rules) && rules.length > 0 ? (
            rules.map(rule => (
              <Rule
                id={rule.id}
                adaptorId={rule.adaptorId}
                ruleName={rule.ruleName}
                exchangeName={rule.exchangeName}
                queueName={rule.queueName}
                sqlQuery={rule.sqlQuery}
                createdAt={rule.createdAt}
              />
            ))
          ) : (
            <p>No rules found</p>
          )}
        </Navbar>
      </Page>
    </div>
  );
};

Rules.propTypes = {
  dispatch: PropTypes.func.isRequired,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      adaptorId: PropTypes.string,
      ruleName: PropTypes.string,
      exchangeName: PropTypes.string,
      queueName: PropTypes.string,
      sqlQuery: PropTypes.string,
      createdAt: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  rules: selectRules(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Rules);