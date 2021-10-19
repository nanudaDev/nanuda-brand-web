import { YN } from '@/common';
import { BaseDto } from '@/core';
import { ACCOUNT_STATUS } from '@/shared';
import { PickCookUserHistoryDto } from '.';
import { PlatformAdmin } from '../admin';

export class PickcookUserDto extends BaseDto<PickcookUserDto> {
  id: number;
  phone: string;
  email: string;
  name: string;
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
  adminId: number;
  admin?: PlatformAdmin;
  sentDormantWarningYn: YN;
  sentDormantWarningDate: Date;
  pickcookUserHistories?: PickCookUserHistoryDto[];
}
