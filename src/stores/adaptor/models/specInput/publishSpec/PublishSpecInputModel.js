import { BaseModel } from 'sjs-base-model';

export default class PublishSpecInputModel extends BaseModel {
  type = String;

  uri = String;

  sinkName = String;

  tagName = String;

  constructor(data) {
    super();

    this.update(data);
  }
}
