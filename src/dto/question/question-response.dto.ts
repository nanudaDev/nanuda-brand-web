import { USER, YN } from '@/common';
import { BaseDto } from '@/core';
import { CommonCode } from '../common-code/commonCode.dto';
import { Given } from './given.dto';

export class QuestionResponseDto extends BaseDto<QuestionResponseDto> {
  id: number;
  question: string;
  userType: USER;
  order: number;
  isLastQuestion: YN;
  inUser: YN;
  commonCode: CommonCode;
  givens: Given[];
}
