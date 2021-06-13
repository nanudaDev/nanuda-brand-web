<template>
  <article class="main-article">
    <section class="article-section">
      <div class="container">
        <header class="section-header">
          <h3>예약 완료</h3>
        </header>
        <div class="section-content">
          <div class="txt-box">
            <div class="row-box">
              <h4>이름</h4>
              <p>{{ reservationInfo.name }}</p>
            </div>
            <div class="row-box">
              <h4>휴대폰 번호</h4>
              <p>{{ reservationInfo.phone }}</p>
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
          <div class="btn-box mt-5 text-right">
            <b-btn size="xs" variant="secondary" @click="onReturnBtn"
              >돌아가기</b-btn
            >
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import GetReservationResponseDto from '@/dto/reservation/get-reservation-response.dto';
import reservationService from '@/services/reservation.service';

import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'Success',
})
export default class Success extends BaseComponent {
  private reservationInfo = new GetReservationResponseDto();
  private formattedDate = '';
  onReturnBtn() {
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

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
.main-article {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: $primary;
  padding: 1em;
  .article-section {
    max-width: 400px;
    width: 100%;
    background-color: #fff;
    border-radius: 0.25em;
    padding: 2em;
    .section-header {
      text-align: center;
      h3 {
        font-size: 1.6rem;
        color: $primary;
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
