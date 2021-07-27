import { BaseService } from '@/core';
import { ConsultRequestDto, ProformaConsultResultV3CreateDto } from '@/dto';

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

  /**
   *
   * @param proformaConsultResultV3CreateDto
   * @returns
   */
  getProformaId(
    proformaConsultResultV3CreateDto: ProformaConsultResultV3CreateDto,
  ) {
    return super.post<ProformaConsultResultV3CreateDto>(
      'v3/proforma-consult-response',
      proformaConsultResultV3CreateDto,
    );
  }

  /**
   *
   * @returns
   */
  getCounsultCount() {
    return super.get('v3/consult-result/get-count');
  }
}

export default new ConsultResultV3Service();
