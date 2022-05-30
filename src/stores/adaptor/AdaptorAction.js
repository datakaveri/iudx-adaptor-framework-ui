import axios from 'axios';
export const RUN_INPUT_SPEC = 'RUN_INPUT_SPEC';
export const RUN_INPUT_SPEC_FAILED = 'RUN_INPUT_SPEC_FAILED';

export const runInputSpec = resp => {
  return {
    type: RUN_INPUT_SPEC,
    payload: {
      resp,
    },
  };
};

export const runInputSpecFailed = () => {
  return {
    type: RUN_INPUT_SPEC_FAILED,
  };
};

export const runInputSpecApi = postBody => {
  return dispatch => {
    axios
      .post('localhost:4010//onboard/run-input-spec')
      .then(response => dispatch(runInputSpec(response.data)))
      .catch(err => {
        console.log('Error: ' + err);
        dispatch(runInputSpecFailed());
      });
  };
};
