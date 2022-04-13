import { BaseService } from '@/core';
import { PopupDto } from '@/dto/popup';

export class PopupService extends BaseService {
  constructor() {
    super();
  }

  findAll() {
    return super.get<PopupDto[]>('popup');
  }
}
export default new PopupService();
