import { DeliveryRatioData, FNB_OWNER } from '@/common';
import { BaseDto } from '@/core';
import { Given } from './given.dto';

export class ResultResponseDto extends BaseDto<ResultResponseDto> {
  cScoreAttributeId: number;
  deliveryRatioData: DeliveryRatioData;
  fnbOwnerStatus: FNB_OWNER;
  hdong: object;
  hdongCode: string;
  id: number;
  ipAddress: string;
  questionGivenArray: Given[];
  rankDataWCScore: any[];
  totalQuestionInitialCostScore: number;
  totalQuestionManagingScore: number;
  totalQuestionMenuScore: number;
  uniqueSessionId: string;
}
