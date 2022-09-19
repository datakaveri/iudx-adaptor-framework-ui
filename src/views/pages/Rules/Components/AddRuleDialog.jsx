/* eslint-disable react/forbid-prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  InputLabel,
  DialogActions,
} from '@mui/material';
import React from 'react';

import styled from 'styled-components';
import { PropTypes } from 'prop-types';

import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/themes/prism.css';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import AdaptorForm from '../../../shared/components/AdaptorForm';
import AdaptorInput from '../../../shared/components/AdaptorInput';
import EditorStyle from '../../../shared/constants/EditorStyle';

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

const AddRuleDialog = ({ openDialog, setOpenDialog }) => {
  const handleCloseMenu = () => {
    setOpenDialog(false);
    console.log('Closed dialog');
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: 500 } }}
      open={openDialog}
      onClose={(e, reason) => {
        if (reason === 'backdropClick') {
          return;
        }
        handleCloseMenu();
      }}
      maxWidth="lg">
      <DialogTitle>Add Rule</DialogTitle>
      <DialogContent>
        <Flex>
          <Left>
            <AdaptorForm onSubmit={() => {}}>
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
                      inputlabel="SQL Query"
                      name="sqlQuery"
                      inputtype="text_container"
                    />
                  </Group>
                  <Group>
                    <AdaptorInput
                      inputlabel="Window Minutes"
                      name="windowMinutes"
                      type="number"
                    />
                  </Group>
                  <ButtonGroup>
                    <Button type="submit">Run</Button>
                  </ButtonGroup>
                </FormWrapper>
              )}
            </AdaptorForm>
          </Left>
          <Right>
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
          </Right>
        </Flex>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseMenu}>Cancel</Button>
        <Button variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

AddRuleDialog.propTypes = {
  openDialog: PropTypes.any.isRequired,
  setOpenDialog: PropTypes.any.isRequired,
};

export default AddRuleDialog;
