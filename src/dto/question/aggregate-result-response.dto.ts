import { BaseDto } from '@/core';
import { ResultResponseDto } from './result-response.dto';

export class AggregateResultResponse extends BaseDto<AggregateResultResponse> {
  proformaId: number;
  responses: ResultResponseDto[];
}
