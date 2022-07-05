import ActionUtility from '../../utilities/ActionUtility';
import MyAdaptorsEffect from './MyAdaptorsEffect';

export default class MyAdaptorsAction {
  static REQUEST_GET_ADAPTORS = 'MyAdaptorsAction.REQUEST_GET_ADAPTORS';

  static REQUEST_GET_ADAPTORS_FINISHED =
    'MyAdaptorsAction.REQUEST_GET_ADAPTORS_FINISHED';

  static requestGetAdaptors(headers) {
    return async dispatch => {
      await ActionUtility.createThunkEffect(
        dispatch,
        MyAdaptorsAction.REQUEST_GET_ADAPTORS,
        MyAdaptorsEffect.requestGetAdaptors,
        headers,
      );
    };
  }
}
