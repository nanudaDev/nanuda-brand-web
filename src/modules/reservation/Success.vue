<template>
  <div class="container">
    <h2>예약 완료</h2>
    <p>이름: {{ reservationInfo.name }}</p>
    <p>휴대폰 번호: {{ reservationInfo.phone }}</p>
    <p>예약 시간: {{ formattedDate }} {{ reservationInfo.reservationTime }}</p>
    <p>예약 코드: {{ reservationInfo.reservationCode }}</p>
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
  private formattedDate = '';
  onReturnBtn() {
    sessionStorage.removeItem('reservationCode');
    this.$router.push('/reservation');
  }
  mounted() {
    reservationService
      .getReservInfo(sessionStorage.getItem('reservationCode'))
      .subscribe(res => {
        this.reservationInfo = res.data[res.data.length - 1];
        this.reservationInfo.reservationDate = new Date(
          this.reservationInfo.reservationDate,
        ).toLocaleString();
        this.formattedDate = this.reservationInfo.reservationDate.replace(
          /오.*$/,
          '',
        );
      });
  }
}
</script>

<style scoped>
.container {
  margin-top: 10rem;
  width: 400px;
}
</style>
