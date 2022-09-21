import { BaseModel } from 'sjs-base-model';

export default class RulesModel extends BaseModel {
  id = '';

  adaptorId = '';

  ruleName = '';

  exchangeName = '';

  queueName = '';

  sqlQuery = '';

  createdAt = '';

  constructor(data) {
    super();
    this.update(data);
  }
}