import environment from '../../environments';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import AdaptorResponseModel from './models/getAdaptorResponse/AdaptorResponseModel';
import InputSpecResponseModel from './models/inputSpecResponse/InputSpecResponseModel';
import ParseSpecResponseModel from './models/parseSpecResponse/ParseSpecResponseModel';
import TransformSpecResponseModel from './models/transformSpecResponse/TransformSpecResponseModel';

export default class AdaptorEffect {
  static async requestInputSpec(data, headers) {
    const response = await HttpUtility.post(
      `http://localhost:8080/onboard/run-input-spec`,
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
      `http://localhost:8080/onboard/run-parse-spec`,
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
      `http://localhost:8080/onboard/run-transformation-spec`,
      data,
      headers,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return new TransformSpecResponseModel(response.data);
  }

  static async getAllAdaptors() {
    const response = await HttpUtility.get(
      `${environment.BACKEND_URL}/adaptor`,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    if (response.data && Array.isArray(response.data.adaptors)) {
      return response.data.adaptors.map(
        adaptor => new AdaptorResponseModel(adaptor),
      );
    }
    return [];
  }

  static async submitJob(jobConfig, headers) {
    const response = await HttpUtility.post(
      `http://localhost:8080/adaptor`,
      jobConfig,
      headers,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
  }

  static async startJob(jobName) {
    const response = await HttpUtility.post(
      `${environment.BACKEND_URL}/adaptor/${jobName}/start`,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
  }

  static async stopJob(jobName) {
    const response = await HttpUtility.post(
      `${environment.BACKEND_URL}/adaptor/${jobName}/stop`,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
  }

  static async deleteJob(jobName) {
    const response = await HttpUtility.delete(
      `${environment.BACKEND_URL}/adaptor/${jobName}`,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
  }
}
