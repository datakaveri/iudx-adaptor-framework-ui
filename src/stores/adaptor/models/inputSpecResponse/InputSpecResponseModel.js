import { BaseModel } from 'sjs-base-model';

// const json = {
//   success: true,
//   message: 'Executed successfully',
//   result: {
//     outerkey: 'outerkeyval',
//     data: [
//       {
//         time: '2022-05-20T09:09:56Z',
//         k1: 185,
//         deviceId: 'abc-123',
//       },
//     ],
//   },
// };

export default class InpuSpecResponseModel extends BaseModel {
  success = Boolean;

  message = '';

  result = [];

  constructor(data) {
    super();

    this.update(data);
  }
}
