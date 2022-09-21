import { BaseModel } from 'sjs-base-model';
import ParseSpec from './ParseSpec';

export default class RulesInputSpecInput extends BaseModel {
  type = '';

  uri = '';

  queueName = '';

  sourceId = '';

  parseSpec = ParseSpec;

  constructor(data) {
    super();

    this.update(data);
  }
}
