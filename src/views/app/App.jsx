import React, { Suspense, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import configStore from '../../stores/configStore';
import Loading from '../shared/components/Loading';
import Toasts from '../toasts';
import Router from './Router';
import AuthApi from '../../utilities/AuthApi';

const Wrapper = styled.div``;

const App = () => {
  const initialState = {};
  const store = configStore(initialState);
  const [auth, setAuth] = useState(false);

  return (
    <Provider store={store}>
      <Wrapper>
        <Toasts />
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            {/* eslint-disable-next-line react/jsx-no-constructed-context-values */}
            <AuthApi.Provider value={{ auth, setAuth }}>
              <Router />
            </AuthApi.Provider>
          </BrowserRouter>
        </Suspense>
      </Wrapper>
    </Provider>
  );
};

export default App;
