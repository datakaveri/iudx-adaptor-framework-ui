import BaseReducer from '../../utilities/BaseReducer';
import MyAdaptorsAction from './MyAdaptorsAction';

export default class MyAdaptorsReducer extends BaseReducer {
  initialState = {
    allAdaptors: '',
  };

  [MyAdaptorsAction.REQUEST_GET_ADAPTORS_FINISHED](state, action) {
    return {
      ...state,
      allAdaptors: action.payload,
    };
  }
}
