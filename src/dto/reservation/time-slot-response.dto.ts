import { BaseDto } from '@/core';

export class TimeSlotResponseDto extends BaseDto<TimeSlotResponseDto> {
  available: boolean;
  value: string;
}
