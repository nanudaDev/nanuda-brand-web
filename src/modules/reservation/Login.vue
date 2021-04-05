<template>
  <article class="main-article">
    <section class="article-section">
      <div class="container">
        <header class="section-header">
          <h3>
            <router-link to="/"
              ><img
                src="@/assets/images/logo_w.svg"
                alt="픽쿡"
                class="logo-w"
                style="width:12rem"
            /></router-link>
          </h3>
        </header>
        <div class="section-content">
          <div class="input-form">
            <b-form-row class="align-items-center">
              <b-col cols="3">
                <label class="txt-tiny">휴대전화</label>
              </b-col>
              <b-col cols="9">
                <b-form-input
                  label="휴대전화 번호"
                  placeholder="ex) 01012345678"
                  v-model="loginDto.phone"
                ></b-form-input>
              </b-col>
            </b-form-row>
            <!-- <b-form-row class="my-3 align-items-center">
              <b-col cols="3">
                <label class="txt-tiny">예약코드</label>
              </b-col>
              <b-col cols="9">
                <b-form-input
                  label="예약 코드"
                  placeholder="ex) PC1234-12-1242"
                  v-model="loginDto.reservationCode"
                ></b-form-input>
              </b-col>
            </b-form-row> -->
            <div class="btn-box mt-3">
              <b-btn
                variant="primary"
                size="xs"
                block
                :disabled="!loginDto.phone"
                @click="onEnter()"
                @keyup.enter="onEnter()"
              >
                확인
              </b-btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  </article>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Vue } from 'vue-property-decorator';
import reservationService from '@/services/reservation.service';
import LoginDto from '@/dto/reservation/login.dto';
@Component({
  name: 'Login',
})
export default class Login extends BaseComponent {
  private loginDto = new LoginDto();

  onEnter() {
    if (this.$route.query.reservationCode) {
      this.loginDto.reservationCode = this.$route.query
        .reservationCode as string;
    } else if (sessionStorage.getItem('reservationCode')) {
      this.loginDto.reservationCode = sessionStorage.getItem('reservationCode');
    }

    reservationService.login(this.loginDto).subscribe(res => {
      if (res) {
        //정확한 정보를 입력했을때
        sessionStorage.setItem(
          'reservationCode',
          this.loginDto.reservationCode,
        );
        reservationService
          .getReservInfo(res.data.reservationCode)
          .subscribe(res => {
            if (res) {
              //예약이 있으면
              this.$router.push(
                `/reservation/${res.data[res.data.length - 1].id}`,
              );
            } else {
              //예약이 없으면
              this.$router.push('/reservation/calendar');
            }
          });
      } else {
        //핸드폰번호나 코드가 정확하지 않을때
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

<style lang="scss" scoped>
.main-article {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #004d8a;
  .article-section {
    .section-header {
      text-align: center;
      h3 {
        font-size: 1rem;
      }
    }
    .section-content {
      margin-top: 1em;
      .input-form {
        background-color: #fff;
        padding: 1.5em;
        border-radius: 0.25em;
      }
    }
  }
}
</style>
