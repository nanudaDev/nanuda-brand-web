import { BaseDto } from '@/core';

export default class ConsultResultResponseDto extends BaseDto<
  ConsultResultResponseDto
> {
  name: string;
  phone: string;
  reservationCode: string;
}
