import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
  InputLabel,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';
import EditorPlaceholder from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';
import Loader from '../../../shared/components/Loader';
import ToastsAction from '../../../../stores/toasts/ToastsAction';
import RulesEngineAction from '../../../../stores/rulesEngine/RulesEngineAction';
import EditorSql from './EditorSql';
import EditorStyle from '../../../shared/constants/EditorStyle';
import EditorJson from './EditorJson';
import { selectTestRuleResult } from '../../../../selectors/rules/RulesSelector';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: fit-content;
`;

const Left = styled.div`
  width: 100%;
  height: 300px;
`;

const Right = styled.div`
  width: 100%;
  height: 300px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddRuleDialog = ({
  dispatch,
  openDialog,
  setOpenDialog,
  ruleTestResult,
}) => {
  const [loader, setLoader] = useState(false);
  const [sqlQuery, setSqlQuery] = useState('');
  const [inputData, setInputData] = useState('');

  const handleCloseMenu = () => {
    setOpenDialog(false);
  };

  const params = useParams();

  const testQuery = () => {
    setLoader(true);
    dispatch(RulesEngineAction.testRule(sqlQuery, inputData));
    setLoader(false);
  };

  return (
    <>
      <Loader open={loader} message="Creating new rule..." />
      <Dialog
        PaperProps={{
          sx: {
            height: '740px',
            width: '55%',
          },
        }}
        open={openDialog}
        disableEscapeKeyDown
        onClose={(e, reason) => {
          if (reason === 'backdropClick') {
            return;
          }
          handleCloseMenu();
        }}
        maxWidth="xl">
        <DialogTitle>
          <h3>Add Rule</h3>
        </DialogTitle>
        <DialogContent>
          <Flex>
            <Left>
              <AdaptorForm
                onSubmit={values => {
                  const spec = {
                    ...values,
                    sqlQuery: sqlQuery.replace(/(\r\n|\n|\r)/gm, ' '),
                    adaptorId: params.adaptorId,
                    ruleType: 'RULE',
                    windowMinutes: Number(values.windowMinutes),
                  };
                  if (spec.sqlQuery) {
                    spec.sqlQuery = spec.sqlQuery.replace(
                      /[.+?^${}()|[\]\\]/g,
                      '\\$&',
                    );
                  }
                  setLoader(true);
                  dispatch(RulesEngineAction.submitRule(spec)).then(() => {
                    dispatch(RulesEngineAction.getRules(params.adaptorId));
                  });
                  setLoader(false);
                  dispatch(
                    ToastsAction.add(
                      'Saved successfully!',
                      'SUCCESS',
                      'success',
                    ),
                  );

                  handleCloseMenu();
                }}>
                {() => (
                  <FormWrapper>
                    <Group>
                      <AdaptorInput
                        inputlabel="Rule Name"
                        name="ruleName"
                        placeholder="Rule Name"
                      />
                    </Group>

                    <Group>
                      <AdaptorInput
                        inputlabel="Window Minutes"
                        name="windowMinutes"
                        type="number"
                      />
                    </Group>
                    <Group>
                      <InputLabel
                        style={{
                          marginTop: '27px',
                          marginLeft: '10px',
                          marginBottom: '10px',
                          fontWeight: 600,
                        }}>
                        *SQL Query
                      </InputLabel>
                      <EditorSql value={sqlQuery} setValue={setSqlQuery} />
                    </Group>
                    <ButtonGroup>
                      <Button
                        style={{ marginBottom: '15px' }}
                        variant="outlined"
                        onClick={testQuery}>
                        Run Query
                      </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                      <Button variant="contained" type="submit">
                        Submit Rule
                      </Button>
                    </ButtonGroup>
                  </FormWrapper>
                )}
              </AdaptorForm>
            </Left>
            <Right>
              <Group>
                <InputLabel
                  style={{
                    marginLeft: '10px',
                    marginBottom: '10px',
                    fontWeight: 600,
                  }}>
                  *Input Data
                </InputLabel>
                <EditorJson value={inputData} setValue={setInputData} />

                <InputLabel
                  style={{ marginLeft: '10px', marginBottom: '10px' }}>
                  Output
                </InputLabel>
                <EditorPlaceholder
                  disabled
                  value={JSON.stringify(ruleTestResult, null, 4)}
                  highlight={value => highlight(value, languages.jsx)}
                  padding={20}
                  style={EditorStyle}
                />
              </Group>
            </Right>
          </Flex>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMenu}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

AddRuleDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  ruleTestResult: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    .isRequired,
};

const mapStateToProps = state => ({
  ruleTestResult: selectTestRuleResult(state),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRuleDialog);
