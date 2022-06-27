import * as React from 'react';
// import { Route, Routes } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { usePromiseTracker } from 'react-promise-tracker';
// import { act } from 'react-dom/test-utils';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
// import StepContent from '@mui/material/StepContent';
// import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import StepButton from '@mui/material/StepButton';
import Typography from '@mui/material/Typography';

import PublishSpec2 from './Components/PublishSpec2';
import PublishSpec from './Components/PublishSpec';
import FailureRecoverySpec from './Components/FailureRecoverySpec';
// import InputSpec from './Components/InputSpec';
import InputSpec2 from './Components/InputSpec2';
import ParseSpec2 from './Components/ParseSpec2';
// import Loading from '../../shared/components/Loading';
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

export default function OnboardingPage() {
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
        return 'Unknown step';
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
      }}>
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
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
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
  );
}
