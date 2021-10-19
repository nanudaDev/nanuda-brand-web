import { BaseDto } from '@/core';

export class SigninDto extends BaseDto<SigninDto> {
  loginCredential: string;
  password: string;
  rememberMe?: boolean;
  isUsername?: boolean;
}
