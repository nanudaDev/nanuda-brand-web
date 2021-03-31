<template>
  <div>
    <div class="container" v-if="!isVerified">
      <b-form-row class="mt-3">
        <b-col cols="3">
          <label class="txt-sm">휴대전화</label>
        </b-col>
        <b-col cols="6">
          <b-form-input
            label="휴대전화 번호"
            placeholder="ex) 01012345678"
            v-model="phone"
          ></b-form-input>
        </b-col>
      </b-form-row>
      <b-form-row class="mt-3">
        <b-col cols="3">
          <label class="txt-sm">예약코드</label>
        </b-col>
        <b-col cols="6">
          <b-form-input
            label="예약 코드"
            placeholder="PC1234-12-1242"
            v-model="code"
          ></b-form-input>
        </b-col>
      </b-form-row>
      <b-btn :disabled="!phone || !code" @click="isVerified = true">
        확인
      </b-btn>
    </div>
    <div v-else class="container">
      <div>예약시간 12398</div>
      <b-btn>변경하기</b-btn>
      <b-btn @click="$bvModal.show('cancel')">취소하기</b-btn>
    </div>
    <b-modal id="cancel">
      <template #modal-title>
        <strong class="txt-primary">취소하기</strong>
      </template>
      <b-form-group label="취소 사유" v-slot="{ ariaDescribedby }">
        <div v-for="reason in cancelReasons" :key="reason.id">
          <b-form-radio
            v-model="selectedCancelReason"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            :value="reason.id"
            >{{ reason.value }}</b-form-radio
          >
        </div>
        <b-form-radio
          v-model="selectedCancelReason"
          :aria-describedby="ariaDescribedby"
          name="some-radios"
          :value="'기타'"
          >기타</b-form-radio
        >
        <b-form-textarea
          v-if="selectedCancelReason === '기타'"
          id="textarea"
          v-model="othersText"
          placeholder="사유를 입력해주세요"
          rows="3"
          max-rows="6"
        ></b-form-textarea> </b-form-group
    ></b-modal>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';

import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'ReservCheck',
})
export default class ReservCheck extends BaseComponent {
  private name = '';
  private code = '';
  private isVerified = false;
  private selectedCancelReason = '';
  private othersText = '';
  private cancelReasons = [
    { id: 1, value: '가용한 일정이 없어서' },
    { id: 2, value: '서비스에 흥미를 잃어서' },
  ];
}
</script>

<style>
.container {
  margin-top: 10rem;
  width: 400px;
  border: 1px black solid;
}
</style>
