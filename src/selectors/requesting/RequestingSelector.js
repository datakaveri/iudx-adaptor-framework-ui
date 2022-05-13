import { createSelector } from '@reduxjs/toolkit';

export class RequestingSelector {
  static selectRequesting(requestingState, actionTypes) {
    return actionTypes.some(actionType => requestingState[actionType]);
  }
}

export const selectRequesting = createSelector(
  state => state.requesting,
  (state, actionTypes) => actionTypes,
  RequestingSelector.selectRequesting,
);
