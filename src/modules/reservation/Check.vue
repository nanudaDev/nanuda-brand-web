<template>
  <div>
    <div class="container">
      <h2>예약 정보</h2>
      <p>이름: {{ reservationInfo.name }}</p>
      <p>휴대폰 번호: {{ reservationInfo.phone }}</p>
      <p>
        예약 시간: {{ formattedDate }} {{ reservationInfo.reservationTime }}
      </p>
      <p>예약 코드:{{ reservationInfo.reservationCode }}</p>
      <b-btn @click="$router.push('/reservation/calendar')">변경하기</b-btn>
      <b-btn @click="$bvModal.show('cancel')">취소하기</b-btn>
      <b-btn @click="onReturnBtn">돌아가기</b-btn>
    </div>
    <b-modal id="cancel" @ok="onCancelOk">
      <template #modal-title>
        <strong class="txt-primary">취소하기</strong>
      </template>
      <b-form-group
        label="취소 사유"
        v-slot="{ ariaDescribedby }"
        style="backgroundColor: #fff"
      >
        <div v-for="reason in cancelReasons" :key="reason.id">
          <b-form-radio
            class="radio"
            v-model="selectedCancelReason"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            :value="reason.value"
            >{{ reason.value }}</b-form-radio
          >
        </div>
        <b-form-radio
          class="radio"
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
import DeleteReservationRequestDto from '@/dto/reservation/delete-reservation-request.dto';
import GetReservationResponseDto from '@/dto/reservation/get-reservation-response.dto';
import reservationService from '@/services/reservation.service';

import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Check',
})
export default class Check extends BaseComponent {
  private reservationInfo = new GetReservationResponseDto();
  private deleteReservationRequestDto = new DeleteReservationRequestDto();
  private formattedDate = '';
  private selectedCancelReason = '';
  private othersText = '';
  private cancelReasons = [
    { id: 1, value: '가용한 일정이 없어서' },
    { id: 2, value: '서비스에 흥미를 잃어서' },
    { id: 3, value: '직접 방문하는게 부담스러워서' },
    { id: 4, value: '다른 서비스를 이용하게 되서' },
  ];
  onReturnBtn() {
    sessionStorage.removeItem('reservationCode');
    this.$router.push('/reservation');
  }
  onCancelOk() {
    this.deleteReservationRequestDto.id = +this.$route.params.id;
    this.deleteReservationRequestDto.reservationCode = this.reservationInfo.reservationCode;
    this.deleteReservationRequestDto.phone = this.reservationInfo.phone;
    if (this.selectedCancelReason === '기타') {
      this.deleteReservationRequestDto.deleteReason = this.othersText;
    } else {
      this.deleteReservationRequestDto.deleteReason = this.selectedCancelReason;
    }

    reservationService
      .cancelReservation(this.deleteReservationRequestDto)
      .subscribe(res => {
        sessionStorage.removeItem('reservationCode');
        this.$root.$bvToast.toast('예약 취소가 완료되었습니다', {
          title: '성공',
          variant: 'success',
          solid: true,
        });
        this.$router.push('/reservation');
      });
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
  border: 1px black solid;
}
.radio {
  margin: 1rem;
}
</style>
