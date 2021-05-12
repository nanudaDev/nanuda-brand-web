<template>
  <article class="main-article" id="question-solution" v-if="result">
    <header class="article-header">
      <div class="container">
        <h2>
          <router-link to="/">
            <img
              src="@/assets/images/logo_w.svg"
              alt="픽쿡"
              class="logo-w w-15"
            />
          </router-link>
        </h2>
        <p v-if="result.hdong.hdongName">
          <b-icon icon="geo-alt-fill" /> {{ result.hdong.hdongName }}
        </p>
      </div>
    </header>
    <div class="article-content bg-light">
      <div class="container">
        <section class="article-section section01">
          <div>
            <header class="section-header">
              <h3>
                <template v-if="result.fnbOwnerStatus === 'NEW_FNB_OWNER'">
                  예비사장님, <br class="d-block d-lg-none" />
                  상권에 딱 맞는 <strong>창업아이템을 추천할게요!</strong>
                </template>
                <template v-else>
                  사장님, <br class="d-block d-lg-none" />
                  가게에 딱 맞는 <strong>창업아이템을 추천할게요!</strong>
                </template>
              </h3>
              <div class="mt-2 txt-right">
                <div class="tooltip-container">
                  <span
                    class="tooltip-label tooltip-right d-inline-flex align-items-center"
                    @click="isTooltipVislble = !isTooltipVislble"
                  >
                    <span class="d-inline-block txt-tiny txt-gray-400 mr-2"
                      >추천지수</span
                    >
                    <b-icon icon="question-circle"></b-icon>
                  </span>
                  <div class="tooltip-content" v-if="isTooltipVislble">
                    <p class="txt-small">
                      빅데이터 상권지수와 입력하신 조리경험, 운영경험,
                      창업자금을 종합하여 반영한 수치입니다.
                    </p>
                  </div>
                </div>
              </div>
              <!-- <b-modal id="info" title="추천지수" size="md" hide-footer>
                <p class="txt-small">
                  빅데이터 상권지수와 입력하신 <br />
                  조리경험, 운영경험, 창업자금을 <br />
                  종합하여 반영한 수치입니다.
                </p>
              </b-modal> -->
            </header>
            <div class="section-content">
              <b-row class="gutter-sm">
                <b-col
                  cols="12"
                  lg="4"
                  v-for="(item, index) in result.rankDataWCScore"
                  :key="index"
                >
                  <div class="my-2">
                    <div
                      class="card shadow-sm  flex-row d-lg-block"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      :data-aos-delay="300 * index"
                      v-b-toggle="toggleId(index)"
                    >
                      <div class="card-img-left" v-if="item.sSmallCategoryCode">
                        <b-img-lazy
                          :src="
                            `https://kr.object.ncloudstorage.com/common-storage-pickcook/menu/${item.sSmallCategoryCode}.jpg`
                          "
                          alt=""
                        />
                      </div>
                      <div class="card-body">
                        <div class="card-badge">
                          <b-badge pill variant="primary" v-if="index === 0"
                            >최고적합률</b-badge
                          >
                          <b-badge pill variant="blue" v-if="index === 1"
                            >적합률높음</b-badge
                          >
                          <b-badge pill variant="lightblue" v-if="index === 2"
                            >적합률보통</b-badge
                          >
                          <b-badge pill variant="secondary">{{
                            item.pickcookSmallCategoryInfo.pkMediumCategoryName
                          }}</b-badge>
                          <b-badge pill variant="outline-secondary">{{
                            item.pickcookSmallCategoryInfo.pkSmallCategoryName
                          }}</b-badge>
                        </div>
                        <h4 class="card-title">
                          {{ item.pickcookSmallCategoryInfo.pkMenuName }}
                        </h4>
                        <p class="card-text">
                          <b-icon icon="graph-up"></b-icon>
                          <span class="mx-1"
                            >추천지수
                            <strong
                              >{{
                                Math.round(item.appliedFitnessScore)
                              }}%</strong
                            ></span
                          >
                        </p>
                        <span class="btn-toggle">
                          <span class="txt-tiny">더 보기</span>
                          <span class="icon-toggle-arrow">
                            <b-icon icon="chevron-down"></b-icon>
                          </span>
                        </span>
                      </div>
                    </div>
                    <b-collapse class="card-collapse" :id="`item0${index}`">
                      <div class="card-desc">
                        <b-row no-gutters align-v="center">
                          <b-col cols="2" lg="12">
                            <img
                              src="@/assets/images/logo.svg"
                              alt="픽쿡"
                              class="logo w-8"
                            />
                          </b-col>
                          <b-col cols="10" lg="12">
                            <p class="txt-tiny">
                              빅데이터 상권지수({{
                                item.bigDataLocationScore
                              }}%)와 조리경험 ({{
                                item.cookingExperienceScore
                              }}%), 운영경험({{
                                item.operationExperienceScore
                              }}%), 창업자금({{ item.initialCostScore }}%)을
                              종합하였을때
                              <strong class="txt-primary txt-bold">
                                <template v-if="index === 0">
                                  가장
                                </template>
                                추천하는 아이템</strong
                              >
                              입니다.
                            </p>
                          </b-col>
                        </b-row>
                      </div>
                    </b-collapse>
                  </div>
                </b-col>
              </b-row>
            </div>
          </div>
        </section>
        <b-row ref="revenueWrapper" class="gutter-sm">
          <b-col cols="12" lg="6">
            <section class="article-section section02 pt-0">
              <div>
                <header class="section-header">
                  <h3>
                    {{ result.hdong.hdongName }}의 고객들은 <br />
                    <template
                      v-if="result.deliveryRatioData.deliveryRatio > 30"
                    >
                      <strong>배달로 더 많이 이용하고 있어요!</strong>
                    </template>
                    <template
                      v-else-if="result.deliveryRatioData.deliveryRatio < 30"
                    >
                      <strong>매장을 더 많이 이용하고 있어요!</strong>
                    </template>
                    <template v-else>
                      <strong>매장과 배달을 비슷하게 이용하고 있어요!</strong>
                    </template>
                  </h3>
                </header>
                <div class="section-content">
                  <div class="card p-5 shadow-sm">
                    <div data-aos="fade-in" data-aos-duration="1000">
                      <div class="chart-container chart-horizontal-stacked">
                        <div class="chart-bars">
                          <div
                            class="chart-bar chart-bar-restaurant"
                            :style="{
                              width:
                                result.deliveryRatioData.restaurantRatio + '%',
                            }"
                          >
                            <span class="bar-label">매장</span>
                            <div class="bar-stack">
                              <span class="bar-percent"
                                >{{
                                  result.deliveryRatioData.restaurantRatio
                                }}%</span
                              >
                            </div>
                          </div>
                          <div
                            class="chart-bar chart-bar-delivery"
                            :style="{
                              width:
                                result.deliveryRatioData.deliveryRatio + '%',
                            }"
                          >
                            <span class="bar-label">배달</span>
                            <div class="bar-stack">
                              <span class="bar-percent"
                                >{{
                                  result.deliveryRatioData.deliveryRatio
                                }}%</span
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="txt-box mt-3">
                        <p class="info-tip txt-tiny">
                          <span class="icon-tip">TIP</span>
                          <span>
                            <template
                              v-if="result.fnbOwnerStatus === 'NEW_FNB_OWNER'"
                            >
                              창업 아이템으로
                              <strong>
                                <template
                                  v-if="
                                    result.deliveryRatioData.deliveryRatio > 30
                                  "
                                >
                                  위험이 낮은 공유주방
                                </template>
                                <template
                                  v-else-if="
                                    result.deliveryRatioData.deliveryRatio < 30
                                  "
                                >
                                  매장이 있는 공유주방
                                </template>
                                <template v-else>
                                  유동인구가 많은 상가에서
                                </template>
                              </strong>
                              창업을 추천드립니다.
                            </template>
                            <template v-else>
                              창업 아이템을
                              <strong>
                                <template
                                  v-if="
                                    result.deliveryRatioData.deliveryRatio > 30
                                  "
                                >
                                  배달 판매하여
                                </template>
                                <template
                                  v-else-if="
                                    result.deliveryRatioData.deliveryRatio < 30
                                  "
                                >
                                  매장에 추가하여
                                </template>
                                <template v-else>
                                  배달 또는 메뉴 추가로
                                </template>
                              </strong>
                              매출을 올릴 수 있습니다.
                            </template>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </b-col>
          <b-col cols="12" lg="6">
            <template v-if="result.fnbOwnerStatus === 'NEW_FNB_OWNER'">
              <!-- 신규 창업자 -->
              <section class="article-section section03 pt-0">
                <div>
                  <header class="section-header">
                    <h3>
                      추천 아이템은
                      <br />
                      <strong>전 분기보다 매출이 올라가고 있어요!</strong>
                    </h3>
                  </header>
                  <div class="section-content">
                    <div class="card p-5 shadow-sm">
                      <div data-aos="fade-in" data-aos-duration="1000">
                        <div class="chart-container chart-vertical-arrow">
                          <div class="chart-bars">
                            <div
                              class="chart-bar "
                              :class="{
                                'bar-rank-max':
                                  maxRevenue ===
                                  Math.abs(
                                    item.estimatedIncreasedRevenuePercentage,
                                  ),
                                'bar-rank-min':
                                  minRevenue ===
                                  Math.abs(
                                    item.estimatedIncreasedRevenuePercentage,
                                  ),
                              }"
                              v-for="(item, index) in result.rankDataWCScore"
                              :key="index"
                              :style="{
                                height:
                                  (Math.abs(
                                    item.estimatedIncreasedRevenuePercentage,
                                  ) /
                                    maxRevenue) *
                                    100 +
                                  '%',
                              }"
                            >
                              <div class="bar-stack">
                                <span class="bar-percent"
                                  >+{{
                                    Math.abs(
                                      item.estimatedIncreasedRevenuePercentage,
                                    ).toFixed(0)
                                  }}%
                                </span>
                              </div>
                            </div>
                          </div>
                          <div class="chart-labels">
                            <span
                              class="chart-label"
                              v-for="(item, index) in result.rankDataWCScore"
                              :key="index"
                            >
                              {{ item.pickcookSmallCategoryInfo.pkMenuName }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </template>
            <template v-else>
              <!-- 기창업자 -->
              <section class="article-section section03 pt-0">
                <div>
                  <header class="section-header">
                    <h3>
                      추천 아이템으로 <br />
                      <strong>추가 매출을 올릴 수 있어요!</strong>
                    </h3>
                  </header>
                  <div class="section-content">
                    <div class="card px-2 shadow-sm">
                      <p class="px-4">
                        월 예상 최소 매출액
                      </p>
                      <div class="odometer-container my-1">
                        <div class="d-block d-lg-none">
                          <div class="odometer-box ">
                            <span class="odometer-count">
                              <vue-odometer :value="revenueCount">
                              </vue-odometer>
                            </span>
                            <span class="odometer-unit">원</span>
                          </div>
                        </div>
                        <div class="d-none d-lg-block">
                          <div class="odometer-box">
                            <span class="odometer-count">
                              <vue-odometer :value="revenueCount2">
                              </vue-odometer>
                            </span>
                            <span class="odometer-unit">원</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </template>
          </b-col>
        </b-row>
        <section class="article-section section04 pt-0">
          <div>
            <header class="section-header">
              <h3>
                픽쿡플래너를 만나서
                <br class="d-block d-lg-none" />
                <strong>상권 분석을 무료로 받아보세요!</strong>
              </h3>
            </header>
            <div class="section-content">
              <div class="card shadow-sm">
                <div class="report-container">
                  <div
                    class="report"
                    :class="`report0${n}`"
                    v-for="n in 3"
                    :key="n"
                  >
                    <img
                      data-aos="fade-up"
                      :data-aos-duration="500 * (1 * (4 - n))"
                      :data-aos-delay="300 * (1 * (4 - n))"
                      :src="
                        `https://kr.object.ncloudstorage.com/common-nanuda/images/report_img_0${n}.png`
                      "
                      :alt="`상권분석 리포트 ${n}`"
                    />
                  </div>
                </div>
                <div
                  class="txt-box txt-md-center"
                  data-aos="fade-up"
                  data-aos-duration="2000"
                >
                  <p>
                    상권의 고객 정보부터 시간에 따른 매출변화까지
                    <br class="d-none d-md-block" />
                    어려운 데이터를 한눈에 쉽게 알 수 있어요!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section class="article-section" ref="bottomForm" id="bottom-form">
        <div class="container">
          <!-- 폼 영역 -->
          <header class="section-header">
            <h3 class="txt-center">
              <strong class="txt-big ">
                <span class="txt-bold">
                  픽쿡플래너와 함께 <br class="d-block d-lg-none" />
                  확실한 아이템으로 창업하세요!
                </span>
              </strong>
            </h3>
          </header>
          <div class="section-content mt-8">
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
                    variant="primary"
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
                  <b-btn
                    variant="primary"
                    size="md"
                    @click="checkSMSCode"
                    :disabled="isVerified"
                    >{{ isVerified ? '인증완료' : '인증하기' }}</b-btn
                  >
                </b-col>
              </b-form-row>
              <div class="txt-box" v-if="errorText">
                <p>{{ errorText }}</p>
              </div>
              <div class="mt-6">
                <b-btn
                  variant="primary"
                  block
                  size="xl"
                  :disabled="isConsultBtnDisabled"
                  @click="onConsultBtnClicked"
                >
                  <span>신청하기</span>
                </b-btn>
              </div>
            </div>
          </div>
          <!-- // 폼 영역 -->
        </div>
      </section>
    </div>
    <!-- sticky 폼 -->
    <transition name="slideInUp">
      <div
        id="sticky-form"
        v-if="!isFormVisible"
        :class="{ 'is-open': isToggleForm }"
      >
        <div class="btn-toggle-form" @click="isToggleForm = !isToggleForm">
          <span class="btn-txt">상담 신청하기</span>
          <span class="icon"><BaseArrow /></span>
        </div>
        <div class="form-container" v-if="isToggleForm">
          <div class="container">
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
                  variant="white"
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
                <b-btn
                  variant="white"
                  size="md"
                  @click="checkSMSCode"
                  :disabled="isVerified"
                  >{{ isVerified ? '인증완료' : '인증하기' }}</b-btn
                >
              </b-col>
            </b-form-row>
            <div class="txt-box" v-if="errorText">
              <p>{{ errorText }}</p>
            </div>
            <div class="btn-box mt-6">
              <b-btn
                variant="white"
                block
                size="lg"
                :disabled="isConsultBtnDisabled"
                @click="onConsultBtnClicked"
              >
                <span>신청하기</span>
              </b-btn>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </article>
  <!-- 로딩-->
  <article class="main-article" v-else>
    <Loading />
  </article>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Prop } from 'vue-property-decorator';
