<template>
  <section class="article-section">
    <header class="section-title">
      <div class="container">
        <span>
          <router-link to="/">
            <img src="@/assets/images/logo_symbol_w.svg" alt="픽쿡" />
          </router-link>
        </span>
        <h3>{{ question }}</h3>
      </div>
    </header>
    <div class="section-content">
      <div class="container">
        <template v-if="!isMultipleAnswer">
          <div class="row gutter-sm">
            <div :class="'col-12'" v-for="given in givens" :key="given.id">
              <b-btn
                variant="light"
                class="mb-4 shadow"
                block
                pill
                size="lg"
                @click="getNextQuestion(given)"
              >
                {{ given.given }}
              </b-btn>
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
                smallSizeQuestionId.includes(nextQuestionDto.questionId)
                  ? 'col-6 col-sm-4'
                  : 'col-12'
              "
            >
              <b-btn
                :variant="selectedAnswers.includes(given) ? 'primary' : 'light'"
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
      </div>
    </div>
    <b-btn
      size="sm"
      class="btn-back"
      variant="primary"
      pill
      @click="onPrevious"
    >
      <span class="icon icon-arrow-left"><BaseArrow /></span>
      <span class="is-blind">뒤로가기</span>
    </b-btn>
  </section>
</template>

<script lang="ts">
import { FNB_OWNER, YN } from '@/common';
import BaseComponent from '@/core/base.component';
import { FirstQuestionDto, Given, NextQuestionDto } from '@/dto';
import questionService from '@/services/question.service';
import QuestionService from '@/services/question.service';
import { Component, Prop } from 'vue-property-decorator';
@Component({
  name: 'MultipleQuestion',
})
export default class MultipleQuestion extends BaseComponent {
  @Prop() readonly fnbOwnerStatus: FNB_OWNER;
  @Prop() readonly ipAddress: string;
  @Prop() readonly uniqueSessionId: string;
  private givens: Given[] = [];
  private question = '';
  private nextQuestionDto = new NextQuestionDto();
  private firstQuestionDto = new FirstQuestionDto();
  private questionGivenArray: any[] = [];
  private selectedAnswers: Given[] = [];
  private isMultipleAnswer = false;
  private smallSizeQuestionId = [1, 4, 5, 12];
  private nextQuestionDtoArr: NextQuestionDto[] = [];
  private isLastQuestion = false;

  getNextQuestion(given?: Given) {
    this.$emit('progressUp');

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
    // this.resultRequestDto.questionGivenArray = this.questionGivenArray;
    this.nextQuestionDtoArr.push({ ...this.nextQuestionDto });
    //마지막 질문 given 선택하면 데이터 안받고 solution으로 이동
    if (this.isLastQuestion) {
      this.$emit('next', { questionGivenArray: this.questionGivenArray });
      this.$gtag.event(
        `question_${this.nextQuestionDto.userType}_${this.nextQuestionDto.questionId}_last_question`,
      );
      return;
    }

    this.$emit('loading', true);
    questionService.getNextQuestion(this.nextQuestionDto).subscribe(res => {
      this.$emit('loading', false);
      if (res) {
        this.nextQuestionDto.order = res.data.order;
        this.nextQuestionDto.questionId = res.data.id;
        this.$gtag.event(`question_${res.data.userType}_${res.data.id}`);
        this.question = res.data.question;
        //   this.questionOrder =
        //     this.nextQuestionDto.order + (this.prevOrder - 1);
        this.givens = res.data.givens;
        this.nextQuestionDto.givenId = [];
        this.isMultipleAnswer =
          res.data.multipleAnswerYn === YN.YES ? true : false;
        this.isLastQuestion = res.data.isLastQuestion === YN.YES ? true : false;
        this.selectedAnswers = [];
      }
    });
  }

  onMultipleAnswerClicked(given: Given) {
    if (this.selectedAnswers.includes(given)) {
      const theIndex = this.selectedAnswers.findIndex(e => e === given);
      this.selectedAnswers.splice(theIndex, 1);
    } else {
      this.selectedAnswers.push(given);
    }
  }

  onPrevious() {
    this.$emit('progressDown');
    if (this.questionGivenArray.length === 0) {
      //multiple의 첫번째 질문일때
      this.$emit('previous');
    } else if (this.questionGivenArray.length === 1) {
      this.getFirstQuestion();
    } else {
      this.$emit('loading', true);
      questionService
        .getNextQuestion(
          this.nextQuestionDtoArr[this.nextQuestionDtoArr.length - 2],
        )
        .subscribe(res => {
          this.$emit('loading', false);
          this.nextQuestionDto.order = res.data.order;
          this.nextQuestionDto.questionId = res.data.id;
          this.$gtag.event(`question_${res.data.userType}_${res.data.id}`);
          this.question = res.data.question;
          //   this.questionOrder =
          //     this.nextQuestionDto.order + (this.prevOrder - 1);
          this.givens = res.data.givens;
          this.nextQuestionDto.givenId = [];
          this.isMultipleAnswer =
            res.data.multipleAnswerYn === YN.YES ? true : false;
          this.isLastQuestion =
            res.data.isLastQuestion === YN.YES ? true : false;
          this.selectedAnswers = [];
          this.nextQuestionDtoArr.pop();
          this.questionGivenArray.pop();
        });
    }
  }

  getFirstQuestion() {
    this.questionGivenArray = [];
    this.nextQuestionDtoArr = [];
    this.$emit('loading', true);
    QuestionService.getFirstQuestion(this.firstQuestionDto).subscribe(res => {
      if (res) {
        this.$emit('loading', false);
        this.givens = res.data.givens;
        this.question = res.data.question;
        this.nextQuestionDto.order = res.data.order;
        this.nextQuestionDto.questionId = res.data.id;
        // this.nextQuestionDtoArr.push({ ...this.nextQuestionDto });
        // this.isMultipleAnswer =
        //   res.data.multipleAnswerYn === YN.YES ? true : false;
      }
    });
  }

  mounted() {
    this.firstQuestionDto.userType = this.fnbOwnerStatus;
    this.nextQuestionDto.userType = this.fnbOwnerStatus;
    this.nextQuestionDto.ipAddress = this.ipAddress;
    this.nextQuestionDto.uniqueSessionId = this.uniqueSessionId;
    this.nextQuestionDto.givenId = [];
    this.getFirstQuestion();
  }
}
</script>

<style></style>
