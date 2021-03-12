import { BaseService } from '@/core';
import {
  NextQuestionDto,
  QuestionResponseDto,
  FirstQuestionDto,
  ResultResponseDto,
} from '@/dto/question';
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
    return super.get<ResultResponseDto>(
      'aggregate-result-response',
      resultRequestDto,
    );
  }
}

export default new QuestionService();
