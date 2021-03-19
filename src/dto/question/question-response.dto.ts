import { FNB_OWNER, YN } from '@/common';
import { BaseDto } from '@/core';
import { CommonCode } from '../common-code/commonCode.dto';
import { Given } from './given.dto';

export class QuestionResponseDto extends BaseDto<QuestionResponseDto> {
  id: number;
  question: string;
  userType: FNB_OWNER;
  order: number;
  isLastQuestion: YN;
  multipleAnswerYn: YN;
  inUser: YN;
  commonCode: CommonCode;
  givens: Given[];
}
