import React from 'react';
import { Stepper, Step, StepButton, Typography } from '@mui/material';
import { PropTypes } from 'prop-types';

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
  'Failure Recovery Spec',
  'Publish Spec',
];

const StepperComponent = ({
  menuOption,
  skipped,
  activeStep,
  setActiveStep,
}) => {
  const isStepOptional = step =>
    menuOption === 'etl' ? step === 5 : step === 2;

  const isStepSkipped = step => skipped.has(step);

  const handleStep = step => () => {
    if (step < activeStep) setActiveStep(step);
  };
  return (
    <Stepper activeStep={activeStep}>
      {menuOption === 'etl'
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
  );
};

StepperComponent.propTypes = {
  menuOption: PropTypes.string.isRequired,
  skipped: PropTypes.bool.isRequired,
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

export default StepperComponent;
