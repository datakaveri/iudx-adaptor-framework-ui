import axios from 'axios';

export default class AdaptorEffect {
  static async runInputSpec(postBody) {
    const endpoint = await axios.post(
      'localhost:4010/onboard/run-input-spec',
      postBody,
    );
    return endpoint;
  }
}
