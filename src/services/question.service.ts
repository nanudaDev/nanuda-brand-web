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
  getSido() {
    return super.get('code-hdong/sido');
  }
}

export default new QuestionService();
