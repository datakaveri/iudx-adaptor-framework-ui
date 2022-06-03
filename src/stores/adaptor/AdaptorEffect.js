import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import InputSpecResponseModel from './models/inputSpecResponse/InputSpecResponseModel';

export default class AdaptorEffect {
  static async runInputSpec(data) {
    const response = await HttpUtility.post(
      'http://localhost:4010/onboard/run-input-spec',
      data,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return new InputSpecResponseModel(data);
  }
}
