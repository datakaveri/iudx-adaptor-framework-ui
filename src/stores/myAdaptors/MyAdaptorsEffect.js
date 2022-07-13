import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import config from '../../environments/index';

export default class MyAdaptorsEffect {
  static async requestGetAdaptors(headers) {
    const response = await HttpUtility.get(
      `${config.BACKEND_URL}/adaptor`,
      headers,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return response.data;
  }
}
