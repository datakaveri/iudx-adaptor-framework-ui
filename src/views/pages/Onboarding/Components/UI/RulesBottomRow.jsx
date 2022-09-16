/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Box, Button } from '@mui/material';
import { PropTypes } from 'prop-types';

const rulesSteps = [
  'Meta Spec',
  'Input Spec',
  'Failure Recovery Spec',
  'Publish Spec',
];

const RulesBottomRow = ({ activeStep, setActiveStep, skipped, setSkipped }) => {
  const isStepOptional = step => step === 5;

  const isStepSkipped = step => skipped.has(step);

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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
      <Button
        variant="contained"
        color="inherit"
        size="large"
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

      <Button variant="contained" size="large" onClick={handleNext}>
        {activeStep === rulesSteps.length - 1 ? 'Finish' : 'Next'}
      </Button>
    </Box>
  );
};

RulesBottomRow.propTypes = {
  activeStep: PropTypes.any.isRequired,
  setActiveStep: PropTypes.any.isRequired,
  skipped: PropTypes.any.isRequired,
  setSkipped: PropTypes.any.isRequired,
};

export default RulesBottomRow;
