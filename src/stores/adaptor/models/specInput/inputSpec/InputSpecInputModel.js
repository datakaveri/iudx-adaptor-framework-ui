import { BaseModel } from 'sjs-base-model';
import MinioConfigModel from './MinioConfigModel';

export default class InputSpecInputModel extends BaseModel {
  boundedJob = Boolean;

  headers = {
    'content-type': '',
  };

  minioConfig = MinioConfigModel;

  pollingInterval = Number;

  requestType = '';

  type = '';

  url = '';

  constructor(data) {
    super();

    this.update(data);
  }
}
