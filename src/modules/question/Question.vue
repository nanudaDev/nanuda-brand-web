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

    <div v-else>
      <div v-if="firstQuestionDto.userType">
        <div v-if="firstQuestionDto.userType === USER.CUR_FNB_OWNER">
          <div><vue-daum-postcode /></div>
        </div>
        <div v-else>
          <!-- 행정동 버튼 그룹 -->
          <b-button-group deck>
            <b-button
              v-for="given in addressGivens"
              :key="given.id"
              class="m-2"
              @click="getGuOrDong(given)"
              style="max-width: 20rem; min-width: 15rem"
              >{{ given[showingLevel] }}</b-button
            >
          </b-button-group>
        </div>
      </div>
      <div v-else>
        <!-- 첫번째 질문 (사장님 or 창업) -->
        <b-button-group>
          <b-button
            v-for="given in firstGivens"
            :key="given.id"
            class="m-2"
            @click="saveUserType(given.userType)"
            style="max-width: 20rem; min-width: 15rem"
            >{{ given.given }}</b-button
          >
        </b-button-group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Watch } from 'vue-property-decorator';
import { VueDaumPostcode } from 'vue-daum-postcode';
import { USER } from '@/common';
import questionService from '@/services/question.service';
import codeHdongService from '@/services/code-hdong.service';
import axios from 'axios';
import { FirstQuestionDto, Given, NextQuestionDto } from '@/dto/question';
import { use } from 'node_modules/vue/types/umd';
import { CodeHdongDto, CodeHdongSearchDto } from '@/dto/code-hdong';
@Component({
  name: 'Question',
  components: { VueDaumPostcode },
})
export default class Question extends BaseComponent {
  // private userType: USER = null;
  private USER = USER;
  private firstQuestionDto = new FirstQuestionDto();
  private nextQuestionDto = new NextQuestionDto();
  private codeHdongSearchDto = new CodeHdongSearchDto();
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
  private addressGivens: any[] = [];
  private showingLevel = 'sidoName';
  saveUserType(userType: USER) {
    this.$set(this.firstQuestionDto, 'userType', userType);
    this.$set(this.nextQuestionDto, 'userType', userType);
    if (userType === USER.CUR_FNB_OWNER) {
      this.question = '음식점 주소를 알려주세요!';
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
    });
  }

  getNextQuestion(id: number) {
    this.nextQuestionDto.givenId = [];
    this.nextQuestionDto.givenId.push(id);
    questionService.getNextQuestion(this.nextQuestionDto).subscribe(res => {
      this.nextQuestionDto.questionId = res.data.id;
      this.question = res.data.question;
      this.givens = res.data.givens;
    });
  }
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
      this.getFirstQuestion();
    }
  }
  created() {
    //get ip address
    axios.get('https://api.ipify.org?format=json').then(res => {
      this.nextQuestionDto.ipAddress = res.data.ip;
      this.nextQuestionDto.uniqueSessionId = `${res.data.ip}-window.navigator.userAgent`;
      console.log('window.navigator.userAgent', window.navigator.userAgent);
    });
  }
}
</script>

<style></style>
