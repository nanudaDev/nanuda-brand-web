import { USER } from '@/common';
import { BaseDto } from '@/core';

export class NextQuestionDto extends BaseDto<NextQuestionDto> {
  questionId: number;
  givenId: number[];
  ipAddress: string;
  uniqueSessionId: string;
  userType: USER;
}
