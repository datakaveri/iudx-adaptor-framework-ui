import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import HttpUtility from '../../utilities/HttpUtility';
import InputSpecResponseModel from './models/inputSpecResponse/InputSpecResponseModel';

export default class AdaptorEffect {
  static async requestInputSpec(data) {
    const response = await HttpUtility.post(
      'http://localhost:4010/onboard/run-input-spec',
      data,
    );

    if (response instanceof HttpErrorResponseModel) {
      return response;
    }

    return new InputSpecResponseModel(response.data);

  }
  
  static async requestParseSpec(data){
    const response=await await HttpUtility.post(
      'http://localhost:4010/onboard/run-parse-spec',
      data,
    );
    if(response instanceof HttpErrorResponseModel){
      return response
    }
    return new InputSpecResponseModel(response.data);

  }
}
