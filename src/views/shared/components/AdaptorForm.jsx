/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Form as FinalForm } from 'react-final-form';

const AdaptorForm = props => (
  <FinalForm
    onSubmit={props.onSubmit}
    render={renderProps => (
      <form onSubmit={renderProps.handleSubmit}>
        {props.children(renderProps)}
      </form>
    )}
  />
);

export default AdaptorForm;
