import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { usePromiseTracker } from 'react-promise-tracker';

import Loading from '../shared/components/Loading';
import OnboardingPage from '../pages/Onboarding';
import Home from '../pages/Home';
import Navbar from '../shared/components/Navbar';
import MyAdaptersPage from '../pages/MyAdapters';

const Router = ({ dispatch }) => {
  const { promiseInProgress } = usePromiseTracker();
  const [loading, setLoading] = React.useState(false);

  return (
    <div>
      <Navbar />
      <main>
        {promiseInProgress && <Loading loading={promiseInProgress} />}
        {loading && <Loading loading={loading} />}
        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/myadaptors" element={<MyAdaptersPage />} />
          </Routes>
        )}
      </main>
    </div>
  );
};

Router.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(Router);
