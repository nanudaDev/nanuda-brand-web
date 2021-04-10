import { BaseDto } from '@/core';

export class ConsultRequestDto extends BaseDto<ConsultRequestDto> {
  name: string;
  phone: string;
  smsAuthCode: string;
  proformaConsultResultId: number;
}
