import { BaseDto } from '@/core';

export class PostReservationRequestDto extends BaseDto<
  PostReservationRequestDto
> {
  reservationDate: Date;
  reservationTime: string;
  reservationCode: string;
}
