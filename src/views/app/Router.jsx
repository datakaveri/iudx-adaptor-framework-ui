import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { usePromiseTracker } from 'react-promise-tracker';
import PublishSpec from '../pages/Home/publish_spec';
import FailureRecoverySpec from '../pages/Home/failure_recovery_spec';
import Loading from '../shared/components/Loading';
import Home from '../pages/Home';

import InputSpec from '../pages/Home/fragments/InputSpec';
import DuplicationSpec from '../pages/Home/fragments/DuplicationSpec';
import ParseSpec from '../pages/Home/parse_spec';
import TransformSpec from '../pages/Home/transform_spec';


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
          <Route path="/inputspec" element={<InputSpec />} />
          <Route path="/duplicationspec" element={<DuplicationSpec />} />
          <Route path="/publishspec" element={<PublishSpec />}/>
          <Route path="/failurerecoveryspec" element={<FailureRecoverySpec />}/>
          <Route path='/parsespec' element={<ParseSpec/>}/>
          <Route path='/transformspec' element={<TransformSpec/>}/>
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
