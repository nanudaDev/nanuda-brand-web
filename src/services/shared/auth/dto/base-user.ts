import { BaseDto } from '@/core';

export class BaseUser extends BaseDto<BaseUser> {
  id: number;
  name: string;
  username: string;
  phone?: string;
  email?: string;
  password: string;
  passwordConfirm?: string;
}
