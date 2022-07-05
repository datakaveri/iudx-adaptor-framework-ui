import { BaseModel } from 'sjs-base-model';

export default class MinioConfigModel extends BaseModel {
  accessKey = '';

  bucket = '';

  secretKey = '';

  stateName = '';

  url = '';

  constructor(data) {
    super();

    this.update(data);
  }
}
