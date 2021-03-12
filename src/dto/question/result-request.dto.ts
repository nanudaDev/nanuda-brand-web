import {
  AGE_GROUP,
  DELIVERY_OR_RESTAURANT,
  FNB_OWNER,
  KB_FOOD_CATEGORY,
  OPERATION_TIME,
  REVENUE_RANGE,
  YN,
} from '@/common';
import { BaseDto } from '@/core';

export class ResultRequestDto extends BaseDto<ResultRequestDto> {
  operationTimes: OPERATION_TIME[];
  deliveryRatioCode: DELIVERY_OR_RESTAURANT;
  responseCode: any;
  ageGroupCode: AGE_GROUP;
  revenueRangeCode: REVENUE_RANGE;
  isReadyCode: any;
  fnbOwnerStatus: FNB_OWNER;
  hdongCode: string;
  kbFoodCategory: KB_FOOD_CATEGORY;
}
