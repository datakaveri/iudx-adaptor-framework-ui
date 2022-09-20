import { BaseModel } from 'sjs-base-model';

export default class RulesPublishSpecInput extends BaseModel {
  type = String;

  uri = String;

  constructor(data) {
    super();

    this.update(data);
  }
}
