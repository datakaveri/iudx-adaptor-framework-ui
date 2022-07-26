import { BaseModel } from 'sjs-base-model';
import MinioConfigModel from './MinioConfigModel';

export default class InputSpecInputModel extends BaseModel {
  boundedJob = Boolean;

  headers = '';

  minioConfig = MinioConfigModel;

  pollingInterval = Number;

  requestType = '';

  postBody = '';

  requestGenerationScripts = '';

  type = '';

  url = '';

  requestTimeout = Number;

  constructor(data) {
    super();

    this.update(data);
  }
}
