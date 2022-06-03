import ActionUtility from '../../utilities/ActionUtility';
import AdaptorEffect from './AdaptorEffect';

export default class AdaptorAction {
  static RUN_INPUT_SPEC = 'RUN_INPUT_SPEC';

  static RUN_INPUT_SPEC_FINISHED = 'RUN_INPUT_SPEC_FINISHED';

  static requestInputSpec(data) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AdaptorAction.RUN_INPUT_SPEC,
        AdaptorEffect.requestInputSpec,
        data,
      );
    };
  }
}
