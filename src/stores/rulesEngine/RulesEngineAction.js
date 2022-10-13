import ActionUtility from '../../utilities/ActionUtility';
import RulesEngineEffect from './RulesEngineEffect';

export default class RulesEngineAction {
  static SAVE_META_SPEC = 'RulesEngineAction.SAVE_META_SPEC';

  static SAVE_INPUT_SPEC = 'RulesEngineAction.SAVE_INPUT_SPEC';

  static SAVE_FAILURE_RECOVERY_SPEC =
    'RulesEngineAction.SAVE_FAILURE_RECOVERY_SPEC';

  static SAVE_PUBLISH_SPEC = 'RulesEngineAction.SAVE_PUBLISH_SPEC';

  static REQUEST_GET_RULES = 'RulesEngineAction.REQUEST_GET_RULES';

  static REQUEST_GET_RULES_FINISHED =
    'RulesEngineAction.REQUEST_GET_RULES_FINISHED';

  static REQUEST_SUBMIT_RULE = 'RulesEngineAction.REQUEST_SUBMIT_RULE';

  static REQUEST_SUBMIT_RULE_FINISHED =
    'RulesEngineAction.REQUEST_SUBMIT_RULE_FINISHED';

  static REQUEST_DELETE_RULE = 'RulesEngineAction.REQUEST_DELETE_RULE';

  static REQUEST_DELETE_RULE_FINISHED =
    'RulesEngineAction.REQUEST_DELETE_RULE_FINISHED';

  static REQUEST_RULE_TEST = 'RulesEngineAction.REQUEST_RULE_TEST';

  static REQUEST_RULE_TEST_FINISHED =
    'RulesEngineAction.REQUEST_RULE_TEST_FINISHED';

  static saveMetaSpec(data) {
    return ActionUtility.createAction(RulesEngineAction.SAVE_META_SPEC, data);
  }

  static saveInputSpec(data) {
    return ActionUtility.createAction(RulesEngineAction.SAVE_INPUT_SPEC, data);
  }

  static saveFailureRecoverySpec(data) {
    return ActionUtility.createAction(
      RulesEngineAction.SAVE_FAILURE_RECOVERY_SPEC,
      data,
    );
  }

  static savePublishSpec(data) {
    return ActionUtility.createAction(
      RulesEngineAction.SAVE_PUBLISH_SPEC,
      data,
    );
  }

  static getRules(adaptorId) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        RulesEngineAction.REQUEST_GET_RULES,
        RulesEngineEffect.getRules,
        adaptorId,
      );
    };
  }

  static submitRule(ruleConfig) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        RulesEngineAction.REQUEST_SUBMIT_RULE,
        RulesEngineEffect.submitRule,
        ruleConfig,
      );
    };
  }

  static deleteRule(adaptorId, ruleId) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        RulesEngineAction.REQUEST_DELETE_RULE,
        RulesEngineEffect.deleteRule,
        adaptorId,
        ruleId,
      );
    };
  }

  static testRule(query, inputData) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        RulesEngineAction.REQUEST_RULE_TEST,
        RulesEngineEffect.testRule,
        query,
        inputData,
      );
    };
  }
}
