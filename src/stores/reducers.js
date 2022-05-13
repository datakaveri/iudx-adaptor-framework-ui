import { combineReducers } from '@reduxjs/toolkit';

import RequestingReducer from './requesting/RequestingReducer';
import ErrorReducer from './error/ErrorReducer';
import ToastsReducer from './toasts/ToastsReducer';

export default () => {
  const reducerMap = {
    error: ErrorReducer.reducer,
    requesting: RequestingReducer.reducer,
    toasts: new ToastsReducer().reducer,
  };

  return combineReducers(reducerMap);
};
