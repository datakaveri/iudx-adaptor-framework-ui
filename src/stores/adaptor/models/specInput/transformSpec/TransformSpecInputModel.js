import { BaseModel } from 'sjs-base-model';

export default class TransformSpecInputModel extends BaseModel {
  type = '';

  joltSpec = '';

  script = '';

  template = '';

  jsonPathSpec = [];

  constructor(data) {
    super();

    this.update(data);
  }
}
