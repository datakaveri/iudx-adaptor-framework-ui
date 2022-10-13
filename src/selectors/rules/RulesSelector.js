import { createSelector } from 'reselect';

export class RulesSelector {
  static selectRules(rules) {
    if (Array.isArray(rules) && rules.length) {
      return rules;
    }
    return [];
  }

  static selectTestRuleResult(ruleTestResponse) {
    return ruleTestResponse;
  }
}

export const selectRules = createSelector(
  state => state.rulesEngine.rules,
  RulesSelector.selectRules,
);

export const selectTestRuleResult = createSelector(
  state => state.rulesEngine.ruleTestResponse,
  RulesSelector.selectTestRuleResult,
);
