<template>
  <article class="main-article">
    <section class="article-section">
      <div class="container">
        <header class="section-header">
          <h3>예약 정보</h3>
        </header>
        <div class="section-content">
          <div class="txt-box">
            <div class="row-box">
              <h4>이름</h4>
              <p>{{ reservationInfo.name }}</p>
            </div>
            <div class="row-box">
              <h4>휴대폰 번호</h4>
              <p>{{ reservationInfo.phone | phoneTransformer }}</p>
            </div>
            <div class="row-box">
              <h4>예약 시간</h4>
              <p>{{ formattedDate }} {{ reservationInfo.reservationTime }}</p>
            </div>
            <div class="row-box">
              <h4>예약 코드</h4>
              <p>{{ reservationInfo.reservationCode }}</p>
            </div>
          </div>
          <div class="btn-box mt-5">
            <b-btn size="xs" variant="secondary" @click="onReturnBtn"
              >돌아가기</b-btn
            >
            <b-btn size="xs" variant="danger" @click="$bvModal.show('cancel')"
              >취소하기</b-btn
            >
            <b-btn
              size="xs"
              variant="primary"
              @click="$router.push('/reservation/calendar')"
              >변경하기</b-btn
            >
          </div>
        </div>
      </div>
    </section>
    <b-modal
      id="cancel"
      @ok="onCancelOk"
      size="sm"
      ok-title="확인"
      cancel-title="닫기"
    >
      <template #modal-title>
        <strong class="txt-primary">취소하기</strong>
      </template>
      <b-form-group v-slot="{ ariaDescribedby }">
        <label for="" class="txt-tiny d-blocm mb-3 txt-bold txt-black">
          취소사유
        </label>
        <div
          v-for="reason in cancelReasons"
          :key="reason"
          class="mb-3 txt-tiny"
        >
          <b-form-radio
            class="radio"
            v-model="selectedCancelReason"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            :value="reason"
            >{{ reason }}</b-form-radio
          >
        </div>
        <b-form-textarea
          v-if="selectedCancelReason === '기타'"
          id="textarea"
          v-model="othersText"
          placeholder="사유를 입력해주세요"
          rows="3"
          max-rows="6"
        ></b-form-textarea> </b-form-group
    ></b-modal>
  </article>
</template>

<script lang="ts">
import { CONST_RESERVATION_DELETE_REASON } from '@/common';
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
  private cancelReasons = CONST_RESERVATION_DELETE_REASON;
  onReturnBtn() {
    this.$router.push('/reservation');
  }
  onCancelOk() {
    this.deleteReservationRequestDto.id = +this.$route.params.id;
    this.deleteReservationRequestDto.reservationCode = this.reservationInfo.reservationCode;
    this.deleteReservationRequestDto.phone = this.reservationInfo.phone;
    if (this.selectedCancelReason === '기타') {
      this.deleteReservationRequestDto.deleteReason = this.selectedCancelReason;
      this.deleteReservationRequestDto.deleteReasonEtc = this.othersText;
    } else {
      this.deleteReservationRequestDto.deleteReason = this.selectedCancelReason;
    }
    reservationService
      .cancelReservation(this.deleteReservationRequestDto)
      .subscribe(res => {
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

<style lang="scss" scoped>
.main-article {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #004d8a;
  padding: 1em;
  .article-section {
    max-width: 600px;
    background-color: #fff;
    border-radius: 0.25em;
    padding: 2em;
    .section-header {
      text-align: center;
      h3 {
        font-size: 1.6rem;
        color: #004d8a;
        font-weight: 700;
      }
    }
    .section-content {
      margin-top: 1em;
      .txt-box {
        .row-box {
          + .row-box {
            padding-top: 1em;
            margin-top: 1em;
            border-top: 1px solid #dcdcdc;
          }
          h4 {
            font-size: 1.2rem;
            color: #101010;
            font-weight: 600;
          }
          p {
            font-size: 1.2rem;
            line-height: 1.2;
            margin-top: 0.5em;
          }
        }
      }

      .btn {
        + .btn {
          margin-left: 1em;
        }
      }
    }
  }
}
</style>
