import { BaseModel } from 'sjs-base-model';
// import DataModel from './DataModel';

export default class ResultModel extends BaseModel {
  outerkey = '';

  data = [];

  constructor(data) {
    super();
    this.update(data);
  }
}
