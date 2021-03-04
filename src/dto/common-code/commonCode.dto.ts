import { USER } from '@/common';
import { BaseDto } from '@/core';

export class CommonCode extends BaseDto<CommonCode> {
  id: number;
  key: USER;
  value: USER;
  category: string;
  comment: string;
  displayName: string;
}
