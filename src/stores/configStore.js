import { applyMiddleware, compose, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import monitorReducerEnhancer from '../enhancers/monitorReducer';
import logger from '../middlewares/logger';
import reducers from './reducers';

export default initialState => {
  const middlewares = [logger, thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = configureStore({
    preloadedState: initialState,
    reducer: reducers(),
    enhancers: composedEnhancers,
    devTools: true,
  });

  return store;
};
