import ActionUtility from '../../utilities/ActionUtility';
import AdaptorEffect from './AdaptorEffect';

export default class AdaptorAction {
  static REQUEST_RUN_INPUT_SPEC = 'AdaptorAction.REQUEST_RUN_INPUT_SPEC';

  static REQUEST_RUN_INPUT_SPEC_FINISHED = 'AdaptorAction.REQUEST_RUN_INPUT_SPEC_FINISHED';

  static requestInputSpec(data) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AdaptorAction.REQUEST_RUN_INPUT_SPEC,
        AdaptorEffect.requestInputSpec,
        data,
      );
    };
  }
}
