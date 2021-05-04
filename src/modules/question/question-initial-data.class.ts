import { ADDRESS_LEVEL } from '@/common';
import {
  CodeHdongSearchDto,
  FirstQuestionDto,
  Given,
  NextQuestionDto,
  ResultRequestDto,
} from '@/dto';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { FNB_OWNER } from '@/shared';

export default class QuestionInitialData {
  [x: string]: any;
  // private userType: USER = null;

  private firstQuestionDto = new FirstQuestionDto();
  private nextQuestionDto = new NextQuestionDto();
  private codeHdongSearchDto = new CodeHdongSearchDto();
  private resultRequestDto = new ResultRequestDto();

  private isStart = true;
  private isLastQuestion = false;
  private smallSizeQuestionId = [1, 4, 5, 12];
  private bgLightQuestionId = [2, 3, 4, 5, 6, 11, 12, 13, 14];
  private questionTotalCount: any = 9;
  private questionOrder: any = 0;
  private prevOrder: any = 0;
  private question = '나는 현재';
  private FNB_OWNER = FNB_OWNER;
  private aggregateResultResponseDto: AggregateResultResponse = null;
  private isAvailableLocation = false;
  private availableLocation = '';
  private firstGivens = [
    {
      id: 1,
      userType: FNB_OWNER.CUR_FNB_OWNER,
      given: '음식점 사장님입니다',
    },
    {
      id: 2,
      userType: FNB_OWNER.NEW_FNB_OWNER,
      given: '창업을 생각하고 있습니다',
    },
  ];
  private givens: Given[] = [];
  private addressGivens: any[] = [];
  private showingLevel = ADDRESS_LEVEL.sidoName;
  private selectedRoadAddress = '';
  private isMultipleAnswer = false;
  private selectedAnswers: Given[] = [];
  private isLoading = false;
  private isLoadingResult = false;
  private previousQuestionDtoArr: NextQuestionDto[] = [];
  private questionGivenArray: any[] = [];
}
