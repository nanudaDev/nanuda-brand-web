import { YN } from '@/common';
import { BaseDto } from '@/core';
import { PickcookUserDto } from '.';

export class PickcookUserUpdateDto extends BaseDto<PickcookUserUpdateDto>
  implements Partial<PickcookUserDto> {
  name: string;
  phone: string;
  email: string;
  username: string;
  serviceAgreeYn: YN;
  privacyAgreeYn: YN;
  marketingAgreeYn: YN;
}
