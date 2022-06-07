import { BaseModel } from 'sjs-base-model';

export default class DataModel extends BaseModel {
  timestamp = '';

  val = Number;

  id = '';

  constructor(data) {
    super();
    this.update(data);
  }
}
