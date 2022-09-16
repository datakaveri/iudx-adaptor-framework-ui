/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { PropTypes } from 'prop-types';
import { Typography } from '@mui/material';

import PublishSpec from '../PublishSpec';
import InputSpec from '../InputSpec';
import InputSpecRules from '../InputSpecRules';
import ParseSpec from '../ParseSpec';
import MetaSpec2 from '../MetaSpec';
import DeduplicationSpec from '../DeduplicationSpec';
import TransformSpec from '../TransformSpec';
import FailureRecoverySpec from '../FailureRecoverySpec';

const StepperContentComponent = ({ menuOption, activeStep }) => {
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
        return <FailureRecoverySpec />;
      case 3:
        return <PublishSpec />;
      default:
        return '';
    }
  }
  return menuOption === 'etl' ? (
    <Typography>{getStepContent(activeStep)}</Typography>
  ) : (
    <Typography>{getStepContentRules(activeStep)}</Typography>
  );
};

StepperContentComponent.propTypes = {
  menuOption: PropTypes.any.isRequired,
  activeStep: PropTypes.any.isRequired,
};

export default StepperContentComponent;
