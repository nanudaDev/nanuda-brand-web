import { BaseService } from '@/core';
import { SmsAuthNotificationDto } from '@/dto';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Axios from 'axios-observable';

export class authService extends BaseService {
  platfromAxios: AxiosInstance;
  constructor() {
    super();
    this.platfromAxios = axios.create({
      baseURL: 'https://platform-api.nanudakitchen.com/',
    });
  }

  getSMSCode(smsAuthNotificationDto: SmsAuthNotificationDto) {
    return super.post(
      'sms-notification/register-sms-code',
      smsAuthNotificationDto,
    );
  }
  checkSMSCode(smsAuthNotificationDto: SmsAuthNotificationDto) {
    return super.post('check-sms-code', smsAuthNotificationDto);
  }
}
export default new authService();
