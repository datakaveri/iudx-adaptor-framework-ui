import { BaseModel } from 'sjs-base-model';

export default class ResultModel extends BaseModel {
  outerkey = '';

  data = [];

  constructor(data) {
    super();
    this.update(data);
  }
}
