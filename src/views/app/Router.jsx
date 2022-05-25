import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { usePromiseTracker } from 'react-promise-tracker';

import Loading from '../shared/components/Loading';
import StepperPage from './StepperPage';
import Home from '../pages/Home';

const Router = ({ dispatch }) => {
  const { promiseInProgress } = usePromiseTracker();
  const [loading, setLoading] = React.useState(false);

  return (
    <main>
      {promiseInProgress && <Loading loading={promiseInProgress} />}
      {loading && <Loading loading={loading} />}
      {!loading && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stepper" element={<StepperPage />} />
        </Routes>
      )}
    </main>
  );
};

Router.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(Router);
