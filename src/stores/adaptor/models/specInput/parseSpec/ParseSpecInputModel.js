import { BaseModel } from 'sjs-base-model';

export default class ParseSpecInputModel extends BaseModel {
  type = String;

  messageContainer = String;

  containerPath = String;

  timestampPath = String;

  inputTimeFormat = String;

  outputTimeFormat = String;

  keyPath = String;

  trickle = [];

  constructor(data) {
    super();

    this.update(data);
  }
}
