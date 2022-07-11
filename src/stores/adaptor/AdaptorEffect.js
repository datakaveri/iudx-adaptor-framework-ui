import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import InputSpecResponseModel from './models/inputSpecResponse/InputSpecResponseModel';
import ParseSpecResponseModel from './models/parseSpecResponse/ParseSpecResponseModel';
import TransformSpecResponseModel from './models/transformSpecResponse/TransformSpecResponseModel';
import config from '../../environments';

export default class AdaptorEffect {
  static async requestInputSpec(data, headers) {
    const response = await HttpUtility.post(
      `${config.BACKEND_URL}/onboard/run-input-spec`,
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
      `${config.BACKEND_URL}/onboard/run-parse-spec`,
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
      `${config.BACKEND_URL}/onboard/run-transformation-spec`,
      data,
      headers,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return new TransformSpecResponseModel(response.data);
  }

  static async requestOnboarding(data, headers) {
    const response = await HttpUtility.post(
      `${config.BACKEND_URL}/adaptor`,
      data,
      headers,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
  }
}
