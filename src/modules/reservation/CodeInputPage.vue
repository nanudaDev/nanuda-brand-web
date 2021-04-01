<template>
  <div class="container">
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
    <b-btn :disabled="!phone || !code" @click="onEnter()">
      확인
    </b-btn>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import reservationService from '@/services/reservation.service';
@Component({
  name: 'CodeInputPage',
})
export default class CodeInputPage extends BaseComponent {
  private phone = '';
  private code = '';

  onEnter() {
    reservationService.getReservInfo(this.code).subscribe(res => {
      sessionStorage.setItem('reservationCode', this.code);
      console.log('res', res);
      if (res.data.length > 0) {
        this.$router.push('/reservation/check');
      } else {
        this.$router.push('/reservation/calendar');
      }
    });
  }
}
</script>

<style>
.container {
  margin-top: 10rem;
  width: 400px;
  border: 1px black solid;
}
</style>
