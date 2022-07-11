/* eslint-disable react/require-default-props */
import * as React from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import { Title } from '../../shared/components/SpecComponents';
import PublishSpec from './Components/PublishSpec';
import InputSpec from './Components/InputSpec';
import ParseSpec from './Components/ParseSpec';
import MetaSpec2 from './Components/MetaSpec';
import DeduplicationSpec from './Components/DeduplicationSpec';
import TransformSpec from './Components/TransformSpec';
import FailureRecoverySpec from './Components/FailureRecoverySpec';
import AdaptorAction from '../../../stores/adaptor/AdaptorAction';

const steps = [
  'Meta Spec',
  'Input Spec',
  'Parse Spec',
  'Deduplication Spec',
  'Transform Spec',
  'Failure Recovery Spec',
  'Publish Spec',
];

function OnboardingPage({ dispatch, adaptorReducer }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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

  const handleReset = () => {
    setActiveStep(0);
  };

  const specFile = {
    ...adaptorReducer.metaSpecInput,
    failureRecoverySpec: adaptorReducer.failureRecoverySpecInput,
    inputSpec: adaptorReducer.inputSpecInput,
    parseSpec: adaptorReducer.parseSpecInput,
    deduplicationSpec: adaptorReducer.deduplicationSpecInput,
    transformSpec: adaptorReducer.transformSpecInput,
    publishSpec: adaptorReducer.publishSpecInput,
  };

  const onboardingFunction = () => {
    const headers = {
      username: 'user',
      password: 'user-password',
      'Content-Type': 'application/json',
    };
    dispatch(AdaptorAction.requestOnboarding, specFile, headers);
  };

  return (
    <div
      style={{
        marginBottom: '20px',
        marginTop: '20px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <div style={{ width: '80%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
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
                {/* <StepLabel {...labelProps}>{label}</StepLabel> */}
                <StepButton {...labelProps} onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>

        <Typography>{getStepContent(activeStep)}</Typography>

        {activeStep === steps.length ? (
          <React.Fragment>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'row',
                marginLeft: '80px',
              }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    overflow: 'auto',

                    flex: 'display',
                    width: '500px',
                    height: '900px',
                    border: '1px solid',
                    borderColor: 'black',
                    borderRadius: '3px',
                  }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Title>Input Spec</Title>
                <Editor
                  disabled
                  value={
                    adaptorReducer.message === ''
                      ? ''
                      : JSON.stringify(adaptorReducer.inputSpecInput, null, 4)
                  }
                  highlight={value => highlight(value, languages.jsx)}
                  padding={20}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    overflow: 'auto',

                    flex: 'display',
                    width: '500px',
                    height: '250px',
                    border: '1px solid',
                    borderColor: 'black',
                    borderRadius: '3px',
                  }}
                />
                <Title>Transform Spec Output</Title>
                <Editor
                  disabled
                  value={
                    adaptorReducer.message === ''
                      ? ''
                      : JSON.stringify(adaptorReducer.transformSpec, null, 4)
                  }
                  highlight={value => highlight(value, languages.jsx)}
                  padding={20}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                    overflow: 'auto',

                    flex: 'display',
                    width: '500px',
                    height: '250px',
                    border: '1px solid',
                    borderColor: 'black',
                    borderRadius: '3px',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                margin: '3%',
              }}>
              <Button
                onClick={() => {
                  console.log('Clicked');
                }}>
                Submit Spec Outline
              </Button>
            </div>
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
        )}
      </div>
    </div>
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
