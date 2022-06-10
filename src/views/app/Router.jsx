import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { usePromiseTracker } from 'react-promise-tracker';

import Loading from '../shared/components/Loading';
import OnboardingPage from '../pages/Onboarding';
import Home from '../pages/Home';
import Navbar from '../shared/components/Navbar';

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
          <Route path="/onboarding" element={<OnboardingPage />} />
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
