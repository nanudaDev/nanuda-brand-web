import { BaseDto } from '@/core';

export class FaqResponseDto extends BaseDto<FaqResponseDto> {
  id: number;
  faq: string;
  order: number;
}
