import BaseReducer from '../../utilities/BaseReducer';
import RulesEngineAction from './RulesEngineAction';

export default class RulesEngineReducer extends BaseReducer {
  initialState = {
    metaSpecInput: {},
    inputSpecInput: {},
    failureRecoverySpecInput: {},
    publishSpecInput: {},
    ruleTestResponse: '',
    rules: [],
    error: false,
  };

  [RulesEngineAction.SAVE_META_SPEC](state, action) {
    return {
      ...state,
      metaSpecInput: action.payload,
    };
  }

  [RulesEngineAction.SAVE_INPUT_SPEC](state, action) {
    return {
      ...state,
      inputSpecInput: action.payload,
    };
  }

  [RulesEngineAction.SAVE_FAILURE_RECOVERY_SPEC](state, action) {
    return {
      ...state,
      failureRecoverySpecInput: action.payload,
    };
  }

  [RulesEngineAction.SAVE_PUBLISH_SPEC](state, action) {
    return {
      ...state,
      publishSpecInput: action.payload,
    };
  }

  [RulesEngineAction.REQUEST_GET_RULES_FINISHED](state, action) {
    return {
      ...state,
      rules: action.payload,
    };
  }

  [RulesEngineAction.REQUEST_RULE_TEST_FINISHED](state, action) {
    return {
      ...state,
      ruleTestResponse: action.payload,
    };
  }
}
