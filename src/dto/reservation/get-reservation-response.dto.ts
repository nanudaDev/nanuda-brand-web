import { YN } from '@/common';
import { BaseDto } from '@/core';
import { ResultResponseDto } from '../question';

export default class GetReservationResponseDto extends BaseDto<
  GetReservationResponseDto
> {
  id: number;
  name: string;
  phone: string;
  consultId: number;
  reservationCode: string;
  reservationDate: string;
  reservationTime: string;
  isCancelYn: YN;
  consultResult: ResultResponseDto;
}
