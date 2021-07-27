<template>
  <div id="new-fnb-owner">
    <b-row no-gutters>
      <b-col cols="12" xl="12">
        <section
          class="article-section bg-light pb-0"
          id="section-item"
          ref="section01"
        >
          <header class="section-header">
            <div class="container">
              <h3>
                아이템이 없어도<strong class="txt-ok"
                  ><b-img-lazy
                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/txt_ok.svg"
                    alt="OK"
                    data-aos="zoom-out"
                    data-duration="500"
                    data-delay="1000"
                /></strong>
              </h3>
              <p>
                창업 지역의 빅데이터를 분석하여<br />
                확실한 창업 아이템을 추천합니다.
              </p>
            </div>
          </header>
          <div class="section-content bg-white">
            <div class="bg-light">
              <div class="container">
                <div class="mockup-container">
                  <div class="app-hedader" :class="`step-${currentIdx}`">
                    <span class="app-logo"
                      ><img
                        src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/logo_w.svg"
                    /></span>
                    <span class="app-prev">
                      <img
                        src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_btn_prev.png"
                      />
                    </span>
                    <div class="app-process-bar">
                      <span class="bars"></span>
                    </div>
                  </div>
                  <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide class="slide01">
                      <div class="app-container">
                        <div class="question-title">
                          <img
                            src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_question_txt.png"
                            alt=""
                          />
                        </div>
                        <div class="sido-list">
                          <ul class="row no-gutters">
                            <li v-for="n in 5" :key="n" class="col-6">
                              <div
                                :class="`sido-item sido-item-0${n}`"
                                :style="{
                                  'animation-delay': `${n * 0.2}s`,
                                }"
                              >
                                <img
                                  :src="
                                    `https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_sido_0${n}.png`
                                  "
                                  alt=""
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div class="cursor-point">
                          <img
                            src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_cursor_point.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="slide02">
                      <div class="app-container">
                        <div class="app-loading">
                          <div class="app-loading-spinner">
                            <img
                              src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_loading_spinner02.png"
                              alt=""
                            />
                          </div>
                        </div>
                        <div class="app-loading-txt">
                          <img
                            src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_loading_txt.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </swiper-slide>
                    <swiper-slide class="slide03">
                      <div class="result-header">
                        <img
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_result_header.png"
                          alt=""
                        />
                      </div>
                      <div class="app-container">
                        <div class="menu-item-list">
                          <div class="menu-item"></div>
                        </div>
                      </div>
                    </swiper-slide>
                  </swiper>
                  <div class="phone-mockup01"></div>
                </div>
              </div>
            </div>
            <div>
              <div class="shadow-sm py-8">
                <div class="container">
                  <div class="txt-center">
                    <div class="title-box">
                      <h4 class="txt-black">
                        확실한 창업 아이템 <br />어떻게 추천될까요?
                      </h4>
                    </div>
                    <div class="btn-box mt-8">
                      <div class="d-block d-xl-none">
                        <b-btn
                          size="md"
                          variant="outline-blue"
                          block
                          v-b-toggle.analysis-detail
                          @click="onClickAnalysisDetail()"
                          class="btn-toggle"
                          :class="{ 'is-active': isChartVisible }"
                        >
                          <span>{{
                            !isChartVisible ? '확인하기' : '접기'
                          }}</span>
                          <span class="icon icon-lightblue"><BaseArrow /></span>
                        </b-btn>
                      </div>
                      <div class="d-none d-xl-block">
                        <b-btn
                          size="md"
                          variant="outline-blue"
                          block
                          v-b-modal.analysis-detail
                          @click="onClickAnalysisDetail()"
                        >
                          <span>확인하기</span>
                        </b-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <b-collapse class="py-8" id="analysis-detail">
                <div class="container">
                  <div class="chart-container">
                    <div style="position:relative; padding-bottom:100%">
                      <transition name="fadeIn">
                        <RadarChart
                          :chartData="chartData"
                          v-if="isChartVisible"
                          ref="radarChart"
                          style="position:absolute; left:0; top:0; width:100%; height:100%;"
                        />
                      </transition>
                    </div>
                  </div>
                  <div class="txt-box txt-center txt-black">
                    <div class="row-box">
                      <p>
                        빅데이터 상권지수와 조리경험, 운영경험, <br />
                        창업자금을 종합하여 체계적으로 분석합니다.
                      </p>
                    </div>
                    <div class="row-box mt-7">
                      <p class="border px-4 py-2 rounded">
                        결과에 대한 분석은 상담을 통해 확인하세요.
                      </p>
                    </div>
                  </div>
                </div>
              </b-collapse>
            </div>
          </div>
        </section>
      </b-col>
      <b-col cols="12" xl="12">
        <section class="article-section bg-light pb-0" id="section-recipe">
          <header class="section-header">
            <div class="container">
              <h3>
                조리경험이 없어도<strong class="txt-ok"
                  ><b-img-lazy
                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/txt_ok.svg"
                    alt="OK"
                    data-aos="zoom-out"
                    data-duration="500"
                    data-delay="1000"
                /></strong>
              </h3>
              <p>
                알바도 조리 가능한 초간편 레시피를 <br />
                1:1교육, 방문교육으로 꼼꼼하게 교육합니다.
              </p>
            </div>
          </header>
          <div class="section-content">
            <div
              class="img-box"
              style="background:url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_recipe.jpg') no-repeat center center; background-size:cover;"
            ></div>
          </div>
        </section>
      </b-col>
      <b-col cols="12" xl="12">
        <section
          class="article-section pb-0"
          id="section-operation"
          ref="section03"
        >
          <header class="section-header">
            <div class="container">
              <h3>
                운영경험이 없어도<strong class="txt-ok"
                  ><b-img-lazy
                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/txt_ok.svg"
                    alt="OK"
                    data-aos="zoom-out"
                    data-duration="500"
                    data-delay="1000"
                /></strong>
              </h3>
              <p>
                초보 창업자도 손쉽게 운영할 수 있도록 <br />
                철저하게 교육해 드립니다.
              </p>
            </div>
          </header>
          <div class="section-content">
            <b-tabs>
              <b-tab title="배달앱 등록" active>
                <div class="app-register-container">
                  <div class="container">
                    <div class="mockup-container">
                      <div class="phone-mockup02">
                        <div class="app-container">
                          <div class="app-list">
                            <div class="row-box">
                              <div class="app-img">
                                <img
                                  src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_app_coupang.png"
                                  alt="쿠팡앱"
                                />
                              </div>
                            </div>
                            <div class="row-box">
                              <div class="app-img app-baemin">
                                <img
                                  src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_app_baemin.png"
                                  alt="배민앱"
                                />
                              </div>
                            </div>
                            <div class="row-box">
                              <div class="app-img">
                                <img
                                  src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_app_yogiyo.png"
                                  alt="요기요앱"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="app-intro">
                            <div class="app-title">
                              <img
                                src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_intro_title.png"
                                alt="배달의민족"
                              />
                            </div>
                            <div class="app-bottom-logo">
                              <img
                                src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_woowahan.png"
                                alt="우하한 형제들"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="hand-container">
                      <div class="hand"></div>
                    </div>
                  </div>
                </div>
                <div class="bg-white txt-center py-12 mt-8 speech-bubble-box">
                  <p>
                    배달의민족, 쿠팡이츠, 요기요 등<br />
                    다양한 채널의 등록방법을 교육합니다.
                  </p>
                </div>
              </b-tab>
              <b-tab title="배달앱 관리">
                <div class="container">
                  <div class="app-ad-container">
                    <div class="mockup-container">
                      <div class="phone-mockup02">
                        <div class="add-setting-container"></div>
                      </div>
                      <div class="app-img app-coupang">
                        <img
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_app_coupang.png"
                          alt="쿠팡앱"
                        />
                      </div>
                      <div class="app-img app-baemin">
                        <img
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_app_baemin.png"
                          alt="배민앱"
                        />
                      </div>
                      <div class="app-img app-yogiyo">
                        <img
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_app_yogiyo.png"
                          alt="요기요앱"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-white txt-center py-12 mt-8 speech-bubble-box">
                  <p>
                    배달의민족 광고관리, 리뷰이벤트, <br />
                    댓글 등 관리방법을 교육합니다.
                  </p>
                </div>
              </b-tab>
              <b-tab title="매출 컨설팅">
                <div class="container">
                  <div class="report-container">
                    <div class="report-sample">
                      <img
                        src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_report_sample.png"
                        alt="분석 보고서 샘플"
                      />
                    </div>
                  </div>
                </div>
                <div class="bg-white txt-center py-12 mt-8 speech-bubble-box">
                  <p>
                    상권의 분기별로 분석하여 <br />
                    매출을 올릴 수 있도록 도와드립니다.
                  </p>
                </div>
              </b-tab>
              <b-tab title="홍보물 제공">
                <div class="container">
                  <div class="banner-container">
                    <div class="banner-sample">
                      <img
                        src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_banner_sample.png"
                        alt="출력물 샘플"
                      />
                    </div>
                  </div>
                </div>
                <div class="bg-white txt-center py-12 mt-8 speech-bubble-box">
                  <p>
                    가게 운영과 배달의 필요한 홍보물들을 <br />
                    바로 이용할 수 있도록 제공합니다.
                  </p>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </section>
      </b-col>
      <b-col cols="12" xl="12">
        <section class="article-section bg-light pb-0">
          <header class="section-header">
            <h3>
              공간이 없어도<strong class="txt-ok"
                ><b-img-lazy
                  src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/txt_ok.svg"
                  alt="OK"
                  data-aos="zoom-out"
                  data-duration="500"
                  data-delay="1000"
              /></strong>
            </h3>
            <p>
              핵심 상권의 공유주방을 추천하고,<br />
              다양한 입점 혜택을 제공합니다.
            </p>
          </header>
          <div class="section-content">
            <div class="delivery-kitchen-container">
              <swiper :options="swiperKitchen">
                <swiper-slide v-for="n in 3" :key="n">
                  <div class="img-mask">
                    <img
                      :src="
                        `
                          https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_delivery_kitchen0${n}.png`
                      "
                    />
                  </div>
                </swiper-slide>
              </swiper>
            </div>
            <div class="py-10">
              <div class="container">
                <div class="txt-center">
                  <div class="title-box">
                    <h4 class="txt-black">
                      공유주방에 입점하면
                      <br />어떤 혜택을 받을 수 있을까요?
                    </h4>
                  </div>
                  <div class="btn-box mt-8">
                    <div class="d-block d-xl-none">
                      <b-btn
                        size="md"
                        variant="outline-blue"
                        block
                        @click="onClickKitchenDetail()"
                        v-b-toggle.kitchen-detail
                        class="btn-toggle"
                        :class="{ 'is-active': isKitchenVisible }"
                      >
                        <span>{{
                          !isKitchenVisible ? '확인하기' : '접기'
                        }}</span>
                        <span class="icon icon-lightblue"><BaseArrow /></span>
                      </b-btn>
                    </div>
                    <div class="d-none d-xl-block">
                      <b-btn
                        size="md"
                        variant="outline-blue"
                        block
                        v-b-modal.kitchen-detail
                      >
                        <span>확인하기</span>
                      </b-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <b-collapse class="py-10 bg-darknavy" id="kitchen-detail">
              <div class="container">
                <div class="price-container">
                  <div class="row-box">
                    <div class="txt-center txt-lightblue">
                      <h4 class="txt-small txt-white txt-bold">
                        공유주방 보증금
                      </h4>
                      <p class="line-height-1 mt-2 txt-massive">
                        <strong
                          class="yoongothic txt-giant txt-bolder line-height-1"
                          style="vertical-align: baseline;"
                          data-aos="zoom-out"
                          >0</strong
                        >원
                      </p>
                    </div>
                  </div>
                  <div class="row-box pt-6 mt-6 border-top">
                    <div class="row">
                      <div class="col-6 txt-center txt-lightblue">
                        <h4 class="txt-small txt-white txt-bold">
                          임대료
                        </h4>
                        <p class="line-height-1 mt-2 txt-massive">
                          <span class="txt-tiny mr-1">최대</span>
                          <strong
                            class="yoongothic txt-bolder"
                            data-aos="zoom-out"
                            >3</strong
                          >개월
                        </p>
                        <span class="d-block mt-2 txt-tiny">무료</span>
                      </div>
                      <div class="col-6 txt-center txt-lightblue border-left">
                        <h4 class="txt-small txt-white txt-bold">
                          창업지원금
                        </h4>
                        <p class="line-height-1 mt-2 txt-massive">
                          <strong
                            class="yoongothic txt-bolder"
                            data-aos="zoom-out"
                            >50</strong
                          >만원
                        </p>
                        <span class="d-block mt-2 txt-tiny">지원</span>
                      </div>
                    </div>
                  </div>
                  <div class="row-box mt-6 txt-center">
                    <p class="txt-white">
                      비싼 보증금, 부담스러운 계약기간 <br />
                      인테리어 비용 등의 리스크를 최소화하여<br />
                      빠르게 배달창업을 시작할 수 있어요!
                    </p>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </section>
      </b-col>
    </b-row>
    <!-- 차트 분석 pc 모달 -->
    <b-modal
      id="analysis-detail"
      title="창업 아이템 추천"
      hide-footer
      @hide="isChartVisible = !isChartVisible"
    >
      <div class="px-4">
        <RadarChart :chartData="chartData" v-if="isChartVisible"></RadarChart>
      </div>
      <div class="txt-box txt-center txt-black">
        <div class="row-box">
          <p>
            빅데이터 상권지수와 조리경험, 운영경험, <br />
            창업자금을 종합하여 체계적으로 분석합니다.
          </p>
        </div>
        <div class="row-box mt-7">
          <p class="border px-4 py-2 rounded">
            결과에 대한 분석은 상담을 통해 확인하세요.
          </p>
        </div>
      </div>
    </b-modal>
    <!-- 공유주방 정보 pc 모달 -->
    <b-modal id="kitchen-detail" title="공유주방 혜택" hide-footer>
      <div class="py-10 bg-darknavy">
        <div class="container">
          <div class="price-container">
            <div class="row-box">
              <div class="txt-center txt-lightblue">
                <h4 class="txt-small txt-white txt-bold">
                  공유주방 보증금
                </h4>
                <p class="line-height-1 mt-2 txt-massive">
                  <strong
                    class="yoongothic txt-giant txt-bolder line-height-1"
                    style="vertical-align: baseline;"
                    data-aos="zoom-out"
                    >0</strong
                  >원
                </p>
              </div>
            </div>
            <div class="row-box pt-6 mt-6 border-top">
              <div class="row">
                <div class="col-6 txt-center txt-lightblue">
                  <h4 class="txt-small txt-white txt-bold">임대료</h4>
                  <p class="line-height-1 mt-2 txt-massive">
                    <span class="txt-tiny mr-1">최대</span>
                    <strong class="yoongothic txt-bolder" data-aos="zoom-out"
                      >3</strong
                    >개월
                  </p>
                  <span class="d-block mt-2 txt-tiny">무료</span>
                </div>
                <div class="col-6 txt-center txt-lightblue border-left">
                  <h4 class="txt-small txt-white txt-bold">
                    창업지원금
                  </h4>
                  <p class="line-height-1 mt-2 txt-massive">
                    <strong class="yoongothic txt-bolder" data-aos="zoom-out"
                      >50</strong
                    >만원
                  </p>
                  <span class="d-block mt-2 txt-tiny">지원</span>
                </div>
              </div>
            </div>
            <div class="row-box mt-6 txt-center">
              <p class="txt-white">
                비싼 보증금, 부담스러운 계약기간 <br />
                인테리어 비용 등의 리스크를 최소화하여<br />
                빠르게 배달창업을 시작할 수 있어요!
              </p>
            </div>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import Register from '../Register.vue';
