import { BaseService } from '@/core';
import { CodeHdongDto, CodeHdongSearchDto } from '@/dto/code-hdong';

export class CodeHdongService extends BaseService {
  constructor() {
    super();
  }

  getSido() {
    return super.get<CodeHdongDto[]>('code-hdong/sido');
  }
  getGuName(codeHdongSearchDto: CodeHdongSearchDto) {
    return super.get<CodeHdongDto[]>('code-hdong/gu-name', codeHdongSearchDto);
  }
  getHdongName(codeHdongSearchDto: CodeHdongSearchDto) {
    return super.get<CodeHdongDto[]>(
      'code-hdong/hdong-name',
      codeHdongSearchDto,
    );
  }
}

export default new CodeHdongService();
