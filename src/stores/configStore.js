import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import monitorReducerEnhancer from '../enhancers/monitorReducer';
import logger from '../middlewares/logger';
import reducers from './reducers';

export default initialState => {
  const middlewares = [thunk, logger];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];

  const store = configureStore({
    preloadedState: initialState,
    reducer: reducers(),
    devTools: true,
    enhancers,
  });

  return store;
};
