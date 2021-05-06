<template>
  <div>
    <article class="main-article bg-primary" v-if="isStart" id="question-start">
      <header class="article-header">
        <span data-aos="fade-down" data-aos-duration="1500"
          ><router-link to="/"
            ><img
              src="@/assets/images/logo_w.svg"
              alt="픽쿡"
              class="logo-w"/></router-link
        ></span>
        <h2 data-aos="fade-down" data-aos-duration="1500">
          상권에 딱 맞는 <br />창업 아이템을 확인하세요!
        </h2>
        <p data-aos="fade-down" data-aos-duration="1500">
          단 1분만에 빅데이터로 <br />최적 창업 아이템을 추천합니다.
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
            시작하기
          </b-btn>
        </div>
      </header>
    </article>
    <template v-if="!resultResponseDto">
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
            <header class="section-title">
              <div class="container">
                <span>
                  <router-link to="/">
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
                  </router-link>
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
                          >{{ given.given }}</b-btn
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
                          >{{ given.given }}
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
                  <template v-if="!KBCategoryGivens.length > 0">
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
                          <span
                            class="icon icon-search"
                            @click="$bvModal.show('post-code')"
                            ><BaseSearch
                          /></span>
                          <b-form-input
                            size="lg"
                            v-model="selectedRoadAddress"
                            placeholder="운영하고 있는 음식점 위치 검색"
                            @click="$bvModal.show('post-code')"
                            class="rounded-pill"
                          />
                        </b-form-group>
                        <div
                          class="text-center mt-4"
                          v-if="!isAvailableLocation"
                        >
                          <b-btn
                            @click="getKBCategoryQuestion()"
                            :disabled="!selectedRoadAddress"
                            variant="success"
                            size="lg"
                            block
                            pill
                            >다음</b-btn
                          >
                        </div>
                        <div
                          class="txt-box text-center mt-5"
                          v-if="isAvailableLocation"
                        >
                          <p class="text-light">
                            현재 상권분석이 가능한 지역은<br />
                            <strong>{{ availableLocation }}</strong>
                            <br />입니다
                          </p>
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
                  <template v-else>
                    <b-btn
                      @click="goToPrevious()"
                      size="sm"
                      class="btn-back"
                      variant="primary"
                      pill
                    >
                      <span class="icon icon-arrow-left"><BaseArrow /></span>
                      <span class="is-blind">뒤로가기</span>
                    </b-btn>
                    <div class="row">
                      <div
                        class="col-12"
                        v-for="given in KBCategoryGivens"
                        :key="given.id"
                      >
                        <b-btn
                          variant="light"
                          class="mb-4 shadow"
                          block
                          pill
                          size="lg"
                          @click="getFirstQuestion(given.givenDetails.value)"
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
      </article>
    </template>
    <template v-else>
      <Solution :result="resultResponseDto" @reset="resetData" />
    </template>
    <template v-if="isLoading">
      <div class="loading-layer"></div>
    </template>
    <template v-if="isLoadingResult">
      <div class="loading-progress-layer">
        <div class="loading-container">
          <div class="text-center">
            <vue-ellipse-progress
              :progress="loadingProgress"
              color="#ffffff"
              empty-color="#ffffff"
              :size="180"
              thickness="5"
              empty-thickness="3"
              line-mode="out 5"
              animation="default 700 1000"
              font-size="3rem"
              font-color="#ffffff"
            >
              <span slot="legend-value">%</span>
            </vue-ellipse-progress>
          </div>
          <div class="mt-4 text-center">
            <p class="txt-large txt-white">
              <template v-if="loadingProgress < 91">
                분석이 진행되고 있어요 <br />
                응답하신 내용과 빅데이터로 <br />상권에 딱 맞는 창업 아이템을
                알려드릴게요
              </template>
              <template v-else>
                거의 완료되었어요 <br />
                이제 결과를 보여드릴게요
              </template>
            </p>
          </div>
        </div>
      </div>
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
import {
  FirstQuestionDto,
  Given,
  NextQuestionDto,
  ResultRequestDto,
  ResultResponseDto,
} from '@/dto/question';
import { use } from 'node_modules/vue/types/umd';
import { CodeHdongDto, CodeHdongSearchDto } from '@/dto/code-hdong';
import { COMMON_CODE_CATEGORY, FNB_OWNER } from '@/shared';
import { ADDRESS_LEVEL, KB_FOOD_CATEGORY, YN } from '@/common';
import Solution from './Solution.vue';
@Component({
  name: 'Question',
  components: { VueDaumPostcode, Solution },
})
export default class Question extends BaseComponent {
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
  private questionTotalCount: any = 10;
  private questionOrder: any = 0;
  private prevOrder: any = 0;
  private question = '나는 현재';
  private FNB_OWNER = FNB_OWNER;
  private resultResponseDto: ResultResponseDto = null;
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

