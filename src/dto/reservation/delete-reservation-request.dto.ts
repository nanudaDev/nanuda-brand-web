import { BaseDto } from '@/core';

export default class DeleteReservationRequestDto extends BaseDto<
  DeleteReservationRequestDto
> {
  id: number;
  reservationCode: string;
  phone: string;
  deleteReason: string;
  deleteReasonEtc: string;
}