import ResultRevenueChart from '@/modules/_components/charts/ResultRevenueChart.vue';
import FoodCategoryRatioChart from '@/modules/_components/charts/FoodCategoryRatioChart.vue';
import {
  ConsultRequestDto,
  ResultRequestDto,
  ResultResponseDto,
} from '@/dto/question';
import authService from '@/services/auth.service';
// import toast from '../../../resources/assets/js/services/toast.js';
import questionService from '@/services/question.service';
import { AggregateResultResponse } from '@/dto/question/aggregate-result-response.dto';
import { SmsAuthNotificationDto } from '@/dto';
import { ProformaResponseDto } from '@/dto/question/proforma-response.dto';
import debounce from 'lodash/debounce';
import Loading from './Loading.vue';

@Component({
  name: 'Solution',
  components: { ResultRevenueChart, FoodCategoryRatioChart, Loading },
})
export default class Solution extends BaseComponent {
  [x: string]: any;
  $refs!: {
    tagRef: HTMLFormElement;
    revenueWrapper: HTMLFormElement;
    bottomForm: HTMLFormElement;
  };
  @Prop() readonly resultRequestDto: ResultRequestDto;
  // private result: ProformaResponseDto = null;
  // private resultRequestDto: any = null;
  private result: any = null;
  private consultRequestDto = new ConsultRequestDto();
  private isVerified = false;
  private errorText = '';
  private isSMSCodeSent = false;
  private isGetCodeBtnDisabled = false;
  private time = 30;
  private smsAuthNotificationDto = new SmsAuthNotificationDto();

