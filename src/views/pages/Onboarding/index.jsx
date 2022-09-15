/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/require-default-props */
import * as React from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import { Title } from '../../shared/components/SpecComponents';
import PublishSpec from './Components/PublishSpec';
import InputSpec from './Components/InputSpec';
import InputSpecRules from './Components/InputSpecRules';
import ParseSpec from './Components/ParseSpec';
import MetaSpec2 from './Components/MetaSpec';
import DeduplicationSpec from './Components/DeduplicationSpec';
import TransformSpec from './Components/TransformSpec';
import FailureRecoverySpec from './Components/FailureRecoverySpec';
import RuleSourceSpec from './Components/RuleSourceSpec';
import AdaptorAction from '../../../stores/adaptor/AdaptorAction';
import EditorStyle from '../../shared/constants/EditorStyle';
import EditorStyleLarge from '../../shared/constants/EditorStyleLarge';
import ToastsAction from '../../../stores/toasts/ToastsAction';
import Loader from '../../shared/components/Loader';
import MenuApi from '../../../utilities/MenuApi';

const steps = [
  'Meta Spec',
  'Input Spec',
  'Parse Spec',
  'Deduplication Spec',
  'Transform Spec',
  'Failure Recovery Spec',
  'Publish Spec',
];

const rulesSteps = [
  'Meta Spec',
  'Input Spec',
  'Rule Source Spec',
  'Publish Spec',
];

const Page = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 80%;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 3%;
`;

function OnboardingPage({ dispatch, adaptorReducer }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [loader, setLoader] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [menuOption, setMenuOption] = React.useState('');

  const isStepOptional = step => step === 5;

  const isStepSkipped = step => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStep = step => () => {
    if (step < activeStep) setActiveStep(step);
  };

  const handleCloseMenu = () => {
    setOpenMenu(false);
    console.log('Closed dialog');
    console.log(menuOption);
  };

  const handleChangeMenu = event => {
    setMenuOption(event.target.value);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <MetaSpec2 />;
      case 1:
        return <InputSpec />;
      case 2:
        return <ParseSpec />;
      case 3:
        return <DeduplicationSpec />;
      case 4:
        return <TransformSpec />;
      case 5:
        return <FailureRecoverySpec />;
      case 6:
        return <PublishSpec />;

      default:
        return '';
    }
  }

  function getStepContentRules(step) {
    switch (step) {
      case 0:
        return <MetaSpec2 />;
      case 1:
        return <InputSpecRules />;
      case 2:
        return <RuleSourceSpec />;
      case 3:
        return <PublishSpec />;
      default:
        return '';
    }
  }

  const handleReset = () => {
    setActiveStep(0);
  };

  const specFile = {
    ...adaptorReducer.metaSpecInput,
    failureRecoverySpec:
      adaptorReducer.failureRecoverySpecInput !== {}
        ? adaptorReducer.failureRecoverySpecInput
        : undefined,
    inputSpec: adaptorReducer.inputSpecInput,
    parseSpec: adaptorReducer.parseSpecInput,
    deduplicationSpec: adaptorReducer.deduplicationSpecInput,
    transformSpec: adaptorReducer.transformSpecInput,
    publishSpec: adaptorReducer.publishSpecInput,
  };

  const onboardingFunction = async () => {
    const headers = {
      username: 'testuser',
      password: 'testuserpassword',
      'Content-Type': 'application/json',
    };

    setLoader(true);
    await dispatch(AdaptorAction.submitJob(specFile, headers));
    setLoader(false);
    dispatch(
      ToastsAction.add('Adaptor Created Successfully!', 'SUCCESS', 'success'),
    );
  };

  return (
    <Page>
      <Loader
        open={loader}
        message="Creating new adaptor. This might take a while..."
      />
      <Dialog disableEscapeKeyDown open={openMenu} onClose={(e, reason) => {
        if(reason === "backdropClick") {
          return;
        }
        handleCloseMenu();
      }}>
        <DialogTitle>Select an option</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={menuOption}
                onChange={handleChangeMenu}>
                <MenuItem value="adaptor">Adaptor</MenuItem>
                <MenuItem value="rules">Rules Engine</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMenu}>OK</Button>
        </DialogActions>
      </Dialog>

      <MenuApi.Provider value={{ menuOption, setMenuOption }}>
        <Header>
          <Stepper activeStep={activeStep}>
            {menuOption === 'adaptor'
              ? steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepButton {...labelProps} onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  );
                })
              : rulesSteps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepButton {...labelProps} onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  );
                })}
          </Stepper>

          {menuOption === 'adaptor' ? (
            <Typography>{getStepContent(activeStep)}</Typography>
          ) : (
            <Typography>{getStepContentRules(activeStep)}</Typography>
          )}
          {menuOption === 'adaptor' ? (
            activeStep === steps.length ? (
              <React.Fragment>
                <Container>
                  <Column>
                    <Title>Spec Outline</Title>
                    <Editor
                      disabled
                      value={
                        adaptorReducer.message === ''
                          ? ''
                          : JSON.stringify(specFile, null, 4)
                      }
                      highlight={value => highlight(value, languages.jsx)}
                      padding={20}
                      style={EditorStyleLarge}
                    />
                  </Column>
                  <Column>
                    <Title>Input Spec</Title>
                    <Editor
                      disabled
                      value={
                        adaptorReducer.message === ''
                          ? ''
                          : JSON.stringify(
                              adaptorReducer.inputSpecInput,
                              null,
                              4,
                            )
                      }
                      highlight={value => highlight(value, languages.jsx)}
                      padding={20}
                      style={EditorStyle}
                    />
                    <Title>Transform Spec Output</Title>
                    <Editor
                      disabled
                      value={
                        adaptorReducer.message === ''
                          ? ''
                          : JSON.stringify(
                              adaptorReducer.transformSpec,
                              null,
                              4,
                            )
                      }
                      highlight={value => highlight(value, languages.jsx)}
                      padding={20}
                      style={EditorStyle}
                    />
                  </Column>
                </Container>
                <Center>
                  <Button onClick={onboardingFunction}>
                    Submit Spec Outline
                  </Button>
                </Center>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                  <Box sx={{ flex: '1 1 auto' }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}>
                  Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </Box>
            )
          ) : activeStep === rulesSteps.length ? (
            <p>Completed Rules spec</p>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}

              <Button onClick={handleNext}>
                {activeStep === rulesSteps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          )}
        </Header>
      </MenuApi.Provider>
    </Page>
  );
}

OnboardingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  adaptorReducer: PropTypes.any,
};

const mapStateToProps = state => ({
  adaptorReducer: state.adaptorReducer,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingPage);
