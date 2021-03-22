import { FNB_OWNER, YN } from '@/common/interfaces';
import { BaseDto } from '@/core';

export class FirstQuestionDto extends BaseDto<FirstQuestionDto> {
  userType: FNB_OWNER;
  order = 1;
  inUser: YN;
}
