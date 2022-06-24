import { BaseModel } from 'sjs-base-model';

export default class FailureRecoverySpecInputModel extends BaseModel {
  type = '';

  initialBackoff = Number;

  maxBackoff = Number;

  backoffMultiplier = Number;

  resetBackoffThreshold = Number;

  jitterFactor = Number;

  attempts = Number;

  delay = Number;

  constructor(data) {
    super();

    this.update(data);
  }
}
