import { FNB_OWNER } from '@/common';
import { BaseDto } from '@/core';

export class NextQuestionDto extends BaseDto<NextQuestionDto> {
  questionId: number;
  givenId: number[];
  ipAddress: string;
  uniqueSessionId: string;
  userType: FNB_OWNER;
}
