import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Snackbar } from '@mui/material';

import ToastsAction from '../../stores/toasts/ToastsAction';

const Toasts = ({ toasts, dispatch }) => {
  useEffect(() => {
    const navigate = () => {
      toasts.forEach(model => {
        if (model.message === 'Unauthorized') {
          console.log('Unauthorized');
        }
      });
    };
    navigate();
  }, [Toasts]);

  const removeToast = id => {
    dispatch(ToastsAction.removeById(id));
  };

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div>
      {toasts.map(model => (
        <Snackbar
          open
          onClose={() => removeToast(model.id)}
          message={model.message}
          key={model.id}
          autoHideDuration={2000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        />
      ))}
    </div>
  );
};

Toasts.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  toasts: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  toasts: state.toasts.items,
  dispatch: state.dispatch,
});

export default connect(mapStateToProps)(Toasts);
