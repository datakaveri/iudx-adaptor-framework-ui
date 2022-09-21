import { BaseModel } from 'sjs-base-model';

export default class MinioConfigModel extends BaseModel {
  type = '';

  messageContainer = '';

  timestampPath = '';

  staticKey = '';

  constructor(data) {
    super();

    this.update(data);
  }
}
