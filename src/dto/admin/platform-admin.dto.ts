import { BaseUser } from '@/services/shared/auth/dto';
import { ADMIN_USER } from '@/shared';

export class PlatformAdmin extends BaseUser {
  authCode: ADMIN_USER;
  lastLoginAt?: Date;
}