  private revenueCount = 0;
  private revenueCount2 = 0;
  private isToggleForm = false;
  private isFormVisible = false;
  private isTooltipVislble = false;

  toggleId(index: number) {
    return 'item0' + index;
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

  get maxRevenueValue() {
    const arr = this.result.rankDataWCScore.map(
      (e: { estimatedHighestRevenue: number }) => {
        return Math.abs(e.estimatedHighestRevenue);
      },
    );
    return Math.max(...arr);
  }

  // get max revenue
  get maxRevenue() {
    const arr = this.result.rankDataWCScore.map(
      (e: { estimatedIncreasedRevenuePercentage: number }) => {
        return Math.abs(e.estimatedIncreasedRevenuePercentage);
      },
    );
    return Math.max(...arr);
  }

  // get min revenue
  get minRevenue() {
    const arr = this.result.rankDataWCScore.map(
      (e: { estimatedIncreasedRevenuePercentage: number }) => {
        return Math.abs(e.estimatedIncreasedRevenuePercentage);
      },
    );
    return Math.min(...arr);
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
          '인증번호가 올바르지 않거나 유효기간이 초과했습니다',
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
        // send pixel event
        this.$analytics.fbq.event('SubmitApplication');
        this.$gtag.event('complete_application', {
          description: '신청 완료',
        });
        this.$emit('next');
      }
    });
  }

  revenueCountUp() {
    const target = this.$refs.revenueWrapper;
    if (target) {
      const rect = target.getBoundingClientRect().top;
      const winHeight = window.outerHeight;
      if (rect < winHeight / 2) {
        this.revenueCount = this.maxRevenueValue;
      }
    }
  }

  stickyFormVisible() {
    const target = this.$refs.bottomForm;
    if (target) {
      const rect = target.getBoundingClientRect().top;
      const winHeight = window.outerHeight;
      if (rect < winHeight - target.offsetHeight) {
        this.isFormVisible = true;
      } else {
        this.isFormVisible = false;
      }
    }
  }

  // scroll event
  handleScroll() {
    this.revenueCountUp();
    this.stickyFormVisible();
  }

  created() {
    questionService.getResult(this.resultRequestDto).subscribe(res => {
      if (res) {
        this.$gtag.event(`proforma_result_seen_${res.data.id}`);
        this.result = res.data;
      }
    });
    setTimeout(() => {
      this.revenueCount2 = this.maxRevenueValue;
    }, 1000);
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

#bottom-form {
  .form-container {
    label {
      color: $primary;
      font-weight: $txt-bold;
    }
    .form-control {
      background-color: transparent;
      border-color: $primary;
    }
  }
}

