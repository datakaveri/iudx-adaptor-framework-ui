import ActionUtility from '../../utilities/ActionUtility';
import AdaptorEffect from './AdaptorEffect';

export default class AdaptorAction {
  static SAVE_META_SPEC = 'AdaptorAction.SAVE_META_SPEC';

  static SAVE_INPUT_SPEC = 'AdaptorAction.SAVE_INPUT_SPEC';

  static SAVE_PARSE_SPEC = 'AdaptorAction.SAVE_PARSE_SPEC';

  static SAVE_DEDUPLICATION_SPEC = 'AdaptorAction.SAVE_DEDUPLICATION_SPEC';

  static SAVE_TRANSFORM_SPEC = 'AdaptorAction.SAVE_TRANSFORM_SPEC';

  static SAVE_FAILURE_RECOVERY_SPEC =
    'AdaptorAction.SAVE_FAILURE_RECOVERY_SPEC';

  static SAVE_PUBLISH_SPEC = 'AdaptorAction.SAVE_PUBLISH_SPEC';

  static REQUEST_RUN_INPUT_SPEC = 'AdaptorAction.REQUEST_RUN_INPUT_SPEC';

  static REQUEST_RUN_INPUT_SPEC_FINISHED =
    'AdaptorAction.REQUEST_RUN_INPUT_SPEC_FINISHED';

  static REQUEST_RUN_TRANSFORM_SPEC =
    'AdaptorAction.REQUEST_RUN_TRANSFORM_SPEC';

  static REQUEST_RUN_TRANSFORM_SPEC_FINISHED =
    'AdaptorAction.REQUEST_RUN_TRANSFORM_SPEC_FINISHED';

  static REQUEST_RUN_PARSE_SPEC = 'AdaptorAction.REQUEST_RUN_PARSE_SPEC';

  static REQUEST_RUN_PARSE_SPEC_FINISHED =
    'AdaptorAction.REQUEST_RUN_PARSE_SPEC_FINISHED';

  static REQUEST_GET_ADAPTORS = 'AdaptorAction.REQUEST_GET_ADAPTORS';

  static REQUEST_GET_ADAPTORS_FINISHED =
    'AdaptorAction.REQUEST_GET_ADAPTORS_FINISHED';

  static saveMetaSpec(data) {
    return ActionUtility.createAction(AdaptorAction.SAVE_META_SPEC, data);
  }

  static saveInputSpec(data) {
    return ActionUtility.createAction(AdaptorAction.SAVE_INPUT_SPEC, data);
  }

  static saveParseSpec(data) {
    return ActionUtility.createAction(AdaptorAction.SAVE_PARSE_SPEC, data);
  }

  static saveDeduplicationSpec(data) {
    return ActionUtility.createAction(
      AdaptorAction.SAVE_DEDUPLICATION_SPEC,
      data,
    );
  }

  static saveTransformSpec(data) {
    return ActionUtility.createAction(AdaptorAction.SAVE_TRANSFORM_SPEC, data);
  }

  static saveFailureRecoverySpec(data) {
    return ActionUtility.createAction(
      AdaptorAction.SAVE_FAILURE_RECOVERY_SPEC,
      data,
    );
  }

  static savePublishSpec(data) {
    return ActionUtility.createAction(AdaptorAction.SAVE_PUBLISH_SPEC, data);
  }

  static requestParseSpec(data, headers) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AdaptorAction.REQUEST_RUN_PARSE_SPEC,
        AdaptorEffect.requestParseSpec,
        data,
        headers,
      );
    };
  }

  static requestInputSpec(data, headers) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AdaptorAction.REQUEST_RUN_INPUT_SPEC,
        AdaptorEffect.requestInputSpec,
        data,
        headers,
      );
    };
  }

  static requestTransformSpec(data, headers) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AdaptorAction.REQUEST_RUN_TRANSFORM_SPEC,
        AdaptorEffect.requestTransformSpec,
        data,
        headers,
      );
    };
  }

  static getAllAdaptors() {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AdaptorAction.REQUEST_GET_ADAPTORS,
        AdaptorEffect.getAllAdaptors,
      );
    };
  }
}
