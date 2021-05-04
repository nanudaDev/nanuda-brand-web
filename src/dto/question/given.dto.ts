import { BaseDto } from '@/core';

export class Given extends BaseDto<Given> {
  id: number;
  given: string;
  value: string;
  questionId: number;
  givenDetails?: any;
}
