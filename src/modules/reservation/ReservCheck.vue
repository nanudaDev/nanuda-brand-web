<template>
  <div>
    <div class="container" v-if="!isVerified">
      <b-form-input
        label="이름"
        placeholder="홍길동"
        v-model="name"
      ></b-form-input>
      <b-form-input
        label="휴대전화 번호"
        placeholder="ex) 01012345678"
        v-model="phone"
      ></b-form-input>
      <b-btn>
        확인
      </b-btn>
    </div>
    <div v-else class="container">
      <div>예약시간 12398</div>
      <b-btn>변경하기</b-btn>
      <b-btn>취소하기</b-btn>
    </div>
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
  private phone = '';
  private isVerified = true;
}
</script>

<style>
.container {
  margin-top: 10rem;
  width: 400px;
}
</style>
