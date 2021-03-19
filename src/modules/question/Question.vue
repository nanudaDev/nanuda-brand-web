<template>
  <div>
    <article class="main-article bg-primary" v-if="isStart" id="question-start">
      <header class="article-header">
        <span data-aos="fade-down" data-aos-duration="1500"
          ><img src="@/assets/images/logo_w.svg" alt="픽쿡" class="logo-w"
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
    <template v-if="!aggregateResultResponseDto">
      <article
        class="main-article"
        :id="nextQuestionDto.questionId"
        v-if="!isStart"
        :class="
          bgLightQuestionId.includes(nextQuestionDto.questionId)
            ? 'bg-light'
            : 'bg-primary'
        "
      >
        <b-overlay :show="isLoading">
          <header class="article-header">
            <h1>
              <img
                src="@/assets/images/logo.svg"
                alt="픽쿡"
                v-if="bgLightQuestionId.includes(nextQuestionDto.questionId)"
              />
              <img src="@/assets/images/logo_w.svg" alt="픽쿡" v-else />
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
              <header class="section-title">
                <div class="container">
                  <span>
                    <img
                      src="@/assets/images/logo_symbol.svg"
                      alt="픽쿡"
                      v-if="
                        bgLightQuestionId.includes(nextQuestionDto.questionId)
                      "
                    />
                    <img
                      src="@/assets/images/logo_symbol_w.svg"
                      alt="픽쿡"
                      v-else
                    />
                  </span>
                  <h3>{{ question }}</h3>
                </div>
              </header>
              <div class="section-content">
                <div class="container">
                  <template v-if="givens && givens.length > 0">
                    <b-btn
                      @click="goToPrevious()"
                      size="sm"
                      class="btn-back"
                      :variant="
                        bgLightQuestionId.includes(nextQuestionDto.questionId)
                          ? 'light'
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
                            smallSizeQuestionId.includes(
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
                            smallSizeQuestionId.includes(
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
                          @click="goToPreviousAddr()"
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
                        <b-form-group>
                          <span class="icon icon-search"><BaseSearch /></span>
                          <b-form-input
                            size="lg"
                            v-model="selectedRoadAddress"
                            placeholder="운영하고 있는 음식점 위치 검색"
                            @click="$bvModal.show('post-code')"
                            class="rounded-pill"
                          />
                        </b-form-group>

                        <div class="text-center mt-4">
                          <b-btn
                            @click="getFirstQuestion()"
                            :disabled="!selectedRoadAddress"
                            variant="success"
                            size="lg"
                            block
                            pill
                            >다음</b-btn
                          >
                        </div>
                        <b-modal
                          id="post-code"
                          hide-footer
                          no-close-on-backdrop
                        >
                          <template #modal-title>
                            <strong class="txt-primary">주소검색</strong>
                          </template>
                          <div>
                            <vue-daum-postcode @complete="onPostCodeComplete" />
                          </div>
                        </b-modal>
                      </div>
                      <div v-else>
                        <b-btn
                          @click="goToPreviousAddr()"
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
                      <div class="row">
                        <div
                          class="col-12"
                          v-for="given in firstGivens"
                          :key="given.id"
                        >
                          <b-btn
                            variant="light"
                            class="mb-4 shadow"
                            block
                            pill
                            size="lg"
                            @click="saveUserType(given.userType)"
                          >
                            {{ given.given }}
                          </b-btn>
                        </div>
                      </div>
                    </template>
                  </template>
                </div>
              </div>
            </section>
          </div>
        </b-overlay>
      </article>
    </template>
    <template v-else>
      <Result
        :result="aggregateResultResponseDto"
        :resultRequestDto="resultRequestDto"
        :codeHdongSearchDto="codeHdongSearchDto"
      />
    </template>
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
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { COMMON_CODE_CATEGORY, FNB_OWNER } from '@/shared';
import { ADDRESS_LEVEL, YN } from '@/common';
@Component({
  name: 'Question',
  components: { VueDaumPostcode, Result },
})
export default class Question extends BaseComponent {
  // private userType: USER = null;

  private firstQuestionDto = new FirstQuestionDto();
  private nextQuestionDto = new NextQuestionDto();
  private codeHdongSearchDto = new CodeHdongSearchDto();
  private resultRequestDto = new ResultRequestDto();

  private isStart = true;
  private isLastQuestion = false;
  private smallSizeQuestionId = [1, 4, 5, 10, 12];
  private bgLightQuestionId = [2, 3, 4, 5, 6, 11, 12, 13, 14];
  private questionTotalCount: any = 9;
  private questionOrder: any = 0;
  private prevOrder: any = 0;
  private question = '나는 현재';
  private FNB_OWNER = FNB_OWNER;
  private aggregateResultResponseDto: AggregateResultResponse = null;
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
    // 진행 단계 증가
    this.questionOrder += 1;
  }
  getFirstQuestion() {
    questionService.getFirstQuestion(this.firstQuestionDto).subscribe(res => {
      this.givens = res.data.givens;
      this.question = res.data.question;
      this.nextQuestionDto.order = res.data.order;
      this.nextQuestionDto.questionId = res.data.id;
      this.nextQuestionDto.givenId = [];
      this.isMultipleAnswer =
        res.data.multipleAnswerYn === YN.YES ? true : false;
    });
    // 이전 단계 저장 후 증가
    this.questionOrder += 1;
    this.prevOrder = this.questionOrder;
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
      // 진행 단계 저장
      this.questionOrder = this.prevOrder - 1;
      return;
    }
    if (this.previousQuestionDtoArr.length == 1) {
      questionService.getFirstQuestion(this.firstQuestionDto).subscribe(res => {
        this.givens = res.data.givens;
        this.question = res.data.question;
        this.nextQuestionDto.order = res.data.order;
        this.nextQuestionDto.questionId = res.data.id;
        this.nextQuestionDto.givenId = [];
        this.isMultipleAnswer =
          res.data.multipleAnswerYn === YN.YES ? true : false;
        // 진행 단계 저장
        this.prevOrder = this.questionOrder;
      });
    }
    const previousDto = this.previousQuestionDtoArr[
      this.previousQuestionDtoArr.length - 2
    ];
    this.previousQuestionDtoArr.pop();
    this.questionGivenArray.pop();
    questionService.getNextQuestion(previousDto).subscribe(res => {
      if (res.data.isLastQuestion === YN.YES) {
        this.isLastQuestion = true;
      }
      this.nextQuestionDto.questionId = res.data.id;
      this.question = res.data.question;
      this.givens = res.data.givens;
      this.nextQuestionDto.givenId = [];
      this.isMultipleAnswer =
        res.data.multipleAnswerYn === YN.YES ? true : false;
    });
    // 진행 단계 감소
    this.questionOrder -= 1;
    this.isLastQuestion = false;
  }
  getNextQuestion(given?: Given) {
    //이전 질문들 저장
    this.previousQuestionDtoArr.push({ ...this.nextQuestionDto });
    this.nextQuestionDto.givenId = [];

    // 답변을 하나만 선택할때
    if (given) {
      this.nextQuestionDto.givenId.push(given.id);
      if (
        given.givenDetails.category === COMMON_CODE_CATEGORY.KB_MEDIUM_CATEGORY
      ) {
        this.resultRequestDto.kbFoodCategory = given.givenDetails.value;
      }
      if (given.givenDetails.category === COMMON_CODE_CATEGORY.AGE_GROUP) {
        this.resultRequestDto.ageGroupCode = given.givenDetails.key;
      }
      if (given.givenDetails.category === COMMON_CODE_CATEGORY.REVENUE_RANGE) {
        this.resultRequestDto.revenueRangeCode = given.givenDetails.key;
      }
    } else {
      //답변을 여러개 선택할때
      this.$set(this.nextQuestionDto, 'givenId', this.selectedAnswers);
      const selectedGivenId = this.selectedAnswers.map(e => e.id);
      this.nextQuestionDto.givenId = selectedGivenId;
      //영업 시간
      if (
        this.givens[0].givenDetails.category ===
        COMMON_CODE_CATEGORY.OPERATION_TIME
      ) {
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
      if (res.data.isLastQuestion === YN.YES) {
        this.isLastQuestion = true;
      }
      this.nextQuestionDto.order = res.data.order;
      this.nextQuestionDto.questionId = res.data.id;
      this.question = res.data.question;
      this.questionOrder = this.nextQuestionDto.order + (this.prevOrder - 1);
      this.givens = res.data.givens;
      this.nextQuestionDto.givenId = [];
      this.isMultipleAnswer =
        res.data.multipleAnswerYn === YN.YES ? true : false;
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
        // 진행 단계 증가
        this.questionOrder += 1;
      });
    } else if (this.showingLevel === ADDRESS_LEVEL.guName) {
      codeHdongService.getHdongName(this.codeHdongSearchDto).subscribe(res => {
        this.addressGivens = res.data;
        this.showingLevel = ADDRESS_LEVEL.hdongName;
        // 진행 단계 증가
        this.questionOrder += 1;
      });
    } else {
      if (given) {
        this.resultRequestDto.hdongCode = given.hdongCode;
      }
      this.getFirstQuestion();
    }
    this.prevOrder = this.questionOrder;
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
  .form-group {
    .icon-search {
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
    &:not(#question-start, #question-result, #question-solution) {
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
