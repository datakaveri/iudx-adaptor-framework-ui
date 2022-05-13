import ToastsAction from './toasts/ToastsAction';

const errorToastMiddleware = () => store => next => action => {
  if (action.error) {
    const errorAction = action;

    next(ToastsAction.add(errorAction.payload?.message, 'ERROR'));
  }

  next(action);
};

export default errorToastMiddleware;