import RadarChart from '../../_components/charts/RadarChart.vue';

@Component({
  name: 'NewFnbOwner',
  components: {
    RadarChart,
  },
})
export default class NewFnbOwner extends BaseComponent {
  $refs!: {
    section01: HTMLFormElement;
    section03: HTMLFormElement;
    radarChart: HTMLCanvasElement;
    mySwiper: HTMLFormElement;
  };

  private chartIndex = 0;
  private chartArray: any[] = [
    {
      borderColor: 'rgba(11,83,141,1)',
      backgroundColor: 'rgba(11,83,141,0.25)',
      data: [40, 60, 80, 60, 70],
    },
    {
      borderColor: 'rgba(11,83,141,1)',
      backgroundColor: 'rgba(11,83,141,0.25)',
      data: [50, 30, 40, 90, 30],
    },
    {
      borderColor: 'rgba(11,83,141,1)',
      backgroundColor: 'rgba(11,83,141,0.25)',
      data: [20, 70, 50, 30, 80],
    },
  ];
  private chartArrayData = this.chartArray[0];

  get chartData() {
    return {
      datasets: [this.chartArray[this.chartIndex]],
      labels: [
        '빅데이터 상권지수',
        '구매력',
        '창업비용',
        '조리경험',
        '운영경험',
      ],
    };
  }

