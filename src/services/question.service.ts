import { BaseService } from '@/core';
import {
  NextQuestionDto,
  QuestionResponseDto,
  FirstQuestionDto,
  ResultResponseDto,
  ConsultRequestDto,
} from '@/dto/question';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { ProformaResponseDto } from '@/dto/question/proforma-response.dto';
import { ResultRequestDto } from '@/dto/question/result-request.dto';

export class QuestionService extends BaseService {
  constructor() {
    super();
  }
  getKBCategoryQuestion(firstQuestionDto: FirstQuestionDto) {
    return super.get<QuestionResponseDto>('question', firstQuestionDto);
  }
  getFirstQuestion(firstQuestionDto: FirstQuestionDto) {
    return super.get<QuestionResponseDto>('v2/question', firstQuestionDto);
  }
  getNextQuestion(nextQuestionDto: NextQuestionDto) {
    return super.post<QuestionResponseDto>('v2/question/next', nextQuestionDto);
  }
  getResult(resultRequestDto: ResultRequestDto) {
    return super.post<ResultResponseDto>(
      `v2/proforma-consult-response-w-other`,
      resultRequestDto,
    );
  }
  postConsult(consultRequestDto: ConsultRequestDto) {
    return super.post<any>('v2/consult-result', consultRequestDto);
  }
}

export default new QuestionService();
