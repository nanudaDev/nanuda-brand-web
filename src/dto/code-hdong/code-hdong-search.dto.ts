import { YN } from '@/common';
import { BaseDto } from '@/core';

export class CodeHdongSearchDto extends BaseDto<CodeHdongSearchDto> {
  sidoName: string;
  hdongCode: string;
  guName: string;
  hdongName: string;
}
