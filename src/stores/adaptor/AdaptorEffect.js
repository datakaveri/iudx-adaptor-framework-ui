import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import InputSpecResponseModel from './models/inputSpecResponse/InputSpecResponseModel';
import ParseSpecResponseModel from './models/parseSpecResponse/ParseSpecResponseModel';
import TransformSpecResponseModel from './models/transformSpecResponse/TransformSpecResponseModel';

export default class AdaptorEffect {
  static async requestInputSpec(data, headers) {
    const response = await HttpUtility.post(
      'http://localhost:8080/onboard/run-input-spec',
      data,
      headers,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return new InputSpecResponseModel(response.data);
  }

  static async requestParseSpec(data, headers) {
    const response = await await HttpUtility.post(
      'http://localhost:8080/onboard/run-parse-spec',
      data,
      headers,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return new ParseSpecResponseModel(response.data);
  }

  static async requestTransformSpec(data, headers) {
    const response = await HttpUtility.post(
      'http://localhost:8080/onboard/run-transformation-spec',
      data,
      headers,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return new TransformSpecResponseModel(response.data);
  }
}
