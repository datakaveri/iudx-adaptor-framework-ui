import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import configStore from '../../stores/configStore';
import Loading from '../shared/components/Loading';
import Toasts from '../toasts';
import Router from './Router';
import Navbar from '../shared/components/Navbar';

const Wrapper = styled.div`
 
 
`;


const App = () => {
  const initialState = {};
  const store = configStore(initialState);

  return (
    <Provider store={store}>
       
      <Wrapper>
        <Toasts />
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </Suspense>
      </Wrapper>
    </Provider>
  );
};

export default App;
