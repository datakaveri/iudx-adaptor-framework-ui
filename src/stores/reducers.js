import { combineReducers } from '@reduxjs/toolkit';

import RequestingReducer from './requesting/RequestingReducer';
import ErrorReducer from './error/ErrorReducer';
import ToastsReducer from './toasts/ToastsReducer';
import AdaptorReducer from './adaptor/AdaptorReducer';
import MyAdaptorsReducer from './myAdaptors/MyAdaptorsReducer';

export default () => {
  const reducerMap = {
    error: ErrorReducer.reducer,
    requesting: RequestingReducer.reducer,
    toasts: new ToastsReducer().reducer,
    adaptorReducer: new AdaptorReducer().reducer,
    myAdaptorsReducer: new MyAdaptorsReducer().reducer,
  };

  return combineReducers(reducerMap);
};
