<template>
  <div>
    <h3>{{ question }}</h3>
    <div v-if="givens.length > 0">
      <div v-if="!isMultipleAnswer">
        <b-button
          v-for="given in givens"
          :key="given.id"
          class="m-2"
          @click="getNextQuestion(given.id)"
          style="max-width: 20rem; min-width: 15rem"
          >{{ given.givenDetails.displayName }}</b-button
        >
      </div>
      <div v-else>
        <b-button
          v-for="given in givens"
          :key="given.id"
          class="m-2"
          :variant="selectedAnswers.includes(given.id) ? 'primary' : 'light'"
          @click="onMultipleAnswerClicked(given.id)"
          style="max-width: 20rem; min-width: 15rem"
          >{{ given.givenDetails.displayName }}</b-button
        >
        <div>
          <b-btn
            @click="getNextQuestion()"
            :disabled="!selectedAnswers.length > 0"
            >확인</b-btn
          >
        </div>
      </div>
    </div>

    <div v-else>
      <div v-if="firstQuestionDto.userType">
        <div v-if="firstQuestionDto.userType === USER.CUR_FNB_OWNER">
          <!-- 다음 주소 api -->
          <input
            v-model="selectedRoadAddress"
            @click="$bvModal.show('post-code')"
          />
          <b-modal id="post-code" :title="question"
            ><div><vue-daum-postcode @complete="onPostCodeComplete" /></div
          ></b-modal>
          <div>
            <b-btn @click="getFirstQuestion" :disabled="!selectedRoadAddress"
              >확인</b-btn
            >
          </div>
        </div>
        <div v-else>
          <!-- 행정동 버튼 그룹 -->

          <b-button
            v-for="given in addressGivens"
            :key="given.id"
            class="m-2"
            @click="getGuOrDong(given)"
            style="max-width: 20rem; min-width: 15rem"
            >{{ given[showingLevel] }}</b-button
          >
        </div>
      </div>
      <div v-else>
        <!-- 첫번째 질문 (사장님 or 창업) -->

        <b-button
          v-for="given in firstGivens"
          :key="given.id"
          class="m-2"
          @click="saveUserType(given.userType)"
          style="max-width: 20rem; min-width: 15rem"
          >{{ given.given }}</b-button
        >
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
  private selectedRoadAddress = '';
  private isMultipleAnswer = false;
  private selectedAnswers: number[] = [];
  saveUserType(userType: USER) {
    this.$set(this.firstQuestionDto, 'userType', userType);
    this.$set(this.nextQuestionDto, 'userType', userType);
    if (userType === USER.CUR_FNB_OWNER) {
      this.question = '음식점 주소를 알려주세요!';
      console.log('show postcode');
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

  getNextQuestion(id?: number) {
    this.nextQuestionDto.givenId = [];
    if (id) {
      this.nextQuestionDto.givenId.push(id);
    } else {
      console.log('no id');
      this.$set(this.nextQuestionDto, 'givenId', this.selectedAnswers);
      this.nextQuestionDto.givenId = this.selectedAnswers;
    }

    questionService.getNextQuestion(this.nextQuestionDto).subscribe(res => {
      this.nextQuestionDto.questionId = res.data.id;
      this.question = res.data.question;
      this.givens = res.data.givens;
      this.nextQuestionDto.givenId = [];
      this.isMultipleAnswer = res.data.multipleAnswerYn === 'Y' ? true : false;
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
  onPostCodeComplete(event: any) {
    this.selectedRoadAddress = event.roadAddress;
    this.$bvModal.hide('post-code');
  }
  onMultipleAnswerClicked(id: number) {
    if (this.selectedAnswers.includes(id)) {
      const theIndex = this.selectedAnswers.findIndex(e => e === id);
      this.selectedAnswers.splice(theIndex, 1);
    } else {
      this.selectedAnswers.push(id);
    }
  }
  async mounted() {
    //get ip address
    await axios.get('https://api.ipify.org?format=json').then(res => {
      this.nextQuestionDto.ipAddress = res.data.ip;
      this.nextQuestionDto.uniqueSessionId = `${res.data.ip}-${window.navigator.userAgent}`;
      console.log('window.navigator.userAgent', window.navigator.userAgent);
    });
  }
}
</script>

<style></style>