#sticky-form {
  background-color: $black;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  border-top-left-radius: $border-radius-lg;
  border-top-right-radius: $border-radius-lg;
  overflow: hidden;
  &.is-open {
    .btn-toggle-form {
      .icon {
        transform: rotate(0);
      }
    }
  }
  .btn-toggle-form {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 5em;
    .btn-txt {
      font-size: 2.4rem;
      font-weight: $txt-bolder;
      color: $white;
      margin-right: 0.5em;
    }
    .icon {
      transform: rotate(180deg);
      svg {
        fill: $white;
      }
    }
  }
  .form-container {
    padding: 0 0 1.25em;
    label {
      color: $white;
    }
    .form-control {
      background: transparent;
      color: #fff;
    }
  }
}
.info-tip {
  .icon-tip {
    float: left;
    display: inline-flex;
    width: 3em;
    height: 3em;
    align-items: center;
    justify-content: center;
    background-color: $primary;
    border-radius: 50%;
    color: $white;
    font-size: 0.625em;
    margin-right: 1em;
    + * {
      display: block;
      margin-top: 1em;
      padding-top: 0.125em;
      overflow: hidden;
    }
  }
}

.icon-toggle-arrow {
  display: inline-flex;
  width: 1em;
  height: 1em;
  align-items: center;
  justify-content: center;
  background-color: $primary;
  border-radius: 50%;
  color: $white;
  font-weight: bold;
  svg {
    transform: scale(0.65);
  }
}
.report-container {
  display: flex;
  align-items: center;
  max-width: 24em;
  margin: 0 auto;

  .report {
    position: relative;

    img {
      display: block;
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
    }

    &.report01 {
      z-index: 3;
      margin-right: -4em;
    }

    &.report02 {
      margin-top: 2.5em;
      z-index: 2;
    }

    &.report03 {
      margin-top: 0.5em;
      margin-left: -4em;
      z-index: 1;
    }
  }
}
#question-solution {
  padding-bottom: 0 !important;
  .article-header {
    padding: 2em 0;
    background-color: $primary;
    color: $white;
    .container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    h2 {
      font-size: $txt-medium;
      font-weight: $txt-bold;
    }
    p {
      font-size: $h5;
      text-align: right;
      font-weight: $txt-bold;
    }
  }
  .article-section {
    padding: 3.125em 0;
    .section-header {
      text-align: left;
      h3 {
        font-size: $h5;
        color: $primary;
        font-weight: 300;
        line-height: 1.4;
        strong {
          font-weight: 700;
        }
      }
      + .section-content {
        margin-top: 1.125em;
      }
    }

    .card {
      position: relative;
      border-radius: $border-radius-lg;
      padding: 1.25em 1.5em;
      z-index: 1;
      .card-img-left {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 5.625em;
        height: 5.625em;
        background-color: $light;
        border-radius: $border-radius;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .card-body {
        position: relative;
        width: calc(100% - 4.75em);
        padding: 0;
        margin-left: 1.25em;
        .card-badge {
          margin-bottom: 0.7em;
          font-size: $txt-mini;
          .badge {
            margin-bottom: 0.4em;
            + .badge {
              margin-left: 0.4em;
            }
          }
        }
        .card-title {
          font-size: 2.8rem;
          font-weight: $txt-bolder;
          line-height: 1;
          color: $gray;
          margin-bottom: 0.5em;
        }
        .card-text {
          font-size: $txt-medium;
          font-weight: $txt-normal;
          line-height: 1;
          strong {
            font-weight: $txt-bold;
            font-family: 'YoonGothic', sans-serif;
          }
        }
        .btn-toggle {
          position: absolute;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          color: #b1b1b1;
          line-height: 1;
          .icon-toggle-arrow {
            margin-left: 0.25em;
          }
        }
      }
    }
    .card-collapse {
      position: relative;
      top: -1.25em;
      .card-desc {
        position: relative;
        background-color: $white;
        border-bottom-left-radius: $border-radius-lg;
        border-bottom-right-radius: $border-radius-lg;
        overflow: hidden;
        box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.075);
        padding: 2.5em 1.5em 1.25em;
        min-height: 7em;
      }
    }

    &.section01 {
      .section-content {
        > .row {
          margin-top: -0.5em;
          margin-bottom: -0.5em;
        }
      }
    }
  }
}

