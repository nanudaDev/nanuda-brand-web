import { ORDER_BY_VALUE } from '@/common';
import { BaseDto } from '@/core';

export class FaqRequestDto extends BaseDto<FaqRequestDto> {
  orderByOrder?: ORDER_BY_VALUE;
  faqParentId: number;
}
