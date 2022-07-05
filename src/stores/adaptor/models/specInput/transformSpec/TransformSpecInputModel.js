import { BaseModel } from 'sjs-base-model';

export default class TransformSpecInputModel extends BaseModel {
  type = String;

  joltSpec = String;

  script = String;

  template = String;

  jsonPathSpec = [];

  constructor(data) {
    super();

    this.update(data);
  }
}