  startQuestion() {
    this.isStart = false;
    this.$gtag.event('start_question_button', { description: '질문 시작' });
  }

  saveUserType(userType: FNB_OWNER) {
    this.resultRequestDto.fnbOwnerStatus = userType;
    this.$set(this.firstQuestionDto, 'userType', userType);
    this.$set(this.nextQuestionDto, 'userType', userType);
    if (userType === FNB_OWNER.CUR_FNB_OWNER) {
      this.question = '음식점 주소를 알려주세요!';
      this.$nextTick(() => {
        this.$bvModal.show('post-code');
      });
      this.$gtag.event(`user_type_${userType}`, {
        description: '기창업자로 질문 시작',
      });
      codeHdongService.getSido().subscribe(res => {
        this.isLoading = false;
        this.addressGivens = res.data;
        const locationArray = this.addressGivens.map(e => e.sidoName);
        const locationArrayText = locationArray.join(', ');
        this.availableLocation = locationArrayText;
      });
    } else {
      this.question = '어떤 곳에서 창업을 희망하나요?';
      this.$gtag.event(`user_type_${userType}`, {
        description: '신규창업자로 질문 시작',
      });
      this.isLoading = true;
      codeHdongService.getSido().subscribe(res => {
        this.isLoading = false;
        this.addressGivens = res.data;
      });
    }
    // 진행 단계 증가
    this.questionOrder += 1;
  }

  getFirstQuestion(kbCategoryValue?: KB_FOOD_CATEGORY) {
    this.isLoading = true;
    if (kbCategoryValue) {
      this.resultRequestDto.selectedKbMediumCategory = kbCategoryValue;
    }
    questionService.getFirstQuestion(this.firstQuestionDto).subscribe(res => {
      if (res) {
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

  // 질문 화면일때 뒤로가기
  goToPrevious() {
    if (this.previousQuestionDtoArr.length == 0) {
      this.KBCategoryGivens = [];
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
        }
        if (res) {
          this.isLoading = false;
          this.nextQuestionDto.order = res.data.order;
          this.nextQuestionDto.questionId = res.data.id;
          // this.$gtag.event(`question_${res.data.userType}_${res.data.id}`, {
          //   description: `${res.data.commonCode.comment} : ${res.data.question}`,
          // });
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

    this.isStart = true;
    this.isLastQuestion = false;
    this.smallSizeQuestionId = [1, 4, 5, 12];
    this.bgLightQuestionId = [2, 3, 4, 5, 6, 11, 12, 13, 14];
    this.questionTotalCount = 9;
    this.questionOrder = 0;
    this.prevOrder = 0;
    this.question = '나는 현재';
    this.FNB_OWNER = FNB_OWNER;
    this.resultResponseDto = null;
    this.isAvailableLocation = false;
    this.availableLocation = '';
    this.firstGivens = [
      {
        id: 1,
        userType: FNB_OWNER.CUR_FNB_OWNER,
        given: '운영하는 음식점이 있어요!',
      },
      {
        id: 2,
        userType: FNB_OWNER.NEW_FNB_OWNER,
        given: '음식점 창업을 생각 중이에요!',
      },
    ];
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
