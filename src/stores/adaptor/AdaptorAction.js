import ActionUtility from '../../utilities/ActionUtility';
import AdaptorEffect from './AdaptorEffect';

export default class AdaptorAction {
  static RUN_INPUT_SPEC = 'RUN_INPUT_SPEC';

  static RUN_INPUT_SPEC_FINISHED = 'RUN_INPUT_SPEC_FINISHED';

  static runInputSpec(data) {
    return async (dispatch, getState) => {
      await ActionUtility.createThunkEffect(
        dispatch,
        AdaptorAction.RUN_INPUT_SPEC,
        AdaptorEffect.runInputSpec(data),
      );
    };
  }
}
