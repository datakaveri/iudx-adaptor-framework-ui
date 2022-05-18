import React from 'react';
import PropTypes from 'prop-types';

export default function InputBox({ name, id }) {
  return (
    <div className="inputBox">
      <label htmlFor={id}>{name}</label>
      <br />
      <input type="text" id={id} name={name} />
      <br />
    </div>
  );
}

InputBox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
};

InputBox.defaultProps = {
  name: PropTypes.string,
  id: PropTypes.string,
};
