import { FNB_OWNER } from '@/common';
import { BaseDto } from '@/core';

export class ProformaConsultResultV3CreateDto extends BaseDto<
  ProformaConsultResultV3CreateDto
> {
  ipAddress: string;
  fnbOwnerStatus: FNB_OWNER | string;
  id?: number;
}
