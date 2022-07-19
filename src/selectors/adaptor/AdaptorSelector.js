import { createSelector } from 'reselect';

export class AdaptorSelector {
  static selectAdaptors(adaptors) {
    if (Array.isArray(adaptors) && adaptors.length) {
      return adaptors;
    }
    return [];
  }
}

export const selectAdaptors = createSelector(
  state => state.adaptorReducer.adaptors,
  AdaptorSelector.selectAdaptors,
);
