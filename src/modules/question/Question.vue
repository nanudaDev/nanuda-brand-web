<template>
  <div>
    <article
      class="main-article bg-primary"
      id="question-start"
      v-if="questionIndex < 0"
    >
      <template v-if="!isUtmSource">
        <header class="article-header">
          <span data-aos="fade-down" data-aos-duration="1500"
            ><router-link to="/"
              ><img
                src="@/assets/images/logo_w.svg"
                alt="픽쿡"
                class="logo-w"/></router-link
          ></span>
          <h2 data-aos="fade-down" data-aos-duration="1500">
            단 1분만에 빅데이터로<br />
            창업아이템을 추천할게요.
          </h2>
          <div
            class="btn-box text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <b-btn
              variant="light"
              pill
              size="xl"
              class="shadow"
              @click="startQuestion()"
            >
              시작하기
            </b-btn>
          </div>
        </header>
      </template>
      <template v-else>
        <header class="article-header">
          <span data-aos="fade-down" data-aos-duration="1500"
            ><router-link to="/"
              ><img
                src="@/assets/images/logo_w.svg"
                alt="픽쿡"
                class="logo-w"/></router-link
          ></span>
          <h2 data-aos="fade-down" data-aos-duration="1500">메뉴를 찾으세요</h2>
          <p data-aos="fade-down" data-aos-duration="1500">
            뭘로 창업하지? <br />
            매출은 어떻게 더 올리지?<br />
            그 메뉴를 픽쿡에서 찾으세요<br />
          </p>
          <div
            class="btn-box text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <b-btn
              variant="light"
              pill
              size="xl"
              class="shadow"
              @click="startQuestion()"
            >
              원하는 지역에서 내 메뉴 찾기
            </b-btn>
          </div>
        </header>
      </template>
    </article>
    <article
      class="main-article"
      :id="nextQuestionDto.questionId"
      :class="
        bgLightQuestionId.includes(nextQuestionDto.questionId)
          ? 'bg-light'
          : 'bg-primary'
      "
      v-else
    >
      <header class="article-header">
        <h1>
          <router-link to="/">
            <img
              src="@/assets/images/logo.svg"
              alt="픽쿡"
              v-if="bgLightQuestionId.includes(nextQuestionDto.questionId)"
            />
            <img src="@/assets/images/logo_w.svg" alt="픽쿡" v-else />
          </router-link>
        </h1>
        <div class="progress-bar-rail">
          <span
            class="progress-bar"
            :style="{
              width: (questionOrder / (questionTotalCount + 1)) * 100 + '%',
            }"
          ></span>
        </div>
      </header>
      <div class="article-content">
        <section class="article-section">
          <component :is="questionOrderArr[questionIndex]" @next="onNext" />
        </section>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Watch } from 'vue-property-decorator';
import { VueDaumPostcode } from 'vue-daum-postcode';
import questionService from '@/services/question.service';
import codeHdongService from '@/services/code-hdong.service';
import axios from 'axios';
import {
  FirstQuestionDto,
  Given,
  NextQuestionDto,
  ResultRequestDto,
  ResultResponseDto,
} from '@/dto/question';
import { use } from 'node_modules/vue/types/umd';
import { CodeHdongDto, CodeHdongSearchDto } from '@/dto/code-hdong';
import { COMMON_CODE_CATEGORY } from '@/shared';
import { ADDRESS_LEVEL, KB_FOOD_CATEGORY, YN } from '@/common';
import FnbOwnerStatus from './components/questions/FnbOwnerStatus.vue';
import HdongCode from './components/questions/HdongCode.vue';
@Component({
  name: 'Question',
  components: { VueDaumPostcode, FnbOwnerStatus, HdongCode },
})
export default class Question extends BaseComponent {
  [x: string]: any;
  // private userType: USER = null;

  private firstQuestionDto = new FirstQuestionDto();
  private nextQuestionDto = new NextQuestionDto();
  private codeHdongSearchDto = new CodeHdongSearchDto();
  private resultRequestDto = new ResultRequestDto();

  private isLastQuestion = false;
  private smallSizeQuestionId = [1, 4, 5, 12];
  private bgLightQuestionId = [2, 3, 4, 5, 6, 11, 12, 13, 14];
  private questionTotalCount: any = 10;
  private questionOrder: any = 0;
  private prevOrder: any = 0;
  private question = '나는 현재';

  private resultResponseDto: ResultResponseDto = null;
  private isAvailableLocation = false;
  private availableLocation = '';

