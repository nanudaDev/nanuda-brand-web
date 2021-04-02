import { BaseDto } from '@/core';

export default class GetReservTimesResponseDto extends BaseDto<
  GetReservTimesResponseDto
> {
  value: string;
  available: boolean;
}
