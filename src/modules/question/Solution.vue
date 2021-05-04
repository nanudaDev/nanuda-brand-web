<template>
  <article class="main-article" id="question-solution" v-if="!isComplete">
    <header class="article-header">
      <div class="container">
        <span>
          <router-link to="/">
            <img src="@/assets/images/logo_w.svg" alt="픽쿡"
          /></router-link>
        </span>
        <h2 v-if="result && result.fnbOwnerStatus">
          {{ result.fnbOwnerStatus | enumTransformer }}의
          <template v-if="result.fnbOwnerStatus !== 'NEW_FNB_OWNER'">
            업력,</template
          >
          경험 그리고 상권분석을 <br class="d-none d-sm-block" />
          종합하였을 때 아래의 메뉴가 가장 적합합니다
        </h2>
      </div>
    </header>
    <div class="article-content">
      <section class="article-section">
        <div class="container">
          <div>{{ result.hdong.hdongName }}</div>
          <div class="row-box">
            <h4 class="pa-2">
              최적 메뉴 안내
            </h4>

            <b-card
              tag="article"
              class="mb-2"
              v-for="(item, index) in result.rankDataWCScore"
              :key="index"
            >
              <b-row no-gutters>
                <b-col md="6">
                  <b-card-img
                    src="https://picsum.photos/600/300/?image=25"
                    alt="Image"
                    width="100"
                  ></b-card-img>
                </b-col>
                <b-col md="6">
                  <b-card-body>
                    <b-badge pill variant="success" v-if="index === 0"
                      >최고적합률</b-badge
                    >
                    <b-badge pill variant="success" v-if="index === 1"
                      >적합률높음</b-badge
                    >
                    <b-badge pill variant="success" v-if="index === 2"
                      >적합률보통</b-badge
                    >
                    <b-badge pill>{{ item.mediumCategoryName }}</b-badge>
                    <b-card-text>
                      {{ item.attributeValues.sSmallCategoryName }}
                    </b-card-text>
                    <b-card-text>
                      적합률 {{ Math.round(item.appliedFitnessScore) }}%
                    </b-card-text>
                    <b-button v-b-toggle="'collapse-2'" class="m-1"
                      >Toggle Collapse</b-button
                    >
                  </b-card-body>
                </b-col>
              </b-row>
              <b-collapse id="collapse-2">
                <b-card-text
                  >토글 내용 토글 내용토글 내용토글 내용토글 내용토글 내용토글
                  내용토글 내용토글 내용토글 내용토글 내용</b-card-text
                >
              </b-collapse>
            </b-card>
          </div>
        </div>
      </section>
      <section class="article-section section02">
        <div class="container">
          <div class="title-box text-center">
            <h4 class="txt-bold">매장/배달소비현황</h4>
          </div>
          <div class="section-content">
            <b-card>
              <b-row align-h="between">
                <b-col><p>매장</p></b-col>
                <b-col><p style="text-align:right">배달</p></b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-progress class="mt-2" show-value height="5rem">
                    <b-progress-bar
                      :value="result.deliveryRatioData.restaurantRatio"
                      variant="success"
                      >{{
                        result.deliveryRatioData.restaurantRatio
                      }}%</b-progress-bar
                    >
                    <b-progress-bar
                      :value="result.deliveryRatioData.deliveryRatio"
                      variant="warning"
                      >{{
                        result.deliveryRatioData.deliveryRatio
                      }}%</b-progress-bar
                    >
                  </b-progress>
                </b-col>
              </b-row>
            </b-card>
          </div>
        </div>
      </section>
      <section>
        <div class="container">
          <h1>예상 추가 월 매출</h1>
          <b-card>
            <div>12827만원</div>
          </b-card>
        </div>
        <div class="container">
          <h1>전 분기 대비 매출상승율</h1>
          <b-card>
            <div>
              <b-row>
                <b-col>
                  <div>+32%</div>
                  <div style="backgroundColor:blue;height:2rem"></div>
                  <div>부대찌개</div>
                </b-col>
                <b-col>
                  <div>+32%</div>
                  <div style="backgroundColor:blue;height:2rem"></div>
                  <div>부대찌개</div>
                </b-col>
                <b-col>
                  <div>+32%</div>
                  <div style="backgroundColor:blue;height:2rem"></div>
                  <div>부대찌개</div>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </div>
      </section>
      <section class="article-section section04">
        <div class="container">
          <!-- 폼 영역 -->
          <div class="title-box text-center txt-primary mb-5">
            <h4 class="txt-md">
              아래 성함과 연락처를 남겨주시면 <br />
              담당 픽쿡 플래너가 고객님께 안내 드립니다. <br />
              데이터로 하는 창업의 시작, 픽쿡과 함께 하세요.
            </h4>
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
                  size="md"
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
                  size="md"
                ></b-form-input>
              </b-col>
              <b-col cols="3">
                <b-btn
                  size="md"
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
                  size="md"
                  :disabled="isVerified"
                ></b-form-input>
              </b-col>
              <b-col cols="3">
                <b-btn size="md" @click="checkSMSCode" :disabled="isVerified">{{
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
          ><router-link to="/"
            ><img
              src="@/assets/images/logo_w.svg"
              alt="픽쿡"
              class="logo-w"/></router-link
        ></span>
        <h2 data-aos="fade-in" data-aos-duration="1500">
          신청이 완료되었습니다
        </h2>
        <p data-aos="fade-in" data-aos-duration="1500">
          담당 플래너가 배정되는대로 <br />
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
            @click="$emit('reset')"
          >
            처음으로
          </b-btn>
        </div>
        <div class="row-box mt-4">
          <router-link to="/" class="txt-sm txt-underline"
            >픽쿡에 대해 더 알아보기
          </router-link>
        </div>
      </header>
    </div>
  </article>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop } from 'vue-property-decorator';
import ResultRevenueChart from '@/modules/_components/charts/ResultRevenueChart.vue';
import FoodCategoryRatioChart from '@/modules/_components/charts/FoodCategoryRatioChart.vue';
import { ConsultRequestDto, ResultResponseDto } from '@/dto/question';
import authService from '@/services/auth.service';
// import toast from '../../../resources/assets/js/services/toast.js';
import questionService from '@/services/question.service';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { SmsAuthNotificationDto } from '@/dto';
import { ProformaResponseDto } from '@/dto/question/proforma-response.dto';
@Component({
  name: 'Solution',
  components: { ResultRevenueChart, FoodCategoryRatioChart },
})
export default class Solution extends BaseComponent {
  [x: string]: any;
  $refs!: {
    mySwiper: HTMLFormElement;
    tagRef: HTMLFormElement;
  };
  @Prop() readonly result: ResultResponseDto;
  // TODO: result, resultRequestDto  세션스토리지로 바꿔야함 , 타입체크변경
  // private result: ProformaResponseDto = null;
  // private resultRequestDto: any = null;
  private isComplete = false;
  //
  private consultRequestDto = new ConsultRequestDto();
  private isVerified = false;
  private errorText = '';
  private isSMSCodeSent = false;
  private isGetCodeBtnDisabled = false;
  private time = 30;
  private smsAuthNotificationDto = new SmsAuthNotificationDto();
  private info: any = { deliveryRatio: 67, offlineRatio: 33 };
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
      if (res) {
        this.$gtag.event('get_sms_code', {
          description: '문자 인증번호 요청',
        });
        this.time = 30;
        this.isSMSCodeSent = true;
        this.isGetCodeBtnDisabled = true;
        setTimeout(() => {
          this.isGetCodeBtnDisabled = false;
        }, this.time * 1000);
        this.__countDownTimer();
        this.isSMSCodeSent = true;
      } else {
        this.$bvToast.toast('휴대폰번호를 제대로 입력해주세요', {
          variant: 'danger',
          title: 'Error',
        });
      }
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
        this.$gtag.event('complete_sms_auth', {
          description: '인증번호 확인 완료',
        });
      } else {
        this.$bvToast.toast(
          '인증번호가 올바르지않거나 유효기간이 초과했습니다',
          {
            variant: 'danger',
            title: 'Error',
          },
        );
      }
    });
  }
  onConsultBtnClicked() {
    this.consultRequestDto.proformaConsultResultId = this.result.id;
    questionService.postConsult(this.consultRequestDto).subscribe(res => {
      if (res) {
        this.isComplete = true;
        // send pixel event
        this.$analytics.fbq.event('SubmitApplication');
        this.$gtag.event('complete_application', {
          description: '신청 완료',
        });
      }
    });
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
      color: #004d8a;
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
          line-height: 1.8;
          font-weight: 300;
          strong {
            font-weight: 400;
          }
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
          width: 3em;
          text-align: center;
          margin-right: 1em;
          img {
            height: 3.75em;
          }
        }
        .dscr-box {
          width: calc(100% - 4em);
          h4 {
            font-size: 1.25em;
            font-weight: 600;
            color: #004d8a;
            margin-bottom: 0.5em;
          }
          p {
            font-size: 1em;
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
        padding: 0 2.5em;
        .img-box {
          width: 4em;
          margin-right: 1em;
          text-align: center;
          img {
            border-radius: 50%;
            box-shadow: 0 0 1em rgba(0, 0, 0, 0.05);
            width: 100%;
          }
        }
        .txt-box {
          text-align: left;
          color: #004d8a;
          width: calc(100% - 5em);
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
    &.section04 {
      .form-container {
        max-width: 480px;
        margin: 0 auto;
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
