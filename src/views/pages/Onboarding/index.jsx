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
import PublishSpec2 from './Components/PublishSpec2';
import InputSpec2 from './Components/InputSpec2';
import ParseSpec2 from './Components/ParseSpec2';
import MetaSpec2 from './Components/MetaSpec2';
import DeduplicationSpec2 from './Components/DeduplicationSpec2';
import TransformSpec2 from './Components/TransformSpec2';
import FailureRecoverySpec2 from './Components/FailureRecoverySpec2';

const steps = [
  'Meta Spec',
  'Input Spec',
  'Parse Spec',
  'Deduplication Spec',
  'Transform Spec',
  'Failure Recovery Spec',
  'Publish Spec',
];

function OnboardingPage({ adaptorReducer }) {
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
        // return <MetaSpec />;
        return <MetaSpec2 />;
      case 1:
        return <InputSpec2 />;
      case 2:
        return <ParseSpec2 />;
      case 3:
        return <DeduplicationSpec2 />;
      case 4:
        return <TransformSpec2 />;
      case 5:
        return <FailureRecoverySpec2 />;
      case 6:
        return <PublishSpec2 />;

      default:
        return '';
    }
  }

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div
      style={{
        marginBottom: '20px',
        marginTop: '20px',
        width: '100%',
        height: '100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
      }}>
        <div style={{width:"80%"}}>
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
          {/* <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography> */}

          <Title>Spec Outline</Title>
          <hr />
          <div style={{ marginLeft: '80px' }}>
            <div style={{ display: 'flex' }}>
              <Editor
                disabled
                value={
                  adaptorReducer.message === ''
                    ? ''
                    : JSON.stringify(adaptorReducer, null, 4)
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
