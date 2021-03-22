import { FNB_OWNER } from '@/common';
import { BaseDto } from '@/core';

export class ProformaResponseDto extends BaseDto<ProformaResponseDto> {
  operationTimesResult: Array<any>;
  fnbOwnerStatus: FNB_OWNER;
  ageGroupGrade: number;
  ageGroupCode: string;
  revenueRangeCode: string;
  revenueRangeGrade: string | number;
  revenueGradeSentence: string;
  curFnbOwnerLineChartData: any;
  graphData: any;
}
