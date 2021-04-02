<template>
  <div class="container">
    <h2>예약 완료</h2>
    <p>이름: {{ reservationInfo.name }}</p>
    <p>휴대폰 번호: {{ reservationInfo.phone }}</p>
    <p>예약 날짜:{{ reservationInfo.reservationDate }}</p>
    <p>예약 시간:{{ reservationInfo.reservationTime }}</p>
    <p>예약 코드:{{ reservationInfo.reservationCode }}</p>
    <b-btn @click="onReturnBtn">돌아가기</b-btn>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import GetReservationResponseDto from '@/dto/reservation/get-reservation-response.dto';
import reservationService from '@/services/reservation.service';

import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'ReservSuccess',
})
export default class ReservSuccess extends BaseComponent {
  private reservationInfo = new GetReservationResponseDto();

  onReturnBtn() {
    sessionStorage.removeItem('reservationCode');
    this.$router.push('/reservation');
  }
  mounted() {
    reservationService
      .getReservInfo(sessionStorage.getItem('reservationCode'))
      .subscribe(res => {
        this.reservationInfo = res.data[0];
      });
  }
}
</script>

<style>
.container {
  margin-top: 10rem;
  width: 400px;
}
</style>
