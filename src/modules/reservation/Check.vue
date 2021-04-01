<template>
  <div>
    <div class="container">
      <div>예약시간 12398</div>
      <b-btn @click="$router.push('/reservation')">변경하기</b-btn>
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
