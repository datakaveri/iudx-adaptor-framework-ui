import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { PropTypes } from 'prop-types';
import { useParams } from 'react-router-dom';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';
import Loader from '../../../shared/components/Loader';
import ToastsAction from '../../../../stores/toasts/ToastsAction';
import RulesEngineAction from '../../../../stores/rulesEngine/RulesEngineAction';

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

// const Right = styled.div`
//   width: 100%;
//   height: 300px;
// `;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddRuleDialog = ({ dispatch, openDialog, setOpenDialog }) => {
  const [loader, setLoader] = useState(false);

  const handleCloseMenu = () => {
    setOpenDialog(false);
  };

  const params = useParams();

  return (
    <>
      <Loader open={loader} message="Creating new rule..." />
      <Dialog
        PaperProps={{
          sx: {
            height: '620px',
            width: '25%',
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
        maxWidth="lg">
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
                    adaptorId: params.adaptorId,
                    ruleType: 'RULE',
                    windowMinutes: Number(values.windowMinutes),
                  };
                  console.log(spec);
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
                      <AdaptorInput
                        inputlabel="SQL Query"
                        name="sqlQuery"
                        inputtype="text_container"
                      />
                    </Group>
                    <ButtonGroup>
                      <Button variant="contained" type="submit">
                        Add Rule
                      </Button>
                    </ButtonGroup>
                  </FormWrapper>
                )}
              </AdaptorForm>
            </Left>
            {/* <Right>
            <Group>
              <InputLabel style={{ marginLeft: '10px', marginBottom: '10px' }}>
                Output
              </InputLabel>
              <Editor
                value=""
                highlight={value => highlight(value, languages.jsx)}
                padding={20}
                style={EditorStyle}
              />
            </Group>
          </Right> */}
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
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRuleDialog);
