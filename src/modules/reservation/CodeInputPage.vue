<template>
  <div class="container">
    <span data-aos="fade-down" data-aos-duration="1500"
      ><router-link to="/"
        ><img
          src="@/assets/images/logo_w.svg"
          alt="픽쿡"
          class="logo-w"/></router-link
    ></span>
    <section class="input-form">
      <b-form-row class="mt-3">
        <b-col cols="2">
          <label class="txt-sm">휴대전화</label>
        </b-col>
        <b-col cols="6">
          <b-form-input
            label="휴대전화 번호"
            placeholder="ex) 01012345678"
            v-model="loginDto.phone"
          ></b-form-input>
        </b-col>
      </b-form-row>
      <b-form-row class="mt-3">
        <b-col cols="2">
          <label class="txt-sm">예약코드</label>
        </b-col>
        <b-col cols="8">
          <b-form-input
            label="예약 코드"
            placeholder="ex)PC1234-12-1242"
            v-model="loginDto.reservationCode"
          ></b-form-input>
        </b-col>
        <b-col cols="2">
          <b-btn
            :disabled="!loginDto.reservationCode || !loginDto.phone"
            @click="onEnter()"
          >
            확인
          </b-btn>
        </b-col>
      </b-form-row>
    </section>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import reservationService from '@/services/reservation.service';
import LoginDto from '@/dto/reservation/login.dto';
@Component({
  name: 'CodeInputPage',
})
export default class CodeInputPage extends BaseComponent {
  private loginDto = new LoginDto();

  onEnter() {
    reservationService.login(this.loginDto).subscribe(res => {
      if (res) {
        sessionStorage.setItem(
          'reservationCode',
          this.loginDto.reservationCode,
        );
        reservationService
          .getReservInfo(res.data.reservationCode)
          .subscribe(res => {
            if (res) {
              this.$router.push('/reservation/check');
            } else {
              this.$router.push('/reservation/calendar');
            }
          });
      } else {
        this.$bvToast.toast('휴대폰번호나 코드가 정확하지 않습니다', {
          title: 'Error',
          variant: 'danger',
          solid: true,
        });
      }
    });
  }
}
</script>

<style scoped>
.container {
  margin-top: 10rem;
  width: 600px;
  border: 1px black solid;
  background-color: #004d8a;
  padding: 2rem;
  border-radius: 20px;
}
.input-form {
  background-color: #fff;
  padding: 2rem;
  margin: 1rem;
  border-radius: 20px;
}
</style>
