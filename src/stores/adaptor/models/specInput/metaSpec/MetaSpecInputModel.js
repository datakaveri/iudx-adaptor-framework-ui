import { BaseModel } from 'sjs-base-model';

export default class MetaSpecInputModel extends BaseModel {
  name = '';

  schedulePattern = '';

  constructor(data) {
    super();

    this.update(data);
  }
}
