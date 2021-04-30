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
  ipAddress: string;
  uniqueSessionId: string;
  fnbOwnerStatus: FNB_OWNER;
  hdongCode: string;
  questionGivenArray: number[];
}
