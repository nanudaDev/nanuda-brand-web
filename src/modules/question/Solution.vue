<template>
  <article class="main-article" id="question-solution" v-if="!isComplete">
    <header class="article-header">
      <div class="container">
        <span>
          <img src="@/assets/images/logo_w.svg" alt="픽쿡" />
        </span>
        <h2 v-if="resultRequestDto">
          {{ resultRequestDto.fnbOwnerStatus | enumTransformer }}
          의
          <template v-if="resultRequestDto.fnbOwnerStatus !== 'NEW_FNB_OWNER'">
            업력,</template
          >
          경험 그리고 상권분석을 <br />
          종합하였을 때 아래의 메뉴가 가장 적합합니다
        </h2>
      </div>
    </header>
    <div class="article-content">
      <section class="bg-light">
        <div
          class="complete-time-box"
          v-if="result.completeTimeData && result.completeTimeData.length > 0"
        >
          <div class="row no-gutters">
            <div
              v-for="timeData in result.completeTimeData"
              :key="timeData.hour"
              :style="`width:${100 / result.completeTimeData.length}%`"
            >
              <div class="label-box">
                {{ timeData.hour | enumTransformer }}
              </div>
              <div class="cont-box">
                <template v-if="timeData.aggregateData[0]">
                  <p>
                    {{ timeData.aggregateData[0].medium_small_category_nm }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section section01 bg-primary">
        <div class="container">
          <div class="row-box" v-if="result && result.responses[0]">
            <h4>
              메뉴 전략
            </h4>
            <p>
              {{ result.responses[0].koreanPrefSentence }}
              {{ result.responses[0].modifiedResponse.response }}
            </p>
          </div>
          <div class="row-box">
            <h4>
              운영 전략
            </h4>
            <p>
              {{ result.operationSentenceResponse }}
            </p>
          </div>
          <div class="btn-box text-center mt-5 pt-5">
            <p>
              자세한 상권분석과 운영 전략을 <br />
              신청하실 수 있습니다
            </p>
          </div>
          <button
            class="btn-scroll-down"
            v-scroll-to="{ el: '#detail-info', offset: 0 }"
          >
            <BaseArrow />
          </button>
        </div>
      </section>
      <section class="article-section section02" id="detail-info">
        <div class="container">
          <div class="card p-4 shadow-sm rounded-lg">
            <div class="row-box">
              <div class="img-box">
                <img src="@/assets/images/icon_solution_01.svg" alt="" />
              </div>
              <div class="dscr-box">
                <h4>
                  현 매장에서 매출에 가장 유리한 메뉴 매칭
                </h4>
                <p>
                  창업지역의 정밀한 상권분석을 통해 <br />
                  매출 상승에 유리한 메뉴를 매칭, 제공 드립니다
                </p>
              </div>
            </div>
            <div class="row-box">
              <div class="img-box">
                <img src="@/assets/images/icon_solution_02.svg" alt="" />
              </div>
              <div class="dscr-box">
                <h4>
                  메뉴, 운영 교육과 관리 서비스 제공
                </h4>
                <p>
                  빠른 공정, 낮은 식자재율로 완성된 메뉴의 교육과 <br />
                  운영 방법, 디자인, 홍보물을 제공합니다
                </p>
              </div>
            </div>
            <div class="row-box">
              <div class="img-box">
                <img src="@/assets/images/icon_solution_03.svg" alt="" />
              </div>
              <div class="dscr-box">
                <h4>
                  대면 창업 진단과 상권리포트 제공
                </h4>
                <p>
                  대면 미팅을 통해 상세 상권정보를 알려드립니다. <br />
                  가입시 정기적으로 상권 데이터를 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section section03 bg-light">
        <div class="container">
          <!-- TODO: 이용자 후기 이름 변경 필요 -->
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
              <div class="row-box">
                <div class="img-box">
                  <img src="@/assets/images/about_us_review_01.png" />
                </div>
                <div class="txt-box">
                  <h4>이지원 이용자 후기</h4>
                  <p>
                    배달 메뉴를 추가하려고 픽쿡을 찾았는데 <br />
                    예상보다 매출이 잘나와서 좋았습니다.<br />
                    시간대별로 알려주는게 진짜 좋은것 같습니다
                  </p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="row-box">
                <div class="img-box">
                  <img src="@/assets/images/about_us_review_03.png" />
                </div>
                <div class="txt-box">
                  <h4>박지홍 이용자 후기</h4>
                  <p>
                    한식을 매장 판매 하는데 배달은 픽쿡이 안내한 파스타를<br />
                    판매하고 있습니다. 만들기가 쉽게 만들어져서 편리합니다.
                    <br />
                    여름에 한번 더 이용하려구요
                  </p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="row-box">
                <div class="img-box">
                  <img src="@/assets/images/about_us_review_02.png" />
                </div>
                <div class="txt-box">
                  <h4>전지연 이용자 후기</h4>
                  <p>
                    맨처음 창업할 때 부터 이 서비스가 있었다면 좀 더 <br />잘
                    만들 수 있었을 텐데ㅠㅠ. 상권도 모르고 가게 열어서
                    <br />이제 메뉴 바꾸고 있습니다. 정말 필요하네요
                  </p>
                </div>
              </div>
            </swiper-slide>
            <!-- 네비게이션 -->
            <div
              class="swiper-button-next"
              slot="button-next"
              @click="onSwiperNext()"
            ></div>
            <div
              class="swiper-button-prev"
              slot="button-prev"
              @click="onSwiperPrev()"
            ></div>
          </swiper>
        </div>
      </section>
      <section class="article-section section04">
        <div class="container">
          <!-- 폼 영역 -->
          <div class="title-box text-center txt-primary mb-4">
            <p>
              아래 성함과 연락처를 남겨주시면 <br />
              담당 픽쿡 플래너가 고객님께 안내 드립니다. <br />
              데이터로 하는 창업의 시작, 픽쿡과 함께 하세요.
            </p>
          </div>
          <div class="form-container">
            <b-form-row>
              <b-col cols="3">
                <label class="txt-sm">이름</label>
              </b-col>
              <b-col cols="9">
                <b-form-input
                  v-model="consultRequestDto.name"
                  placeholder="이름을 적어주세요"
                  size="sm"
                  required
                ></b-form-input>
              </b-col>
            </b-form-row>
            <b-form-row class="mt-3">
              <b-col cols="3">
                <label class="txt-sm">휴대전화</label>
              </b-col>
              <b-col cols="6">
                <b-form-input
                  v-model="consultRequestDto.phone"
                  placeholder="ex) 01012345678"
                  required
                  :disabled="isVerified"
                  size="sm"
                ></b-form-input>
              </b-col>
              <b-col cols="3">
                <b-btn
                  size="sm"
                  @click="getSMSCode"
                  :disabled="isGetCodeBtnDisabled"
                  v-if="!isVerified"
                >
                  {{ isGetCodeBtnDisabled ? time : '인증번호' }}</b-btn
                >
              </b-col>
            </b-form-row>
            <b-form-row v-if="isSMSCodeSent" class="mt-3">
              <b-col cols="3">
                <label class="txt-sm">인증번호</label>
              </b-col>
              <b-col cols="6">
                <b-form-input
                  v-model="consultRequestDto.smsAuthCode"
                  placeholder="인증번호 숫자 6자리 입력"
                  required
                  size="sm"
                  :disabled="isVerified"
                ></b-form-input>
              </b-col>
              <b-col cols="3">
                <b-btn size="sm" @click="checkSMSCode" :disabled="isVerified">{{
                  isVerified ? '인증완료' : '인증하기'
                }}</b-btn>
              </b-col>
            </b-form-row>
            <div class="txt-box" v-if="errorText">
              <p>{{ errorText }}</p>
            </div>
          </div>
          <!-- // 폼 영역 -->
        </div>
      </section>
      <b-btn
        variant="primary"
        block
        size="lg"
        class=" rounded-0"
        :disabled="isConsultBtnDisabled"
        @click="onConsultBtnClicked"
      >
        <span>픽쿡 플래너 만나기</span>
        <span class="icon icon-arrow-right"><BaseArrow /></span>
      </b-btn>
    </div>
  </article>
  <!-- 신청 완료 -->
  <article class="main-article bg-primary" id="question-complete" v-else>
    <div class="container">
      <header class="article-header">
        <span data-aos="fade-in" data-aos-duration="1500"
          ><img src="@/assets/images/logo_w.svg" alt="픽쿡" class="logo-w"
        /></span>
        <h2 data-aos="fade-in" data-aos-duration="1500">
          신청이 완료되었습니다
        </h2>
        <p data-aos="fade-in" data-aos-duration="1500">
          담당 플래너가 배정되는데로 <br />
          입력해주신 연락처로 안내드리겠습니다.
        </p>
        <div
          class="btn-box text-center"
          data-aos="fade-in"
          data-aos-duration="1000"
        >
          <b-btn
            variant="light"
            pill
            size="xl"
            class="shadow"
            @click="$router.push('/question')"
          >
            처음으로
          </b-btn>
        </div>
        <div class="row-box mt-4">
          <router-link to="/" class="txt-sm txt-underline"
            >픽국에 대해 더 알아보기
          </router-link>
        </div>
      </header>
    </div>
  </article>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import ResultRevenueChart from '@/modules/_components/charts/ResultRevenueChart.vue';
import FoodCategoryRatioChart from '@/modules/_components/charts/FoodCategoryRatioChart.vue';
import { ConsultRequestDto } from '@/dto/question';
import authService from '@/services/auth.service';
// import toast from '../../../resources/assets/js/services/toast.js';
import questionService from '@/services/question.service';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { SmsAuthNotificationDto } from '@/dto';
@Component({
  name: 'Solution',
  components: { ResultRevenueChart, FoodCategoryRatioChart },
})
export default class Solution extends BaseComponent {
  $refs!: {
    mySwiper: HTMLFormElement;
    tagRef: HTMLFormElement;
  };
  // TODO: result, resultRequestDto  세션스토리지로 바꿔야함 , 타입체크변경
  private result: any = null;
  private resultRequestDto: any = null;
  private isComplete = false;
  //
  private consultRequestDto = new ConsultRequestDto();
  private isVerified = false;
  private errorText = '';
  private isSMSCodeSent = false;
  private isGetCodeBtnDisabled = false;
  private time = 30;
  private smsAuthNotificationDto = new SmsAuthNotificationDto();

  private swiperOption: any = {
    slidesPerView: 1,
    loop: true,
    grabCursor: false,
    allowTouchMove: false,
    speed: 700,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  get swiper() {
    return this.$refs.mySwiper.$swiper;
  }

  onSwiperPrev() {
    this.$refs.mySwiper.$swiper.slidePrev();
  }

  onSwiperNext() {
    this.$refs.mySwiper.$swiper.slideNext();
  }

  get isConsultBtnDisabled() {
    if (
      this.consultRequestDto.name &&
      this.consultRequestDto.phone &&
      this.isVerified
    ) {
      return false;
    } else {
      return true;
    }
  }

  private __countDownTimer() {
    if (this.time > 0) {
      setTimeout(() => {
        this.time -= 1;
        this.__countDownTimer();
      }, 1000);
    }
  }

  // get auth code
  getSMSCode() {
    this.smsAuthNotificationDto.phone = this.consultRequestDto.phone;
    authService.getSMSCode(this.smsAuthNotificationDto).subscribe(res => {
      this.time = 30;
      this.isSMSCodeSent = true;
      this.isGetCodeBtnDisabled = true;
      setTimeout(() => {
        this.isGetCodeBtnDisabled = false;
      }, this.time * 1000);
      this.__countDownTimer();
      this.isSMSCodeSent = true;
    });
  }
  checkSMSCode() {
    this.smsAuthNotificationDto.phone = this.consultRequestDto.phone;
    this.smsAuthNotificationDto.smsAuthCode = parseInt(
      this.consultRequestDto.smsAuthCode,
    );
    authService.checkSMSCode(this.smsAuthNotificationDto).subscribe(res => {
      if (res) {
        this.isVerified = true;
      }
    });
  }
  onConsultBtnClicked() {
    questionService.postConsult(this.consultRequestDto).subscribe(res => {
      if (res) {
        this.isComplete = true;
      }
    });
  }

  created() {
    // TODO : result , resultRequestDto 세션 스토리 저장? 필요
    this.result = this.$route.params.result;
    this.resultRequestDto = this.$route.params.resultRequestDto;
    this.consultRequestDto.proformaConsultResultId = +this.$route.params
      .proformaId;
    // reroute on reload
  }
}
</script>

<style lang="scss">
#question-solution {
  .btn-scroll-down {
    position: absolute;
    left: 50%;
    margin-left: -0.75em;
    bottom: 3em;
    z-index: 2;
    animation: animated-mouse 1s ease-in-out infinite;
    svg {
      width: 1.5em;
      height: 1.5em;
      fill: #fff;
    }
  }
  .article-header {
    background-color: #004d8a;
    text-align: center;
    padding: 3em 0;
    color: #fff;
    height: auto;
    span {
      display: block;
      margin-bottom: 0.5em;
      img {
        width: 6.5em;
      }
    }
    h2 {
      font-size: 1.375em;
    }
  }
  .article-section {
    position: relative;
    padding: 6.25em 0;
    .section-header {
      text-align: center;
      color: #0b538d;
      h3 {
        font-weight: 200;
        font-size: 1.875em;
        line-height: 1.6;
        strong {
          font-weight: 600;
        }
      }
      p {
        font-size: 0.875em;
        margin-top: 3em;
        color: #878787;
      }
    }
    .section-content {
      margin-top: 2.5em;
    }
    &.section01 {
      color: #fff;
      .row-box {
        + .row-box {
          margin-top: 10em;
        }
        h4 {
          font-size: 0.875em;
          margin-bottom: 1em;
        }
        p {
          font-size: 1.5em;
        }
      }
    }
    &.section02 {
      .row-box {
        display: flex;
        + .row-box {
          margin-top: 3em;
        }
        .img-box {
          width: 5em;
          text-align: center;
          img {
            height: 3.75em;
          }
        }
        .dscr-box {
          h4 {
            font-size: 0.875em;
            font-weight: 600;
            color: #004d8a;
            margin-bottom: 0.5em;
          }
          p {
            font-size: 0.75em;
            color: #000000;
            line-height: 1.6;
          }
        }
      }
    }
    &.section03 {
      padding: 2.5em 0;
      .row-box {
        display: flex;
        align-items: center;
        justify-content: center;
        .img-box {
          width: 6em;
          text-align: center;
          img {
            border-radius: 50%;
            box-shadow: 0 0 1em rgba(0, 0, 0, 0.05);
            width: 70%;
          }
        }
        .txt-box {
          text-align: left;
          color: #004d8a;
          h4 {
            font-size: 0.875em;
            font-weight: 600;
            margin-bottom: 0.5em;
          }
          p {
            font-size: 0.75em;
          }
        }
      }
    }
  }
}

#question-complete {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  height: 100vh;
  .article-header {
    text-align: center;
    span {
      display: block;
      margin-bottom: 1em;
      img {
        display: block;
        width: 6.25em;
        margin: 0 auto;
      }
    }
    h2 {
      font-size: 2em;
    }
    p {
      font-size: 1em;
      margin-top: 1em;
    }
    .btn-box {
      margin-top: 3.125em;
    }
    .txt-underline {
      border-color: #fff;
    }
  }
}
</style>
