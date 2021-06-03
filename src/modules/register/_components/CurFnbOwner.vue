<template>
  <div id="cur-fnb-owner">
    <b-row no-gutters>
      <b-col cols="12" xl="12">
        <section class="article-section bg-light pb-0">
          <header class="section-header">
            <h3>
              왜 매출이 안오를까 <br />
              고민 되시나요?
            </h3>
            <p>
              픽쿡은 상권에서 잘 팔리는 메뉴로<br />
              가게의 매출을 올려드립니다.
            </p>
          </header>
          <div class="section-content bg-white">
            <div class="bg-light">
              <div class="mockup-container2">
                <div
                  class="phone-mockup"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <img
                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_cur_revenue.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div class="shadow-sm py-8 bg-white">
              <div class="container">
                <div class="txt-center">
                  <div class="title-box">
                    <h4 class="txt-black">
                      잘 팔리는 메뉴는 <br />
                      어떻게 추천될까요?
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
                      >
                        <span>{{
                          !isAnalysisVisible ? '확인하기' : '접기'
                        }}</span>
                      </b-btn>
                    </div>
                    <div class="d-none d-xl-block">
                      <b-btn
                        size="md"
                        variant="outline-blue"
                        block
                        v-b-modal.analysis-detail
                      >
                        <span>확인하기</span>
                      </b-btn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <b-collapse id="analysis-detail">
              <div class="bg-light pt-8 pb-0">
                <div class="container">
                  <div class="mockup-container2">
                    <div
                      class="phone-mockup"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                    >
                      <img
                        src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_cur_item.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="white py-8">
                <div class="container">
                  <div class="txt-box txt-center txt-black">
                    <div class="row-box">
                      <p>
                        빅데이터 상권지수와 상권기반 인구통계, <br />
                        지역의 구매력과 경쟁업체, 운영 적합도를 <br />
                        종합하여 추천합니다.
                      </p>
                    </div>
                    <div class="row-box mt-7">
                      <p class="border px-4 py-2 rounded">
                        결과에 대한 분석은 상담을 통해 확인하세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </section>
      </b-col>
      <b-col cols="12" xl="12">
        <section class="article-section bg-light">
          <div class="container">
            <header class="section-header">
              <h3>
                왜 우리 가게엔 손님이 없을까<br />
                고민 되시나요?
              </h3>
              <p>
                픽쿡은 상권에 알맞는 영업방법을 알려드립니다.
              </p>
            </header>
            <div class="section-content">
              <b-row class="max-w-45 mx-auto">
                <b-col cols="6">
                  <div
                    data-aos="fade-left"
                    data-aos-duration="500"
                    class="txt-center"
                  >
                    <img
                      src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_date_graph.png"
                      alt=""
                    />
                  </div>
                </b-col>
                <b-col cols="6">
                  <div
                    data-aos="fade-right"
                    data-aos-duration="500"
                    class="txt-center"
                  >
                    <img
                      src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_time_graph.png"
                      alt=""
                    />
                  </div>
                </b-col>
                <b-col cols="12">
                  <div
                    data-aos="fade-up"
                    data-aos-duration="500"
                    data-aos-delay="500"
                    class="txt-center mt-4"
                  >
                    <img
                      src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_delivery_graph.png"
                      alt=""
                    />
                  </div>
                </b-col>
              </b-row>
              <div class="txt-box txt-center">
                <div class="row-box">
                  <p>
                    금요일 저녁에 배달 주문량이 많은 지역이므로<br />
                    창업 아이템을 배달로 추가 하는 것을 추천드립니다.
                  </p>
                </div>
                <div class="row-box mt-7">
                  <p class="border px-4 py-2 rounded bg-white">
                    결과에 대한 분석은 상담을 통해 확인하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </b-col>
      <b-col cols="12" xl="12">
        <section class="article-section bg-white">
          <div class="container">
            <header class="section-header">
              <h3>
                왜 주문이 안들어올까 <br />
                고민 되시나요?
              </h3>
              <p>
                픽쿡은 배달앱 등록과 관리를 통해<br />
                주문량이 높아질 수 있도록 도와줍니다.
              </p>
            </header>
            <div
              class="section-content"
              data-aos="fade-up"
              data-aos-duration="500"
            >
              <swiper :options="swiperAppReview" ref="mySwiper">
                <swiper-slide>
                  <div class="img-box txt-center">
                    <img
                      src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_review_01.png"
                      alt=""
                    />
                  </div>
                  <div class="txt-box txt-center">
                    <p class="txt-bold txt-black">
                      메뉴사진 및 배달팁 설정
                    </p>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="img-box txt-center">
                    <img
                      src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_review_02.png"
                      alt=""
                    />
                  </div>
                  <div class="txt-box txt-center">
                    <p class="txt-bold txt-black">
                      판매 단가 및 마진 설정
                    </p>
                  </div>
                </swiper-slide>
                <swiper-slide>
                  <div class="img-box txt-center">
                    <img
                      src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_review_03.png"
                      alt=""
                    />
                  </div>
                  <div class="txt-box txt-center">
                    <p class="txt-bold txt-black">
                      리뷰이벤트 및 댓글 관리
                    </p>
                  </div>
                </swiper-slide>
              </swiper>
              <div class="swiper-pagination" slot="pagination"></div>
            </div>
          </div>
        </section>
      </b-col>
      <b-col cols="12" xl="12">
        <section
          class="article-section bg-light pb-0"
          id="section-operation"
          ref="section03"
        >
          <header class="section-header">
            <div class="container">
              <h3>
                가게의 매출을 올리세요!
              </h3>
              <p>
                월 30만원 부터 이용하는<br />
                픽쿡의 다양한 서비스를 확인하세요.
              </p>
            </div>
          </header>
          <div class="section-content">
            <b-tabs>
              <b-tab title="메뉴 교육" active>
                <div class="container">
                  <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide>
                      <div class="img-box txt-center">
                        <img
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_menu_01.png"
                          alt=""
                        />
                      </div>
                    </swiper-slide>
                    <swiper-slide>
                      <div class="img-box txt-center">
                        <img
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_menu_02.png"
                          alt=""
                        />
                      </div>
                    </swiper-slide>
                    <swiper-slide>
                      <div class="img-box txt-center">
                        <img
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_menu_03.png"
                          alt=""
                        />
                      </div>
                    </swiper-slide>
                    <swiper-slide>
                      <div class="img-box txt-center">
                        <img
                          src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_menu_04.png"
                          alt=""
                        />
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
                <div class="bg-white txt-center py-12 mt-8 speech-bubble-box">
                  <p>
                    간편한 레시피를 매장에서 교육받고,<br />
                    3일만에 판매하세요
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
                    배달 앱 등록, 광고관리,리뷰이벤트 등<br />
                    다양한 항목들을 교육합니다.
                  </p>
                </div>
              </b-tab>
              <b-tab title="상권 분석">
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
                    현재 상권에 매출 하락 원인을 <br />
                    메뉴별, 시간별, 인구통계와 소비 패턴, <br />
                    경쟁업체 등을 분석하여 알려드립니다.
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
                    가게운영과 배달에 필요한 홍보물들을<br />
                    바로 이용할 수 있도록 제공합니다.
                  </p>
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </section>
      </b-col>
    </b-row>
    <!-- 잘팔리는 메뉴 분석 pc 모달 -->
    <b-modal id="analysis-detail" title="창업 아이템 추천" hide-footer>
      <div class="bg-light py-8 pb-0">
        <div class="container">
          <div class="mockup-container2 mx-auto txt-center">
            <div
              class="phone-mockup"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <img
                src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_cur_item.png"
                alt=""
                class="w-20"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="white py-8">
        <div class="container">
          <div class="txt-box txt-center txt-black">
            <div class="row-box">
              <p>
                빅데이터 상권지수와 상권기반 인구통계, <br />
                지역의 구매력과 경쟁업체, 운영 적합도를 <br />
                종합하여 추천합니다.
              </p>
            </div>
            <div class="row-box mt-7">
              <p class="border px-4 py-2 rounded">
                결과에 대한 분석은 상담을 통해 확인하세요.
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

