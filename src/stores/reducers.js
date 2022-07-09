import { combineReducers } from '@reduxjs/toolkit';

import RequestingReducer from './requesting/RequestingReducer';
import ErrorReducer from './error/ErrorReducer';
import ToastsReducer from './toasts/ToastsReducer';
import AdaptorReducer from './adaptor/AdaptorReducer';

export default () => {
  const reducerMap = {
    error: ErrorReducer.reducer,
    requesting: RequestingReducer.reducer,
    toasts: new ToastsReducer().reducer,
    adaptorReducer: new AdaptorReducer().reducer,
  };

  return combineReducers(reducerMap);
};
