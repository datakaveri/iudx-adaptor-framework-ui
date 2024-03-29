import React, { Suspense, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie';

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

  const readCookie = () => {
    const user = Cookies.get('user');
    if (user) {
      setAuth(user);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

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
