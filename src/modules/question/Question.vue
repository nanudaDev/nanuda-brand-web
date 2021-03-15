<template>
  <article class="main-article">
    <div>
      <b-overlay :show="isLoading">
        <template v-if="!result">
          <section class="article-section">
            <header class="section-title bg-light">
              <h3 class="text-primary">{{ question }}</h3>
            </header>
            <div class="section-content">
              <div class="container">
                <template v-if="givens.length > 0">
                  <template v-if="!isMultipleAnswer">
                    <b-btn
                      v-for="given in givens"
                      :key="given.id"
                      variant="outline-primary"
                      class="mb-2"
                      block
                      size="lg"
                      @click="getNextQuestion(given)"
                      >{{ given.givenDetails.displayName }}</b-btn
                    >
                  </template>
                  <template v-else>
                    <!-- 복수 선택 -->
                    <b-btn
                      v-for="given in givens"
                      :key="given.id"
                      :variant="
                        selectedAnswers.includes(given)
                          ? 'primary'
                          : 'outline-primary'
                      "
                      class="mb-2"
                      block
                      size="lg"
                      @click="onMultipleAnswerClicked(given)"
                      >{{ given.givenDetails.displayName }}
                    </b-btn>
                    <div class="btn-box mt-2">
                      <b-btn
                        variant="success"
                        block
                        size="lg"
                        @click="getNextQuestion()"
                        :disabled="!selectedAnswers.length > 0"
                        >확인</b-btn
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
                      <b-form-group>
                        <b-form-input
                          size="lg"
                          v-model="selectedRoadAddress"
                          @click="$bvModal.show('post-code')"
                        />
                      </b-form-group>
                      <div class="mt-2">
                        <b-btn
                          @click="getFirstQuestion"
                          :disabled="!selectedRoadAddress"
                          block
                          >확인</b-btn
                        >
                      </div>
                      <b-modal id="post-code" :title="question"
                        ><div>
                          <vue-daum-postcode
                            @complete="onPostCodeComplete"
                          /></div
                      ></b-modal>
                    </div>
                    <div class="row" v-else>
                      <div
                        class="col-4"
                        v-for="given in addressGivens"
                        :key="given.id"
                      >
                        <!-- 행정동 버튼 그룹 -->
                        <b-btn
                          class="mb-4"
                          variant="outline-primary"
                          block
                          @click="getGuOrDong(given)"
                          >{{ given[showingLevel] }}</b-btn
                        >
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <!-- 첫번째 질문 (사장님 or 창업) -->
                    <b-btn
                      v-for="given in firstGivens"
                      :key="given.id"
                      variant="outline-primary"
                      class="mb-2"
                      block
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
              <h3>{{ result.response }}</h3>
            </header>
          </section>
        </template>
      </b-overlay>
    </div>
  </article>
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
} from '@/dto/question';
import { use } from 'node_modules/vue/types/umd';
import { CodeHdongDto, CodeHdongSearchDto } from '@/dto/code-hdong';
import { FNB_OWNER } from '@/common';
@Component({
  name: 'Question',
  components: { VueDaumPostcode },
})
export default class Question extends BaseComponent {
  // private userType: USER = null;
  private isLastQuestion = false;
  private firstQuestionDto = new FirstQuestionDto();
  private nextQuestionDto = new NextQuestionDto();
  private codeHdongSearchDto = new CodeHdongSearchDto();
  private resultRequestDto = new ResultRequestDto();
  private question = '나는 현재';
  private FNB_OWNER = FNB_OWNER;
  private result: any = null;
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
  private showingLevel = 'sidoName';
  private selectedRoadAddress = '';
  private isMultipleAnswer = false;
  private selectedAnswers: Given[] = [];
  private isLoading = false;
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

  getNextQuestion(given?: Given) {
    if (this.isLastQuestion) {
      this.isLoading = true;
      //get result
      questionService.getResult(this.resultRequestDto).subscribe(res => {
        this.isLoading = false;
        this.result = res.data;
      });
    } else {
      //대답 하나 or 여러개 선택
      this.nextQuestionDto.givenId = [];
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

      questionService.getNextQuestion(this.nextQuestionDto).subscribe(res => {
        if (res.data.isLastQuestion === 'Y') {
          this.isLastQuestion = true;
        }

        this.nextQuestionDto.questionId = res.data.id;
        this.question = res.data.question;
        this.givens = res.data.givens;
        this.nextQuestionDto.givenId = [];
        this.isMultipleAnswer =
          res.data.multipleAnswerYn === 'Y' ? true : false;
      });
    }
  }
  //level이 내려감에따라 showingLevel(보여줘야할 정보)이 변함
  getGuOrDong(given: CodeHdongDto) {
    this.codeHdongSearchDto.sidoName = given.sidoName;
    this.codeHdongSearchDto.hdongCode = given.hdongCode;
    this.codeHdongSearchDto.hdongName = given.hdongName;
    this.codeHdongSearchDto.guName = given.guName;
    if (this.showingLevel === 'sidoName') {
      codeHdongService.getGuName(this.codeHdongSearchDto).subscribe(res => {
        this.addressGivens = res.data;
        this.showingLevel = 'guName';
      });
    } else if (this.showingLevel === 'guName') {
      codeHdongService.getHdongName(this.codeHdongSearchDto).subscribe(res => {
        this.addressGivens = res.data;
        this.showingLevel = 'hdongName';
      });
    } else {
      this.resultRequestDto.hdongCode = given.hdongCode;
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
.article-section {
  .section-title {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10em;
    padding: 1em;
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
</style>
