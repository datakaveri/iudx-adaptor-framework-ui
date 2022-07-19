import { v4 as uuidv4 } from 'uuid';
import ActionUtility from '../../utilities/ActionUtility';

export default class ToastsAction {
  static ADD_TOAST = 'ToastsAction.ADD_TOAST';

  static REMOVE_TOAST = 'ToastsAction.REMOVE_TOAST';

  static add(message, type, title, color) {
    return ActionUtility.createAction(ToastsAction.ADD_TOAST, {
      message,
      type,
      id: uuidv4(),
      color,
    });
  }

  static removeById(toastId) {
    return ActionUtility.createAction(ToastsAction.REMOVE_TOAST, toastId);
  }
}
