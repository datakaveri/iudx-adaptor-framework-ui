import { BaseModel } from 'sjs-base-model';

export default class DeduplicationSpecInputModel extends BaseModel {
  type = String;

  constructor(data) {
    super();

    this.update(data);
  }
}
