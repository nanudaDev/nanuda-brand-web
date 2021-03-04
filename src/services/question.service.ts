import { BaseService } from '@/core';
import {
  NextQuestionDto,
  QuestionResponseDto,
  FirstQuestionDto,
} from '@/dto/question';

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
}

export default new QuestionService();