  private givens: Given[] = [];
  private KBCategoryGivens: Given[] = [];
  private addressGivens: any[] = [];
  private showingLevel = ADDRESS_LEVEL.sidoName;
  private selectedRoadAddress = '';
  private isMultipleAnswer = false;
  private selectedAnswers: Given[] = [];
  private isLoading = false;
  private isLoadingResult = false;
  private previousQuestionDtoArr: NextQuestionDto[] = [];
  private questionGivenArray: any[] = [];
  private loadingProgress = 0;

  private isUtmSource = false;

  private questionIndex = -1;
  private questionOrderArr = ['FnbOwnerStatus', 'HdongCode'];
  startQuestion() {
    this.$gtag.event('start_question_button', { description: '질문 시작' });
    this.questionIndex = 0;
  }

  getFirstQuestion(kbCategoryValue?: KB_FOOD_CATEGORY) {
    this.isLoading = true;

    if (kbCategoryValue) {
      this.resultRequestDto.selectedKbMediumCategory = kbCategoryValue;
    }
    questionService.getFirstQuestion(this.firstQuestionDto).subscribe(res => {
      if (res) {
        this.KBCategoryGivens = [];
        this.isLoading = false;
        this.givens = res.data.givens;
        this.question = res.data.question;
        this.nextQuestionDto.order = res.data.order;
        this.nextQuestionDto.questionId = res.data.id;
        this.nextQuestionDto.givenId = [];
        this.isMultipleAnswer =
          res.data.multipleAnswerYn === YN.YES ? true : false;
      }
    });
    // 이전 단계 저장 후 증가
    this.questionOrder += 1;
    this.prevOrder = this.questionOrder;
  }

  getKBCategoryQuestion() {
    this.isLoading = true;
    questionService
      .getKBCategoryQuestion(this.firstQuestionDto)
      .subscribe(res => {
        if (res) {
          this.isLoading = false;
          this.KBCategoryGivens = res.data.givens;
          this.question = res.data.question;
        }
      });
  }

  // 주소 선택화면일때 뒤로가기
  goToPreviousAddr() {
    if (this.showingLevel === ADDRESS_LEVEL.hdongName) {
      codeHdongService.getGuName(this.codeHdongSearchDto).subscribe(res => {
        this.addressGivens = res.data;
        this.showingLevel = ADDRESS_LEVEL.guName;
      });
    } else if (this.showingLevel === ADDRESS_LEVEL.guName) {
      codeHdongService.getSido().subscribe(res => {
        this.addressGivens = res.data;
        this.showingLevel = ADDRESS_LEVEL.sidoName;
      });
    } else {
      this.question = '나는 현재';
      this.selectedRoadAddress = '';
      this.firstQuestionDto.userType = null;
    }
    // 진행 단계 감소
    this.questionOrder -= 1;
    this.isLastQuestion = false;
  }

  getNextQuestion(given?: Given) {
    this.isLoading = true;
    //이전 질문들 저장
    this.previousQuestionDtoArr.push({ ...this.nextQuestionDto });
    this.nextQuestionDto.givenId = [];

    // 답변을 하나만 선택할때
    if (given) {
      this.nextQuestionDto.givenId.push(given.id);
    } else {
      //답변을 여러개 선택할때
      this.$set(this.nextQuestionDto, 'givenId', this.selectedAnswers);
      const selectedGivenId = this.selectedAnswers.map(e => e.id);
      this.nextQuestionDto.givenId = selectedGivenId;
    }
    //questionGivenArray에 지금까지의 질문과 답변 저장
    this.questionGivenArray.push({
      questionId: this.nextQuestionDto.questionId,
      givenId: this.nextQuestionDto.givenId,
    });
    this.resultRequestDto.questionGivenArray = this.questionGivenArray;

    //마지막 질문일때
    if (this.isLastQuestion) {
      this.loadingProgress = 0;
      this.isLoadingResult = true;
      const countStart = setInterval(() => {
        if (this.loadingProgress < 79) {
          this.loadingProgress += 5;
        }
      }, 20);

      const countUp = setInterval(() => {
        if (this.loadingProgress < 100) {
          this.loadingProgress++;
        }
      }, 650);

      // const countEnd = setInterval(() => {
      //   if (this.loadingProgress > 96 && this.loadingProgress < 100) {
      //     this.loadingProgress++;
      //   }
      // }, 400);
      //get result
      questionService.getResult(this.resultRequestDto).subscribe(res => {
        if (res) {
          this.$gtag.event(`proforma_result_seen_${res.data.id}`);
          this.loadingProgress = 0;
          this.isLoadingResult = false;
          this.isLoading = false;
          clearInterval(countStart);
          clearInterval(countUp);
          this.resultResponseDto = res.data;
        }
      });
    } else {
      questionService.getNextQuestion(this.nextQuestionDto).subscribe(res => {
        if (res.data.isLastQuestion === YN.YES) {
          this.isLastQuestion = true;
          this.$gtag.event(
            `question_${res.data.userType}_${res.data.id}_last_question`,
          );
        }
        if (res) {
          this.isLoading = false;
          this.nextQuestionDto.order = res.data.order;
          this.nextQuestionDto.questionId = res.data.id;
          this.$gtag.event(`question_${res.data.userType}_${res.data.id}`);
          this.question = res.data.question;
          this.questionOrder =
            this.nextQuestionDto.order + (this.prevOrder - 1);
          this.givens = res.data.givens;
          this.nextQuestionDto.givenId = [];
          this.isMultipleAnswer =
            res.data.multipleAnswerYn === YN.YES ? true : false;
          this.selectedAnswers = [];
        }
      });
    }
  }

