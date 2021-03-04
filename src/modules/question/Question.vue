<template>
  <div>
    <h3>{{ question }}</h3>

    <b-button-group deck v-if="givens.length > 0">
      <b-button
        v-for="given in givens"
        :key="given.id"
        class="m-2"
        @click="getNextQuestion(given.id)"
        style="max-width: 20rem; min-width: 15rem"
        >{{ given.given }}</b-button
      >
    </b-button-group>
    <!-- 첫번째 질문 (사장님 or 창업) -->
    <b-button-group deck v-else>
      <b-button
        v-for="given in firstGivens"
        :key="given.id"
        class="m-2"
        @click="getFirstQuestion(given.userType)"
        style="max-width: 20rem; min-width: 15rem"
        >{{ given.given }}</b-button
      >
    </b-button-group>
    <!-- <div>
      <vue-daum-postcode />
    </div> -->
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Watch } from 'vue-property-decorator';
import { VueDaumPostcode } from 'vue-daum-postcode';
import { USER } from '@/common';
import questionService from '@/services/question.service';
import axios from 'axios';
import { FirstQuestionDto, Given, NextQuestionDto } from '@/dto/question';
@Component({
  name: 'Question',
  components: { VueDaumPostcode },
})
export default class Question extends BaseComponent {
  // private userType: USER = null;
  private firstQuestionDto = new FirstQuestionDto();
  private nextQuestionDto = new NextQuestionDto();
  private question = '나는 현재';
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
  getFirstQuestion(userType: USER) {
    this.firstQuestionDto.userType = userType;
    this.nextQuestionDto.userType = userType;
    questionService.getFirstQuestion(this.firstQuestionDto).subscribe(res => {
      this.givens = res.data.givens;
      this.question = res.data.question;
      this.nextQuestionDto.questionId = res.data.id;
    });
  }

  getNextQuestion(id: number) {
    this.nextQuestionDto.givenId = id;
    questionService.getNextQuestion(this.nextQuestionDto).subscribe(res => {
      this.nextQuestionDto.questionId = res.data.id;
    });
  }
  created() {
    //get ip address
    axios.get('https://api.ipify.org?format=json').then(res => {
      this.nextQuestionDto.ipAddress = res.data.ip;
      console.log('window.navigator.userAgent', window.navigator.userAgent);
    });
  }
}
</script>

<style></style>
