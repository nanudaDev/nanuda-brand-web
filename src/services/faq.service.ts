import { ORDER_BY_VALUE, Pagination } from '@/common';
import { BaseService } from '@/core';
import { FaqDto } from '../dto/faq';

export class FaqService extends BaseService {
  findAll(pagination?: Pagination) {
    return super.paginate<FaqDto>(
      'faq',
      { orderByNo: ORDER_BY_VALUE.DESC },
      pagination,
    );
  }
}

export default new FaqService();
