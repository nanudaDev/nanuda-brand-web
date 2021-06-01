import { BaseService } from '@/core';
import { ConsultRequestDto } from '@/dto';

export class ConsultResultV3Service extends BaseService {
  /**
   *
   * @param consultRequestDto
   * @returns
   */
  postConsult(consultRequestDto: ConsultRequestDto) {
    return super.post<ConsultRequestDto>(
      'v3/consult-result',
      consultRequestDto,
    );
  }
}

export default new ConsultResultV3Service();
