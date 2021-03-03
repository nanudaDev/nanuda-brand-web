import { BaseDto } from '@/core';

export class FaqDto extends BaseDto<FaqDto> {
  faq: string;
  answer: string;
}
