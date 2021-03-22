import { YN } from '@/common';
import { BaseDto } from '@/core';

export class CodeHdongDto extends BaseDto<CodeHdongDto> {
  id: number;
  sidoName: string;
  hdongCode: string;
  guName: string;
  hdongName: string;
  usable: YN;
}
