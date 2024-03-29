import { BaseModel } from 'sjs-base-model';

export default class AdaptorResponseModel extends BaseModel {
  id = '';

  name = '';

  adaptorType = '';

  jarId = '';

  jobId = '';

  lastSeen = '';

  status = '';

  constructor(data) {
    super();
    this.update(data);
  }
}
