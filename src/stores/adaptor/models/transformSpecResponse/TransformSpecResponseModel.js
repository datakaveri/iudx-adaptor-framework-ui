import { BaseModel } from 'sjs-base-model';

// const json = {
//   success: true,
//   message: 'Executed successfully',
//   result: [
//       {
//         timestamp: '2022-05-20T09:09:56Z',
//         val: 185,
//         id: 'abc-123',
//       },
//     ],
// };

export default class TransformSpecResponseModel extends BaseModel {
  success = Boolean;

  message = '';

  result = [];

  constructor(data) {
    super();

    this.update(data);
  }
}
