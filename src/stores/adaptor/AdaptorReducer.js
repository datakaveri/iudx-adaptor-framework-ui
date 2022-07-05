import BaseReducer from '../../utilities/BaseReducer';
import AdaptorAction from './AdaptorAction';

export default class AdaptorReducer extends BaseReducer {
  initialState = {
    metaSpecInput: {},
    inputSpecInput: {},
    parseSpecInput: {},
    deduplicationSpecInput: {},
    transformSpecInput: {},
    failureRecoverySpecInput: {},
    publishSpecInput: {},
    inputSpec: {},
    parseSpec: {},
    transformSpec: {},
    error: false,
  };

  [AdaptorAction.REQUEST_RUN_INPUT_SPEC_FINISHED](state, action) {
    return {
      ...state,
      inputSpec: action.payload,
    };
  }

  [AdaptorAction.REQUEST_RUN_PARSE_SPEC_FINISHED](state, action) {
    return {
      ...state,
      parseSpec: action.payload,
    };
  }

  [AdaptorAction.REQUEST_RUN_TRANSFORM_SPEC_FINISHED](state, action) {
    return {
      ...state,
      transformSpec: action.payload,
    };
  }

  [AdaptorAction.SAVE_META_SPEC](state, action) {
    return {
      ...state,
      metaSpecInput: action.payload,
    };
  }

  [AdaptorAction.SAVE_INPUT_SPEC](state, action) {
    return {
      ...state,
      inputSpecInput: action.payload,
    };
  }

  [AdaptorAction.SAVE_PARSE_SPEC](state, action) {
    return {
      ...state,
      parseSpecInput: action.payload,
    };
  }

  [AdaptorAction.SAVE_DEDUPLICATION_SPEC](state, action) {
    return {
      ...state,
      deduplicationSpecInput: action.payload,
    };
  }

  [AdaptorAction.SAVE_TRANSFORM_SPEC](state, action) {
    return {
      ...state,
      transformSpecInput: action.payload,
    };
  }

  [AdaptorAction.SAVE_FAILURE_RECOVERY_SPEC](state, action) {
    return {
      ...state,
      failureRecoverySpecInput: action.payload,
    };
  }

  [AdaptorAction.SAVE_PUBLISH_SPEC](state, action) {
    return {
      ...state,
      publishSpecInput: action.payload,
    };
  }
}
