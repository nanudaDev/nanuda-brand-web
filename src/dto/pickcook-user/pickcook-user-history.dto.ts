import { YN } from '@/common';
import { BaseDto } from '@/core';
import { ACCOUNT_STATUS } from '@/shared';
import { PickcookUserDto } from './pickcook-user.dto';

export class PickCookUserHistoryDto extends BaseDto<PickCookUserHistoryDto> {
  pickcookUserId?: number;
  email: string;
  username: string;
  serviceAgreeYn: YN;
  privacyAgreeYn: YN;
  serviceAgreeDate: Date;
  serviceDisagreeDate: Date;
  privacyAgreeDate: Date;
  privacyDisagreeDate: Date;
  marketingAgreeYn: YN;
  marketingAgreeDate: Date;
  marketingDisagreeDate: Date;
  isPremiumUser: YN;
  isPremiumDate: YN;
  isNotPremiumDate: YN;
  isNanudaUser: YN;
  accountStatus: ACCOUNT_STATUS;
  passwordUpdateDate: Date;
  name: string;
  phone: string;
  lastLoginAt?: Date;
  sentDormantWarningYn: YN;
  sentDormantWarningDate: Date;
  adminId: number;
  pickcookUser?: PickcookUserDto;
}