  private isChartVisible = false;

  private currentIdx = 0;
  private swiperOption: any = {
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    slidesPerView: 1,
    loop: true,
    grabCursor: false,
    allowTouchMove: false,
    speed: 1000,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
  };

  private isKitchenVisible = false;
  private swiperKitchen: any = {
    slidesPerView: 'auto',
    loop: true,
    grabCursor: false,
    allowTouchMove: false,
    speed: 1000,
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
  };

  get swiper() {
    return this.$refs.mySwiper.$swiper;
  }

  onSwipe(varuable: any) {
    let idx = varuable.swiper.activeIndex - 1;
    if (idx > 2) {
      idx = 0;
    }
    return (this.currentIdx = idx);
  }

  // 창업 아이템 분석 정보 더보기
  onClickAnalysisDetail() {
    setTimeout(() => {
      this.isChartVisible = !this.isChartVisible;
    }, 100);
    this.updateChartData();
  }

  updateChartData() {
    setInterval(() => {
      this.chartIndex++;
      if (this.chartIndex === this.chartArray.length) this.chartIndex = 0;
    }, 3000);
  }

  // 공유주방 정보 더보기
  onClickKitchenDetail() {
    this.isKitchenVisible = !this.isKitchenVisible;
  }

  handleScroll() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const target = this.$refs.section01;
    const section03 = this.$refs.section03;

