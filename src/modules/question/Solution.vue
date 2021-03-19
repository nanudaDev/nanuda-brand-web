<template>
  <div>
    <h3>Solution</h3>
    <div>
      <div>
        <label>이름</label>
        <b-form-input
          v-model="consultRequestDto.name"
          placeholder="이름을 적어주세요"
          required
        ></b-form-input>
      </div>
      <b-row>
        <b-col>
          <label>휴대전화</label>
        </b-col>
        <b-col>
          <b-form-input
            v-model="consultRequestDto.phone"
            placeholder="ex) 01012345678"
            required
            :disabled="isVerified"
          ></b-form-input>
        </b-col>
        <b-col>
          <b-btn
            @click="getSMSCode"
            :disabled="isGetCodeBtnDisabled"
            v-if="!isVerified"
          >
            {{ isGetCodeBtnDisabled ? time : '인증번호 받기' }}</b-btn
          >
        </b-col>
      </b-row>
      <b-row v-if="isSMSCodeSent">
        <b-col>
          <label>인증번호</label>
        </b-col>
        <b-col>
          <b-form-input
            v-model="consultRequestDto.smsAuthCode"
            placeholder="인증번호 숫자 6자리 입력"
            required
            :disabled="isVerified"
          ></b-form-input>
        </b-col>
        <b-col>
          <b-btn @click="checkSMSCode" :disabled="isVerified">{{
            isVerified ? '인증완료' : '인증하기'
          }}</b-btn>
        </b-col>
      </b-row>
    </div>
    <b-btn :disabled="isConsultBtnDisabled">피쿡 플래너 만나기</b-btn>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import ResultRevenueChart from '@/modules/_components/charts/ResultRevenueChart.vue';
import FoodCategoryRatioChart from '@/modules/_components/charts/FoodCategoryRatioChart.vue';
import { ConsultRequestDto } from '@/dto/question';
import authService from '@/services/auth.service';
import toast from '../../../resources/assets/js/services/toast.js';
import questionService from '@/services/question.service';
@Component({
  name: 'Solution',
  components: { ResultRevenueChart, FoodCategoryRatioChart },
})
export default class Solution extends BaseComponent {
  private consultRequestDto = new ConsultRequestDto();
  private isVerified = false;
  private isSMSCodeSent = false;
  private isGetCodeBtnDisabled = false;
  private time = 30;

  get isConsultBtnDisabled() {
    if (
      this.consultRequestDto.name &&
      this.consultRequestDto.phone &&
      this.isVerified
    ) {
      return false;
    } else {
      return true;
    }
  }

  private __countDownTimer() {
    if (this.time > 0) {
      setTimeout(() => {
        this.time -= 1;
        this.__countDownTimer();
      }, 1000);
    }
  }
  getSMSCode() {
    authService
      .getSMSCode(this.consultRequestDto.phone)
      .then(res => {
        this.time = 30;
        this.isSMSCodeSent = true;
        this.isGetCodeBtnDisabled = true;
        setTimeout(() => {
          this.isGetCodeBtnDisabled = false;
        }, this.time * 1000);
        this.__countDownTimer();
        this.isSMSCodeSent = true;
      })
      .catch(err => {
        toast.error('휴대폰 번호를 정확히 입력해주세요');
      });
  }
  checkSMSCode() {
    authService
      .checkSMSCode(
        this.consultRequestDto.phone,
        this.consultRequestDto.smsAuthCode,
      )
      .then(res => {
        this.isVerified = res;
      })
      .catch(err => {
        toast.error('인증번호가 올바르지않거나 유효기간이 초과했습니다');
      });
  }
  onConsultBtnClicked() {
    questionService.postConsult(this.consultRequestDto);
  }
  mounted() {
    this.consultRequestDto.proformaConsultResultId = +this.$route.params
      .proformaId;
  }
}
</script>

<style></style>
