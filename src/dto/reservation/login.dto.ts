import { BaseDto } from '@/core';

export default class LoginDto extends BaseDto<LoginDto> {
  reservationCode: string;
  phone: string;
}