    if (target) {
      const rect = target.getBoundingClientRect().top;
      if (rect < 300) {
        this.$refs.section01.classList.add('is-start');
        this.swiper.autoplay.start();
        this.swiper.on('slideChange', () => {
          this.onSwipe(this);
        });
      }
    }

    if (section03) {
      const rect = section03.getBoundingClientRect().top;
      if (rect < 300) {
        this.$refs.section03.classList.add('is-start');
      }
    }
  }

  mounted() {
    this.swiper.autoplay.stop();
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#new-fnb-owner {
  #section-item {
    .bg-light {
      > .container {
        overflow: hidden;
      }
    }
    &.is-start {
      .swiper-container {
        .swiper-slide {
          &.swiper-slide-active {
            &.slide01 {
              .sido-list {
                .sido-item {
                  animation: fadeIn 0.5s linear 0.5s forwards;
                  &.sido-item-01 {
                    &:before {
                      animation: fadeIn 0.5s linear 3.5s forwards;
                    }
                  }
                }
              }
              .cursor-point {
                animation: moveCursor 1s ease 2.5s forwards;
              }
              @keyframes moveCursor {
                0% {
                  opacity: 0;
                  transform: translate(0, 0);
                }
                100% {
                  opacity: 1;
                  transform: translate(-200%, -400%);
                }
              }
            }

            &.slide02 {
              .app-loading {
                .app-loading-spinner {
                  &:before {
                    animation: moveSpinner 0.5s ease-in-out infinite
                      alternate-reverse;
                  }
                }
              }

              @keyframes moveSpinner {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(67%);
                }
              }
            }

            &.slide03 {
              .menu-item-list {
                .menu-item {
                  animation: slideMenu 4s ease 1s infinite;
                }
              }
              @keyframes slideMenu {
                0% {
                  background-position: 0 0%;
                }
                33% {
                  background-position: 50% 0;
                }
                66% {
                  background-position: 100% 0;
                }
                100% {
                  background-position: 150% 0;
                }
              }
            }
          }
        }
      }
    }

    .mockup-container {
      position: relative;
      overflow: hidden;
      max-width: 28em;
      margin: 0 auto;
      margin-bottom: -40%;
      padding: 2%;
      .app-hedader {
        position: absolute;
        left: 0;
        top: 7%;
        right: 0;
        z-index: 2;
        padding: 5% 0;
        transition: opacity 0.4s ease;
        &.step-0 {
          .app-process-bar {
            .bars {
              width: 40%;
            }
          }
        }

        &.step-1 {
          .app-process-bar {
            .bars {
              width: 90%;
            }
          }
        }
        &.step-2 {
          opacity: 0;
        }
        .app-process-bar {
          position: absolute;
          left: 5%;
          right: 5%;
          bottom: 0;
          height: 0.3vw;
          background-color: $white;
          .bars {
            display: block;
            width: 0;
            height: 100%;
            transition: width 1s ease 1s;
            background-color: $lightblue;
          }
        }
        .app-logo {
          display: block;
          text-align: center;
          img {
            width: 24%;
          }
        }
        .app-prev {
          position: absolute;
          left: 10%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 1;
          width: 6%;
          img {
            width: 100%;
          }
        }
      }

      .swiper-container {
        border-radius: 12%;
        overflow: hidden;
        .swiper-slide {
          padding-bottom: 202.69%;
          .app-container {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: 0 8%;
          }
          &.slide01 {
            background-color: $primary;
            .app-container {
              .question-title {
                position: absolute;
                left: 0;
                right: 0;
                text-align: center;
                top: 22%;
                img {
                  width: 85%;
                }
              }
              .sido-list {
                position: absolute;
                left: 0;
                right: 0;
                top: 35%;
                .sido-item {
                  position: relative;
                  margin: 0.25em;
                  opacity: 0;
                  &.sido-item-01 {
                    &::before {
                      display: block;
                      content: '';
                      position: absolute;
                      left: 0;
                      top: 0;
                      right: 0;
                      bottom: 0;
                      z-index: 1;
                      background: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_sido_01_active.png')
                        no-repeat center center;
                      background-size: cover;
                      opacity: 0;
                    }
                  }
                  img {
                    display: block;
                    width: 100%;
                  }
                }
              }
              .cursor-point {
                position: absolute;
                right: 20%;
                bottom: 30%;
                width: 15%;
                border-radius: 50%;
                opacity: 0;
              }
            }
          }

          &.slide02 {
            background-color: $primary;
            .app-loading {
              position: relative;
              top: 40%;
              .app-loading-spinner {
                position: relative;
                width: 25%;
                margin: 0 auto;
                img {
                  width: 100%;
                }
                &:before {
                  display: block;
                  content: '';
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 59%;
                  height: 100%;
                  z-index: 1;
                  background: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_loading_spinner01.png')
                    no-repeat center center;
                  background-size: contain;
                }
              }
            }
            .app-loading-txt {
              position: relative;
              text-align: center;
              top: 45%;
              img {
                width: 75%;
              }
            }
          }

          &.slide03 {
            background-color: $light;
            .result-header {
              position: absolute;
              top: 6%;
              text-align: center;
              img {
                width: 90%;
              }
            }
            .menu-item-list {
              position: relative;
              top: 13%;
              width: 100%;
              margin: 0 auto;
              .menu-item {
                padding-bottom: 151%;
                background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_result_item.png');
                background-repeat: repeat-x;
                background-position: 0 0;
                background-size: cover;
              }
            }
          }
        }
      }

      .phone-mockup01 {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
      }
    }

    .phone-mockup01 {
      position: relative;
      // padding-bottom: 202.69%;
      background: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_phone_mockup.png')
        no-repeat center center;
      background-size: contain;
      .app-container {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .app-list {
        .app-img {
          width: 35%;
          margin: 0 auto;
          img {
            width: 100%;
            overflow: hidden;
          }
        }
      }
      .app-intro {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        .app-title {
          position: absolute;
          top: 30%;
          left: 0;
          right: 0;
          text-align: center;
          img {
            width: 55%;
          }
        }
        .app-bottom-logo {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 5%;
          text-align: center;
          img {
            width: 25%;
          }
        }
      }
    }
  }
  #section-recipe {
    .img-box {
      height: 25em;
    }
  }

  // 탭 - 배달앱 등록
  .app-register-container {
    position: relative;
    .hand-container {
      position: absolute;
      left: 50%;
      transform: translate3d(0, 100%, 0);
      bottom: -3em;
      width: 60%;
      .hand {
        padding-bottom: 86.38%;
        background: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_hand.png')
          no-repeat center center;
        background-size: contain;
      }
    }
  }

  #section-operation {
    &.is-start {
      // 탭 활성화시
      .active {
        .app-register-container {
          .hand-container {
            animation: slideInUp 0.6s ease-out forwards;
            .hand {
              animation: slideInUp 0.6s ease-out forwards 1.4s reverse;
            }
          }
        }
      }
    }
  }

  // 공유주방 슬라이더

  .delivery-kitchen-container {
    .swiper-slide {
      width: 70%;
      max-width: 16em;
      img {
        width: 100%;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    #section-item {
      .mockup-container {
        max-width: 16em;
        margin-bottom: -5em;
      }
    }

    #section-recipe {
      height: 100%;
      // .section-content {
      //   height: calc(100% - 7.5em);
      // }
      // .img-box {
      //   height: 10em;
      // }
    }
  }
}
</style>
