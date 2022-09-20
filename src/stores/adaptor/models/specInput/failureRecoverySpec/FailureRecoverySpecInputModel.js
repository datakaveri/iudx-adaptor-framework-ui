import { BaseModel } from 'sjs-base-model';

export default class FailureRecoverySpecInputModel extends BaseModel {
  type = '';

  'initial-backoff' = Number;

  'max-backoff' = Number;

  'backoff-multiplier' = Number;

  'reset-backoff-threshold' = Number;

  'jitter-factor' = Number;

  attempts = Number;

  delay = Number;

  constructor(data) {
    super();

    this.update(data);
  }
}
