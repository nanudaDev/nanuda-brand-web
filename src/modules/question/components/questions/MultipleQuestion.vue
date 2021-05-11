<template>
  <div>
    <header class="section-title">
      <div class="container">
        <span>
          <router-link to="/">
            <img src="@/assets/images/logo_symbol.svg" alt="픽쿡" />
          </router-link>
        </span>
        <h3>{{ question }}</h3>
      </div>
    </header>
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
</template>

<script lang="ts">
import { FNB_OWNER, YN } from '@/common';
import BaseComponent from '@/core/base.component';
import { FirstQuestionDto, Given, NextQuestionDto } from '@/dto';
import questionService from '@/services/question.service';
import { Component, Prop } from 'vue-property-decorator';
@Component({
  name: 'MultipleQuestion',
})
export default class MultipleQuestion extends BaseComponent {
  @Prop() readonly fnbOwnerStatus: FNB_OWNER;
  @Prop() readonly ipAdress: string;
  @Prop() readonly uniqueSessionId: string;
  private givens: Given[] = [];
  private question = '';
  private nextQuestionDto = new NextQuestionDto();
  private firstQuestionDto = new FirstQuestionDto();
  private questionGivenArray: any[] = [];
  private selectedAnswers: Given[] = [];
  private isMultipleAnswer = false;
  private smallSizeQuestionId = [1, 4, 5, 12];

  getNextQuestion(given?: Given) {
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

    questionService.getNextQuestion(this.nextQuestionDto).subscribe(res => {
      if (res.data.isLastQuestion === YN.YES) {
        //마지막질문일때
        this.$gtag.event(
          `question_${res.data.userType}_${res.data.id}_last_question`,
        );
        this.$emit('next', { questionGivenArray: this.questionGivenArray });
      }
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

  mounted() {
    this.firstQuestionDto.userType = this.fnbOwnerStatus;
    this.nextQuestionDto.userType = this.fnbOwnerStatus;
    this.nextQuestionDto.ipAddress = this.ipAdress;
    this.nextQuestionDto.uniqueSessionId = this.uniqueSessionId;
    questionService.getFirstQuestion(this.firstQuestionDto).subscribe(res => {
      if (res) {
        this.givens = res.data.givens;
        this.question = res.data.question;
        this.nextQuestionDto.order = res.data.order;
        this.nextQuestionDto.questionId = res.data.id;
        this.nextQuestionDto.givenId = [];
        // this.isMultipleAnswer =
        //   res.data.multipleAnswerYn === YN.YES ? true : false;
      }
    });
  }
}
</script>

<style></style>
