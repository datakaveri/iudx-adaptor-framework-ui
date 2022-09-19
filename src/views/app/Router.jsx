import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { usePromiseTracker } from 'react-promise-tracker';

import Loading from '../shared/components/Loading';
import OnboardingPage from '../pages/Onboarding';
import Home from '../pages/Home';
import Navbar from '../shared/components/Navbar';
import MyAdaptorsPage from '../pages/MyAdaptors';
import AuthApi from '../../utilities/AuthApi';
import Login from '../pages/Login/index';
import Rules from '../pages/Rules';

const Router = () => {
  const { promiseInProgress } = usePromiseTracker();
  const [loading, setLoading] = React.useState(false);
  const Auth = useContext(AuthApi);

  return (
    <div>
      <Navbar />
      <main>
        {promiseInProgress && <Loading loading={promiseInProgress} />}
        {loading && <Loading loading={loading} />}
        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/onboarding"
              element={
                Auth.auth ? <OnboardingPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/myadaptors"
              element={
                Auth.auth ? <MyAdaptorsPage /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/login"
              element={Auth.auth ? <Navigate to="/" /> : <Login />}
            />

            <Route path="/rules" element={<Rules />} />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default Router;
