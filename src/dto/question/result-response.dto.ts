import {
  AGE_GROUP,
  DELIVERY_OR_RESTAURANT,
  FNB_OWNER,
  REVENUE_RANGE,
  YN,
} from '@/common';
import { BaseDto } from '@/core';
import { CommonCode } from '../common-code/commonCode.dto';
import { Given } from './given.dto';

export class ResultResponseDto extends BaseDto<ResultResponseDto> {
  id: number;
  deliveryRatioGrade: number;
  deliveryRatioCode: DELIVERY_OR_RESTAURANT;
  responseCode: any;
  ageGroupGrade: number;
  ageGroupCode: AGE_GROUP;
  revenueRangeCode: REVENUE_RANGE;
  revenueRangeGrade: number;
  isReadyCode: any;
  isReadyGrade: number;
  response: string;
  fnbOwnerStatus: FNB_OWNER;
}
