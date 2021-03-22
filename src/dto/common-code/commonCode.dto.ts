import { FNB_OWNER } from '@/common';
import { BaseDto } from '@/core';

export class CommonCode extends BaseDto<CommonCode> {
  id: number;
  key: FNB_OWNER;
  value: FNB_OWNER;
  category: string;
  comment: string;
  displayName: string;
}
