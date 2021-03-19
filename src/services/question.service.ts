import { BaseService } from '@/core';
import {
  NextQuestionDto,
  QuestionResponseDto,
  FirstQuestionDto,
  ResultResponseDto,
  ConsultRequestDto,
} from '@/dto/question';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { ResultRequestDto } from '@/dto/question/result-request.dto';

export class QuestionService extends BaseService {
  constructor() {
    super();
  }
  getFirstQuestion(firstQuestionDto: FirstQuestionDto) {
    return super.get<QuestionResponseDto>('question', firstQuestionDto);
  }
  getNextQuestion(nextQuestionDto: NextQuestionDto) {
    return super.post<QuestionResponseDto>('question/next', nextQuestionDto);
  }
  getResult(resultRequestDto: ResultRequestDto) {
    return super.post<AggregateResultResponse>(
      'aggregate-result-response',
      resultRequestDto,
    );
  }
  postConsult(consultRequestDto: ConsultRequestDto) {
    return super.post<any>('consult-result', consultRequestDto);
  }
}

export default new QuestionService();
