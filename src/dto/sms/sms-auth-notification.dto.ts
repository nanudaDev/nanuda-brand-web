import { BaseDto } from '@/core';

export class SmsAuthNotificationDto extends BaseDto<SmsAuthNotificationDto> {
  phone: string;
  smsAuthCode?: number;
}
