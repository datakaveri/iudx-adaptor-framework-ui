/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/require-default-props */
import * as React from 'react';

import { Box, Button } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';

import { Title } from '../../shared/components/SpecComponents';
import AdaptorAction from '../../../stores/adaptor/AdaptorAction';
import EditorStyle from '../../shared/constants/EditorStyle';
import EditorStyleLarge from '../../shared/constants/EditorStyleLarge';
import ToastsAction from '../../../stores/toasts/ToastsAction';
import Loader from '../../shared/components/Loader';
import MenuApi from '../../../utilities/MenuApi';
import MenuDialogBox from './Components/UI/MenuDialogBox';
import StepperComponent from './Components/UI/StepperComponent';
import StepperContentComponent from './Components/UI/StepperContentComponent';
import ETLBottomRow from './Components/UI/ETLBottomRow';
import RulesBottomRow from './Components/UI/RulesBottomRow';

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

function OnboardingPage({ dispatch, adaptorReducer, rulesEngine }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [loader, setLoader] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(true);
  const [menuOption, setMenuOption] = React.useState('');

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

  const specFileRules = {
    ...rulesEngine.metaSpecInput,
    failureRecoverySpec:
      rulesEngine.failureRecoverySpecInput !== {}
        ? rulesEngine.failureRecoverySpecInput
        : undefined,
    inputSpec: rulesEngine.inputSpecInput,
    publishSpec: rulesEngine.publishSpecInput,
  };

  const onboardingFunction = async () => {
    const headers = {
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

      <MenuDialogBox
        openMenu={openMenu}
        menuOption={menuOption}
        setOpenMenu={setOpenMenu}
        setMenuOption={setMenuOption}
      />

      <MenuApi.Provider value={{ menuOption, setMenuOption }}>
        <Header>
          <StepperComponent
            menuOption={menuOption}
            skipped={skipped}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />

          <StepperContentComponent
            menuOption={menuOption}
            activeStep={activeStep}
          />

          {menuOption === 'etl' ? (
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
              <ETLBottomRow
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                skipped={skipped}
                setSkipped={setSkipped}
              />
            )
          ) : activeStep === rulesSteps.length ? (
            <>
              <Title>Rules Spec Outline</Title>

              <Editor
                disabled
                value={
                  rulesEngine === ''
                    ? ''
                    : JSON.stringify(specFileRules, null, 4)
                }
                highlight={value => highlight(value, languages.jsx)}
                padding={20}
                style={EditorStyleLarge}
              />
              <Center>
                <Button onClick={onboardingFunction}>
                  Submit Spec Outline
                </Button>
              </Center>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button variant="contained" onClick={handleReset}>
                  Reset
                </Button>
              </Box>
            </>
          ) : (
            <RulesBottomRow
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              skipped={skipped}
              setSkipped={setSkipped}
            />
          )}
        </Header>
      </MenuApi.Provider>
    </Page>
  );
}

OnboardingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  adaptorReducer: PropTypes.any.isRequired,
  rulesEngine: PropTypes.any.isRequired,
};

const mapStateToProps = state => ({
  adaptorReducer: state.adaptorReducer,
  rulesEngine: state.rulesEngine,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingPage);
