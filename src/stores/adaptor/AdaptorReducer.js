import BaseReducer from '../../utilities/BaseReducer';
import AdaptorAction from './AdaptorAction';

export default class AdaptorReducer extends BaseReducer {
  initialState = {
    inputSpec: {},
    error: false,
  };

  [AdaptorAction.RUN_INPUT_SPEC_FINISHED](state, action) {
    return {
      ...state,
      inputSpec: action.payload,
    };
  }
}
