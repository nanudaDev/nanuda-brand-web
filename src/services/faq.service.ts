import { ORDER_BY_VALUE, Pagination } from '@/common';
import { BaseService } from '@/core';
import { FaqRequestDto, FaqResponseDto } from '../dto/faq';

export class FaqService extends BaseService {
  findAll(faqRequestDto: FaqRequestDto) {
    return super.get<FaqResponseDto[]>('faq-answer', faqRequestDto);
  }
}

export default new FaqService();
