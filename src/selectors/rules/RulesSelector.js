import { createSelector } from 'reselect';

export class RulesSelector {
  static selectRules(rules) {
    if (Array.isArray(rules) && rules.length) {
      return rules;
    }
    return [];
  }
}

export const selectRules = createSelector(
  state => state.rulesEngine.rules,
  RulesSelector.selectRules,
);
