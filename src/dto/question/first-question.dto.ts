import { USER, YN } from '@/common/interfaces';
import { BaseDto } from '@/core';

export class FirstQuestionDto extends BaseDto<FirstQuestionDto> {
  userType: USER;
  order = 1;
  inUser: YN;
}