  //level이 내려감에따라 showingLevel(보여줘야할 정보)이 변함
  getGuOrDong(given?: CodeHdongDto) {
    this.isLoading = true;
    if (given) {
      this.codeHdongSearchDto.sidoName = given.sidoName;
      this.codeHdongSearchDto.hdongCode = given.hdongCode;
      this.codeHdongSearchDto.hdongName = given.hdongName;
      this.codeHdongSearchDto.guName = given.guName;
    }
    if (this.showingLevel === ADDRESS_LEVEL.sidoName) {
      codeHdongService.getGuName(this.codeHdongSearchDto).subscribe(res => {
        this.isLoading = false;
        this.addressGivens = res.data;
        this.showingLevel = ADDRESS_LEVEL.guName;
        // 진행 단계 증가
        this.questionOrder += 1;
      });
    } else if (this.showingLevel === ADDRESS_LEVEL.guName) {
      codeHdongService.getHdongName(this.codeHdongSearchDto).subscribe(res => {
        this.isLoading = false;
        this.addressGivens = res.data;
        this.showingLevel = ADDRESS_LEVEL.hdongName;
        // 진행 단계 증가
        this.questionOrder += 1;
      });
    } else {
      if (given) {
        this.resultRequestDto.hdongCode = given.hdongCode;
      }
      this.getKBCategoryQuestion();
    }
    this.prevOrder = this.questionOrder;
  }

  onPostCodeComplete(event: any) {
    this.selectedRoadAddress = event.roadAddress;
    const geocoder = new window.kakao.maps.services.Geocoder();
    // 상권분석 가능한 지역 안내
    const availableLocationCodeArray = ['11', '41', '28', '26', '50'];
    const callback = (results: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        this.resultRequestDto.hdongCode = results[0].address.h_code;
        const hdongCodeSido = this.resultRequestDto.hdongCode.substring(0, 2);
        availableLocationCodeArray.includes(hdongCodeSido);
        if (!availableLocationCodeArray.includes(hdongCodeSido)) {
          this.isAvailableLocation = true;
        } else {
          this.isAvailableLocation = false;
        }
        // console.log(hdongCodeSido);
        this.$bvModal.hide('post-code');
      }
    };
    if (callback) {
      this.$gtag.event('kakao_address_complete', {
        description: '카카오 주소 입력 완료',
      });
    }
    geocoder.addressSearch(this.selectedRoadAddress, callback);
  }

  onMultipleAnswerClicked(given: Given) {
    if (this.selectedAnswers.includes(given)) {
      const theIndex = this.selectedAnswers.findIndex(e => e === given);
      this.selectedAnswers.splice(theIndex, 1);
    } else {
      this.selectedAnswers.push(given);
    }
  }

  resetData() {
    const ipInfo = new NextQuestionDto();
    ipInfo.ipAddress = this.nextQuestionDto.ipAddress;
    ipInfo.uniqueSessionId = this.nextQuestionDto.uniqueSessionId;
    this.nextQuestionDto = ipInfo;
    this.firstQuestionDto = new FirstQuestionDto();

    this.codeHdongSearchDto = new CodeHdongSearchDto();
    this.resultRequestDto = new ResultRequestDto();

    this.isLastQuestion = false;
    this.smallSizeQuestionId = [1, 4, 5, 12];
    this.bgLightQuestionId = [2, 3, 4, 5, 6, 11, 12, 13, 14];
    this.questionTotalCount = 9;
    this.questionOrder = 0;
    this.prevOrder = 0;
    this.question = '나는 현재';
    this.resultResponseDto = null;
    this.isAvailableLocation = false;
    this.availableLocation = '';
    this.givens = [];
    this.KBCategoryGivens = [];
    this.addressGivens = [];
    this.showingLevel = ADDRESS_LEVEL.sidoName;
    this.selectedRoadAddress = '';
    this.isMultipleAnswer = false;
    this.selectedAnswers = [];
    this.isLoading = false;
    this.isLoadingResult = false;
    this.previousQuestionDtoArr = [];
    this.questionGivenArray = [];
    this.loadingProgress = 0;
  }

  onNext(obj: any) {
    const key = Object.keys(obj)[0];
    const value = Object.values(obj)[0];
    this.$set(this.resultRequestDto, key, value);
    this.questionIndex++;
  }

  created() {
    const urlQuery = location.search;
    if (urlQuery.includes('utm_source=')) {
      this.isUtmSource = true;
    } else {
      this.isUtmSource = false;
    }
  }

  async mounted() {
    // this.isLoading = true;
    //get ip address
    await axios.get('https://api.ipify.org?format=json').then(res => {
      // this.isLoading = false;
      this.nextQuestionDto.ipAddress = this.resultRequestDto.ipAddress =
        res.data.ip;
      this.nextQuestionDto.uniqueSessionId = this.resultRequestDto.uniqueSessionId = `${res.data.ip}-${window.navigator.userAgent}`;
    });
  }

  updated() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
