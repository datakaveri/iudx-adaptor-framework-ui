import { BaseModel } from 'sjs-base-model';
import DataModel from './DataModel';

export default class ResultModel extends BaseModel {
  outerKey = '';

  data = DataModel;

  constructor(data) {
    super();
    this.update(data);
  }
}
