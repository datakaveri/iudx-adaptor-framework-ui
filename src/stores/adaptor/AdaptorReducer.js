import BaseReducer from '../../utilities/BaseReducer';
import AdaptorAction from './AdaptorAction';

export default class AdaptorReducer extends BaseReducer {
  initialState = {
    inputSpec: {},
    transformSpec: {},
    error: false,
  };

  [AdaptorAction.REQUEST_RUN_INPUT_SPEC_FINISHED](state, action) {
    return {
      ...state,
      inputSpec: action.payload,
    };
  }

  [AdaptorAction.REQUEST_RUN_TRANSFORM_SPEC_FINISHED](state, action) {
    return {
      ...state,
      transformSpec: action.payload,
    };
  }
}
