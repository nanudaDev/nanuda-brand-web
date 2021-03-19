import { BaseService } from '@/core';
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

  getSMSCode(phoneNum: string) {
    return this.platfromAxios.post('register-sms-code', { phone: phoneNum });
  }
  checkSMSCode(phoneNum: string, authCode: string): Promise<boolean> {
    return this.platfromAxios.post('check-sms-code', {
      phone: phoneNum,
      authCode: authCode,
    });
  }
}
export default new authService();
