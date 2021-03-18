import { BaseDto } from '@/core';
import { ResultResponseDto } from './result-response.dto';

export class AggregateResultResponse extends BaseDto<AggregateResultResponse> {
  [x: string]: any;
  proformaId: number;
  responses: ResultResponseDto[];
}
