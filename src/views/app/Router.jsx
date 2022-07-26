import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { usePromiseTracker } from 'react-promise-tracker';

import Loading from '../shared/components/Loading';
import OnboardingPage from '../pages/Onboarding';
import Home from '../pages/Home';
import Navbar from '../shared/components/Navbar';
import MyAdaptorsPage from '../pages/MyAdaptors';

const Router = () => {
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
            <Route path="/myadaptors" element={<MyAdaptorsPage />} />
          </Routes>
        )}
      </main>
    </div>
  );
};

export default Router;
