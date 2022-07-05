import { BaseModel } from 'sjs-base-model';

export default class DataModel extends BaseModel {
  time = '';

  k1 = Number;

  deviceId = '';

  constructor(data) {
    super();
    this.update(data);
  }
}