</script>
<style lang="scss">
.app-question {
  ~ [id*='post-code'] {
    .modal-body {
      background: url('../../assets/images/loading.gif') no-repeat center center;
      background-size: 5em 5em;
      min-height: 400px;
    }
  }
  .btn {
    &.btn-light {
      border: 1px solid #004d8a;
      background-color: #fff;
      color: #004d8a;
    }
  }
  .form-group {
    .icon-search {
      cursor: pointer;
      fill: #6c8fb7;
      ~ input[type='text'] {
        padding-right: 3em;
      }
    }
  }
  .progress-bar-rail {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0.25em;
    background-color: #fff;
    .progress-bar {
      display: block;
      width: 0;
      height: 100%;
      transition-duration: 0.5s;
      background-color: #6c8fb7;
    }
  }
  .main-article {
    min-height: 100vh;
    &:not(#question-start, #question-result, #question-solution, #question-complete) {
      .btn-back {
        position: fixed;
        left: 0.75em;
        top: 0.75em;
        width: 4em;
        height: 4em;
        background-color: transparent;
        &.btn-light {
          border-color: transparent;
        }
        .icon {
          fill: #6c8fb7;
        }
        &:hover {
          background-color: #6c8fb7;
          .icon {
            fill: #fff;
          }
        }
      }
      .article-header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5em;
        box-shadow: 0 0.5em 0.5em rgba(0, 0, 0, 0.05);
        h1 {
          width: 7.75em;
          font-size: 1em;
        }
        + .article-content {
          padding: 5em 0;
        }
      }
      .article-section {
        .section-title {
          span {
            display: block;
            margin-bottom: 0.5em;
            img {
              display: block;
              width: 2em;
              margin: 0 auto;
            }
          }
        }
      }
    }
    &#question-start {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      height: 100vh;
      .article-header {
        text-align: center;
        span {
          display: block;
          margin-bottom: 1em;
          img {
            display: block;
            width: 6.25em;
            margin: 0 auto;
          }
        }
        h2 {
          font-size: 2em;
        }
        p {
          font-size: 1em;
          margin-top: 1em;
        }
        .btn-box {
          margin-top: 3.125em;
        }
      }
    }
    &.bg-light {
      .article-section {
        .section-title {
          color: #004d8a;
        }
      }
    }
  }
  .article-section {
    .section-title {
      text-align: center;
      color: #fff;
      h3 {
        font-size: 1.5em;
        font-weight: bold;
        word-break: keep-all;
        + p {
          font-size: 1em;
          margin-top: 1.25em;
        }
      }
      .title-en {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5em;
      }
      + .section-content {
        margin-top: 2em;
      }
      .btn {
        word-break: keep-all;
        line-height: 1.4;
      }
    }
  }
}
</style>
