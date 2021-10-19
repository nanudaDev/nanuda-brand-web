import { YN } from '@/common';
import { BaseDto } from '@/core';
import { BaseUser } from '@/services/shared/auth/dto';
import { PickcookUserDto } from '.';

export class PickcookUserCreatDto extends BaseDto<PickcookUserCreatDto>
  implements Partial<PickcookUserDto> {
  name: string;
  phone: string;
  email: string;
  username: string;
  password: string;
  passwordCheck: string;
  serviceAgreeYn: YN;
  privacyAgreeYn: YN;
  marketingAgreeYn: YN;
}
