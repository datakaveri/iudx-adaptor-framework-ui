import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { usePromiseTracker } from 'react-promise-tracker';
import PublishSpec from '../pages/Home/publish_spec';
import FailureRecoverySpec from '../pages/Home/failure_recovery_spec';
import Loading from '../shared/components/Loading';
import Home from '../pages/Home';

// TODO change this later accordingly
const Pages = () => (
  <Routes>
    <Route path="" element={<Home />} />
  </Routes>
);

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
          <Route path="/dashboard" element={<Pages />} />
          <Route path="/publishspec" element={<PublishSpec />}/>
          <Route path="/failurerecoveryspec" element={<FailureRecoverySpec />}/>
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
