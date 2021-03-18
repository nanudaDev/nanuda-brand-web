<template>
  <div>
    <article class="main-article bg-primary" v-if="isStart" id="question-start">
      <header class="article-header">
        <span data-aos="fade-down" data-aos-duration="1500"
          ><img src="@/assets/images/logo_w_v2.svg" alt="픽쿡" class="logo-w"
        /></span>
        <h2 data-aos="fade-down" data-aos-duration="1500">
          실패없는 창업을 <br />안내합니다
        </h2>
        <p data-aos="fade-down" data-aos-duration="1500">
          원하는 위치에서 무슨 메뉴로 창업해야 할지 <br />빅데이터로 분석합니다.
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
            @click="isStart = false"
          >
            시작하기
          </b-btn>
        </div>
      </header>
    </article>
    <article
      class="main-article"
      :id="nextQuestionDto.questionId"
      v-if="!isStart"
      :class="
        (nextQuestionDto.questionId > 1 && nextQuestionDto.questionId < 7) ||
        (nextQuestionDto.questionId > 10 && nextQuestionDto.questionId < 15)
          ? 'bg-light'
          : 'bg-primary'
      "
    >
      <header class="article-header">
        <h1>
          <img src="@/assets/images/logo_w_v2.svg" alt="픽쿡" />
        </h1>
        <div class="progress-bar-rail">
          <span class="progress-bar"></span>
        </div>
      </header>
      <div class="article-content">
        <b-overlay :show="isLoading">
          <template v-if="!aggregateResultResponseDto">
            <section class="article-section">
              <header class="section-title">
                <div class="container">
                  <span>
                    <img src="@/assets/images/logo_w_v3.svg" alt="픽쿡" />
                  </span>
                  <h3>{{ question }}</h3>
                </div>
              </header>
              <div class="section-content">
                <div class="container">
                  <template v-if="givens.length > 0">
                    <b-btn
                      @click="goToPrevious"
                      size="sm"
                      class="btn-back"
                      :variant="
                        (nextQuestionDto.questionId > 1 &&
                          nextQuestionDto.questionId < 7) ||
                        (nextQuestionDto.questionId > 10 &&
                          nextQuestionDto.questionId < 15)
                          ? 'transparent'
                          : 'primary'
                      "
                      pill
                    >
                      <span class="icon icon-arrow-left"><BaseArrow /></span>
                      <span class="is-blind">뒤로가기</span>
                    </b-btn>
                    <template v-if="!isMultipleAnswer">
                      <div class="row gutter-sm">
                        <div
                          :class="
                            [1, 4, 5, 10, 12].includes(
                              nextQuestionDto.questionId,
                            )
                              ? 'col-6 col-sm-4'
                              : 'col-12'
                          "
                          v-for="given in givens"
                          :key="given.id"
                        >
                          <b-btn
                            variant="light"
                            class="mb-4 shadow"
                            block
                            size="lg"
                            pill
                            @click="getNextQuestion(given)"
                            >{{ given.givenDetails.displayName }}</b-btn
                          >
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <!-- 복수 선택 -->
                      <div class="row">
                        <div
                          v-for="given in givens"
                          :key="given.id"
                          :class="
                            [1, 4, 5, 10, 12].includes(
                              nextQuestionDto.questionId,
                            )
                              ? 'col-6 col-sm-4'
                              : 'col-12'
                          "
                        >
                          <b-btn
                            :variant="
                              selectedAnswers.includes(given)
                                ? 'primary'
                                : 'light'
                            "
                            class="mb-4"
                            block
                            size="lg"
                            pill
                            @click="onMultipleAnswerClicked(given)"
                            >{{ given.givenDetails.displayName }}
                          </b-btn>
                        </div>
                      </div>
                      <div class="btn-box mt-2">
                        <b-btn
                          variant="success"
                          block
                          size="lg"
                          pill
                          @click="getNextQuestion()"
                          :disabled="!selectedAnswers.length > 0"
                          >다음</b-btn
                        >
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <template v-if="firstQuestionDto.userType">
                      <div
                        v-if="
                          firstQuestionDto.userType === FNB_OWNER.CUR_FNB_OWNER
                        "
                      >
                        <!-- 다음 주소 api -->
                        <b-btn
                          @click="goToPreviousAddr"
                          size="sm"
                          class="btn-back"
                          variant="primary"
                          pill
                        >
                          <span class="icon icon-arrow-left"
                            ><BaseArrow
                          /></span>
                          <span class="is-blind">뒤로가기</span>
                        </b-btn>
                        <b-form-input
                          size="lg"
                          v-model="selectedRoadAddress"
                          placeholder="운영하고 있는 음식점 위치 검색"
                          @click="$bvModal.show('post-code')"
                          class="rounded-lg"
                        />

                        <div class="text-center mt-5">
                          <b-btn
                            @click="getFirstQuestion"
                            :disabled="!selectedRoadAddress"
                            variant="success"
                            size="lg"
                            block
                            pill
                            >다음</b-btn
                          >
                        </div>
                        <b-modal id="post-code" :title="question"
                          ><div>
                            <vue-daum-postcode
                              @complete="onPostCodeComplete"
                            /></div
                        ></b-modal>
                      </div>
                      <div v-else>
                        <b-btn
                          @click="goToPreviousAddr"
                          size="sm"
                          class="btn-back"
                          variant="primary"
                          pill
                        >
                          <span class="icon icon-arrow-left"
                            ><BaseArrow
                          /></span>
                          <span class="is-blind">뒤로가기</span>
                        </b-btn>
                        <!-- 행정동 버튼 그룹 -->
                        <div>
                          <div class="row gutter-sm">
                            <div
                              class="col-6 col-sm-4"
                              v-for="given in addressGivens"
                              :key="given.id"
                            >
                              <b-btn
                                size="lg"
                                variant="light"
                                block
                                class="mb-4 shadow"
                                pill
                                @click="getGuOrDong(given)"
                                >{{ given[showingLevel] }}</b-btn
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <!-- 첫번째 질문 (사장님 or 창업) -->
                      <b-btn
                        v-for="given in firstGivens"
                        :key="given.id"
                        variant="light"
                        class="mb-4 shadow"
                        block
                        pill
                        size="lg"
                        @click="saveUserType(given.userType)"
                      >
                        {{ given.given }}
                      </b-btn>
                    </template>
                  </template>
                </div>
              </div>
            </section>
          </template>
          <template v-else>
            <section class="article-section">
              <header class="section-title">
                <Result :result="aggregateResultResponseDto" />
              </header>
            </section>
          </template>
        </b-overlay>
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
import Result from './Result.vue';
import {
  FirstQuestionDto,
  Given,
  NextQuestionDto,
  ResultRequestDto,
} from '@/dto/question';
import { use } from 'node_modules/vue/types/umd';
import { CodeHdongDto, CodeHdongSearchDto } from '@/dto/code-hdong';
import { ADDRESS_LEVEL, FNB_OWNER } from '@/common';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
@Component({
  name: 'Question',
  components: { VueDaumPostcode, Result },
})
export default class Question extends BaseComponent {
  // private userType: USER = null;
  private isStart = true;
  private isLastQuestion = false;
  private firstQuestionDto = new FirstQuestionDto();
  private nextQuestionDto = new NextQuestionDto();
  private codeHdongSearchDto = new CodeHdongSearchDto();
  private resultRequestDto = new ResultRequestDto();
  private question = '나는 현재';
  private FNB_OWNER = FNB_OWNER;
  private aggregateResultResponseDto = new AggregateResultResponse();
  private firstGivens = [
    {
      id: 1,
      userType: 'CUR_FNB_OWNER',
      given: '음식점 사장님입니다',
    },
    {
      id: 2,
      userType: 'NEW_FNB_OWNER',
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
  private previousQuestionDtoArr: NextQuestionDto[] = [];
  private questionGivenArray: any[] = [];
  saveUserType(userType: FNB_OWNER) {
    this.resultRequestDto.fnbOwnerStatus = userType;
    this.$set(this.firstQuestionDto, 'userType', userType);
    this.$set(this.nextQuestionDto, 'userType', userType);
    if (userType === FNB_OWNER.CUR_FNB_OWNER) {
      this.question = '음식점 주소를 알려주세요!';
      this.$nextTick(() => {
        this.$bvModal.show('post-code');
      });
    } else {
      this.question = '어떤 곳에서 창업을 희망하나요?';
      codeHdongService.getSido().subscribe(res => {
        this.addressGivens = res.data;
      });
    }
  }
  getFirstQuestion() {
    questionService.getFirstQuestion(this.firstQuestionDto).subscribe(res => {
      this.givens = res.data.givens;
      this.question = res.data.question;
      this.nextQuestionDto.questionId = res.data.id;
      this.nextQuestionDto.givenId = [];
      this.isMultipleAnswer = res.data.multipleAnswerYn === 'Y' ? true : false;
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
  }
  // 질문 화면일때 뒤로가기
  goToPrevious() {
    if (this.previousQuestionDtoArr.length == 0) {
      if (this.firstQuestionDto.userType == FNB_OWNER.CUR_FNB_OWNER) {
        this.question = '음식점 주소를 알려주세요!';
      } else {
        this.question = '어떤 곳에서 창업을 희망하나요?';
      }
      this.givens = [];
      codeHdongService.getHdongName(this.codeHdongSearchDto).subscribe(res => {
        this.addressGivens = res.data;
        if (this.firstQuestionDto.userType == FNB_OWNER.NEW_FNB_OWNER) {
          this.showingLevel = ADDRESS_LEVEL.hdongName;
        }
      });
      return;
    }
    if (this.previousQuestionDtoArr.length == 1) {
      this.getFirstQuestion();
    }
    const previousDto = this.previousQuestionDtoArr[
      this.previousQuestionDtoArr.length - 2
    ];
    this.previousQuestionDtoArr.pop();
    this.questionGivenArray.pop();
    questionService.getNextQuestion(previousDto).subscribe(res => {
      if (res.data.isLastQuestion === 'Y') {
        this.isLastQuestion = true;
      }
      this.nextQuestionDto.questionId = res.data.id;
      this.question = res.data.question;
      this.givens = res.data.givens;
      this.nextQuestionDto.givenId = [];
      this.isMultipleAnswer = res.data.multipleAnswerYn === 'Y' ? true : false;
    });
  }
  getNextQuestion(given?: Given) {
    //이전 질문들 저장
    this.previousQuestionDtoArr.push({ ...this.nextQuestionDto });

    this.nextQuestionDto.givenId = [];
    // 답변을 하나만 선택할때
    if (given) {
      this.nextQuestionDto.givenId.push(given.id);
      if (given.givenDetails.category === 'KB_MEDIUM_CATEGORY') {
        this.resultRequestDto.kbFoodCategory = given.givenDetails.value;
      }
      if (given.givenDetails.category === 'AGE_GROUP') {
        this.resultRequestDto.ageGroupCode = given.givenDetails.key;
      }
      if (given.givenDetails.category === 'REVENUE_RANGE') {
        this.resultRequestDto.revenueRangeCode = given.givenDetails.key;
      }
    } else {
      //답변을 여러개 선택할때
      this.$set(this.nextQuestionDto, 'givenId', this.selectedAnswers);
      const selectedGivenId = this.selectedAnswers.map(e => e.id);
      this.nextQuestionDto.givenId = selectedGivenId;
      //영업 시간
      if (this.givens[0].givenDetails.category === 'OPERATION_TIME') {
        this.resultRequestDto.operationTimes = [];
        this.selectedAnswers.forEach(e => {
          this.resultRequestDto.operationTimes.push(e.givenDetails.value);
        });
      }
    }
    //questionGivenArray에 지금까지의 질문과 답변 저장
    this.questionGivenArray.push({
      questionId: this.nextQuestionDto.questionId,
      givenId: this.nextQuestionDto.givenId,
    });
    this.resultRequestDto.questionGivenArray = this.questionGivenArray;
    //마지막 질문일때
    if (this.isLastQuestion) {
      this.isLoading = true;
      //get result
      questionService.getResult(this.resultRequestDto).subscribe(res => {
        this.isLoading = false;
        this.aggregateResultResponseDto = res.data;
        return;
      });
    }
    questionService.getNextQuestion(this.nextQuestionDto).subscribe(res => {
      if (res.data.isLastQuestion === 'Y') {
        this.isLastQuestion = true;
      }
      this.nextQuestionDto.questionId = res.data.id;
      this.question = res.data.question;
      this.givens = res.data.givens;
      this.nextQuestionDto.givenId = [];
      this.isMultipleAnswer = res.data.multipleAnswerYn === 'Y' ? true : false;
      this.selectedAnswers = [];
    });
  }
  //level이 내려감에따라 showingLevel(보여줘야할 정보)이 변함
  getGuOrDong(given?: CodeHdongDto) {
    if (given) {
      this.codeHdongSearchDto.sidoName = given.sidoName;
      this.codeHdongSearchDto.hdongCode = given.hdongCode;
      this.codeHdongSearchDto.hdongName = given.hdongName;
      this.codeHdongSearchDto.guName = given.guName;
    }
    if (this.showingLevel === ADDRESS_LEVEL.sidoName) {
      codeHdongService.getGuName(this.codeHdongSearchDto).subscribe(res => {
        this.addressGivens = res.data;
        this.showingLevel = ADDRESS_LEVEL.guName;
      });
    } else if (this.showingLevel === ADDRESS_LEVEL.guName) {
      codeHdongService.getHdongName(this.codeHdongSearchDto).subscribe(res => {
        this.addressGivens = res.data;
        this.showingLevel = ADDRESS_LEVEL.hdongName;
      });
    } else {
      if (given) {
        this.resultRequestDto.hdongCode = given.hdongCode;
      }
      this.getFirstQuestion();
    }
  }
  onPostCodeComplete(event: any) {
    this.selectedRoadAddress = event.roadAddress;
    this.$bvModal.hide('post-code');
  }
  onMultipleAnswerClicked(given: Given) {
    if (this.selectedAnswers.includes(given)) {
      const theIndex = this.selectedAnswers.findIndex(e => e === given);
      this.selectedAnswers.splice(theIndex, 1);
    } else {
      this.selectedAnswers.push(given);
    }
  }
  async mounted() {
    this.isLoading = true;
    //get ip address
    await axios.get('https://api.ipify.org?format=json').then(res => {
      this.isLoading = false;
      this.nextQuestionDto.ipAddress = res.data.ip;
      this.nextQuestionDto.uniqueSessionId = `${res.data.ip}-${window.navigator.userAgent}`;
    });
  }
}
</script>
<style lang="scss">
.app-question {
  .btn {
    &.btn-light {
      border: 1px solid #0b538d;
      background-color: #fff;
      color: #0b538d;
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
    &:not(#question-start) {
      .btn-back {
        position: fixed;
        left: 0.75em;
        top: 1.25em;
        width: 4em;
        height: 4em;
        background-color: transparent;
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
          color: #0b538d;
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
        margin-top: 1.5em;
      }
      .btn {
        word-break: keep-all;
        line-height: 1.4;
      }
    }
  }
}
</style>
