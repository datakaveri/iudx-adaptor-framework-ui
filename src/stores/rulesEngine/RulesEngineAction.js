import ActionUtility from '../../utilities/ActionUtility';

export default class RulesEngineAction {
  static SAVE_META_SPEC = 'RulesEngineAction.SAVE_META_SPEC';

  static SAVE_INPUT_SPEC = 'RulesEngineAction.SAVE_INPUT_SPEC';

  static SAVE_FAILURE_RECOVERY_SPEC =
    'RulesEngineAction.SAVE_FAILURE_RECOVERY_SPEC';

  static SAVE_PUBLISH_SPEC = 'RulesEngineAction.SAVE_PUBLISH_SPEC';

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
}