.shadow-sm {
  box-shadow: 0.125rem 0.25rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

// chart
.chart-container {
  position: relative;

  &.chart-horizontal-stacked {
    .chart-bars {
      display: flex;
      // flex-wrap: wrap;
      width: 100%;
    }
    .chart-bar {
      position: relative;
      width: 50%;
      min-width: 10%;
      &.chart-bar-restaurant {
        .bar-label {
          text-align: left;
        }
        .bar-stack {
          border-top-left-radius: $border-radius;
          border-bottom-left-radius: $border-radius;
          text-align: left;
          padding-right: 0.5em;
          &:before {
            left: 0;
            background-color: $primary;
          }
        }
      }
      &.chart-bar-delivery {
        .bar-label {
          text-align: right;
        }
        .bar-stack {
          border-top-right-radius: $border-radius;
          border-bottom-right-radius: $border-radius;
          text-align: right;
          padding-left: 0.5em;
          &:before {
            background-color: $lightblue;
            right: 0;
          }
        }
      }
      .bar-label {
        display: block;
        font-weight: $txt-bold;
        color: $secondary;
        margin-bottom: 0.5em;
        white-space: nowrap;
      }
      .bar-stack {
        position: relative;
        height: 3em;
        line-height: 3em;
        padding: 0em 1em;
        overflow: hidden;
        &:before {
          display: block;
          position: absolute;
          top: 0;
          content: '';
          width: 0%;
          height: 100%;
          transition: width 1s ease 0.5s;
        }
      }
      .bar-percent {
        position: relative;
        z-index: 2;
        color: #fff;
        font-size: 1.5rem;
        font-weight: $txt-bold;
        white-space: nowrap;
      }
    }
  }

  &.chart-vertical-arrow {
    width: 16.25em;
    margin: 0 auto;
    .chart-bars {
      display: flex;
      align-items: flex-end;
      justify-content: space-around;
      border-bottom: 1px solid $gray;
      height: 7em;
    }
    .chart-bar {
      position: relative;
      width: 1em;
      margin: 0 auto;

      &.bar-rank-max {
        .bar-stack {
          background-color: $primary;
          border-color: $primary;
          .bar-percent {
            color: $primary;
          }
        }
      }
      &.bar-rank-min {
        .bar-stack {
          background-color: $lightblue;
          border-color: $lightblue;
          .bar-percent {
            color: $lightblue;
          }
        }
      }

      .bar-stack {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        margin-top: 3em;
        width: 100%;
        height: 0%;
        background-color: $blue;
        border-color: $blue;
        transition: height 1s ease 0.5s;
        &:before {
          position: absolute;
          left: 50%;
          top: -2em;
          display: block;
          content: '';
          width: 0px;
          height: 0px;
          border-width: 1em;
          border-style: solid;
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
          border-bottom-color: inherit;
          margin-left: -1em;
        }
        .bar-percent {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 100%;
          margin-bottom: 1.25em;
          font-size: 2rem;
          font-weight: $txt-bold;
          line-height: 1;
          color: inherit;
          color: $blue;
        }
      }
    }
    .chart-labels {
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      margin-top: 0.5em;
      .chart-label {
        flex: 1;
        text-align: center;
        font-size: 1.2rem;
      }
    }
  }
}

// chart animated
.aos-animate {
  .chart-horizontal-stacked .bar-stack {
    &:before {
      width: 100% !important;
    }
  }

  .chart-vertical-arrow {
    .bar-stack {
      height: calc(100% - 3em) !important;
    }
  }
}

// odometer
.odometer-container {
  text-align: center;
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: center;
  .odometer-box {
    display: inline-flex;
    align-items: baseline;
    .odometer-count {
      font-size: 4.4rem;
      font-weight: $txt-bolder;
      line-height: 1;
      color: $primary;
      * {
        font-family: 'Gotham', sans-serif !important;
        min-width: 0.68em;
      }
    }
    .odometer-unit {
      font-size: 2.8rem;
      color: $secondary;
      margin-left: 0.5em;
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
    display: block;
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

@media screen and (min-width: 992px) {
  #question-solution {
    .article-section {
      .section-header {
        h3 {
          text-align: center;
        }
      }
      .card {
        .card-img-left {
          width: auto;
          height: 8.5em;
        }
        .card-body {
          width: auto;
          margin: 1em 0 0;
        }
      }
    }
  }
}
.tooltip-container {
  position: relative;

  .tooltip-content {
    position: absolute;
    right: 0;
    bottom: 100%;
    margin-bottom: 0.5em;
    background: rgb(213 213 213 / 95%);
    color: #707070;
    padding: 0.5em 1em;
    border-radius: 0.5rem;
    text-align: left;
    z-index: 2;
    &:before {
      display: block;
      content: '';
      position: absolute;
      right: 1em;
      top: 100%;
      width: 0;
      height: 0;
      border-width: 0.5em;
      border-style: solid;
      border-top-color: rgb(213 213 213 / 95%);
      border-left-color: transparent;
      border-right-color: transparent;
      border-bottom-color: transparent;
    }
  }
}
</style>