@Component({
  name: 'CurFnbOwner',
})
export default class CurFnbOwner extends BaseComponent {
  $refs!: {
    section03: HTMLFormElement;
    mySwiper: HTMLFormElement;
  };

  private isAnalysisVisible = false;
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
    speed: 500,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: true,
    },
  };

  private swiperAppReview: any = {
    slidesPerView: 1,
    loop: true,
    grabCursor: true,
    allowTouchMove: true,
    speed: 500,
    spaceBetween: 0,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
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

  handleScroll() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const section03 = this.$refs.section03;

    if (section03) {
      const rect = section03.getBoundingClientRect().top;
      if (rect < 300) {
        this.$refs.section03.classList.add('is-start');
        this.swiper.autoplay.start();
      }
    }
  }

  // 메뉴 분석 정보 더보기
  onClickAnalysisDetail() {
    this.isAnalysisVisible = !this.isAnalysisVisible;
  }

  mounted() {
    this.swiper.autoplay.stop();
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
#cur-fnb-owner {
  .mockup-container2 {
    overflow: hidden;
    max-width: 28em;
    margin: 0 auto;
    .phone-mockup {
      text-align: center;
      margin-bottom: -50%;
      img {
        // width: 100%;
        margin: 0 auto;
      }
    }
  }
  @media screen and (min-width: 1200px) {
    .mockup-container2 {
      max-width: 16em;
    }
  }
}
.swiper-container {
  .swiper-button-prev,
  .swiper-button-next {
    opacity: 0.5;
  }
  .swiper-button-prev {
    left: 1em;
  }
  .swiper-button-next {
    right: 1em;
  }
}
.swiper-pagination {
  position: relative;
  text-align: center;
  width: 100%;
  margin-top: 1em;

  .swiper-pagination-bullet {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: $gray-200;
    transform: none;
    opacity: 1;
    font-size: 0;
    border: 1px solid $gray-200;

    &.swiper-pagination-bullet-active {
      background-color: $gray;
    }
  }
}
</style>
