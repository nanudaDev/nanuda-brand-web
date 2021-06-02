<template>
  <main id="service">
    <header
      class="main-header"
      :style="{
        'background-color': `rgba(0,77,138,${headerBgOpacity - 0.3})`,
        'backdrop-filter': `blur(${headerBgOpacity * 4}px) brightness(${1 -
          headerBgOpacity * 0.5})`,
      }"
    >
      <div class="container">
        <h1>
          <router-link to="/">
            <b-img-lazy
              src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/logo_w.svg"
              alt="픽쿡"
            ></b-img-lazy>
          </router-link>
        </h1>
        <a href="tel:02-556-5777" class="btn btn-sm btn-outline-white  btn-tel">
          <b-icon icon="telephone-fill"></b-icon>
          <span class="ml-2">02 5565 777</span>
        </a>
      </div>
    </header>
    <article class="main-article">
      <header class="article-header " ref="topForm">
        <div class="container">
          <div
            class="card rounded-lg p-6"
            data-aos="fade-up"
            data-duration="1000"
          >
            <div class="title-box txt-center">
              <h2 class="txt-huge txt-black txt-bold">
                <strong class="txt-primary txt-bolder">
                  배달 창업, 한번에</strong
                >
                <strong class="txt-ok"
                  ><b-img-lazy
                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/txt_ok.svg"
                    alt="OK"
                    data-aos="zoom-out"
                    data-duration="500"
                    data-delay="1000"
                /></strong>
              </h2>
              <p class="mt-2">
                창업이 처음 또는 준비중이신가요?<br />
                필요한 서비스만 골라 한 번에 시작하세요!
              </p>
            </div>
            <div class="row-box">
              <b-form>
                <b-form-group>
                  <b-form-input
                    v-model="consultRequestDto.name"
                    size="lg"
                    placeholder="이름(김픽쿡)"
                    required
                    :state="userName"
                    id="user-name"
                  ></b-form-input>
                  <b-form-invalid-feedback id="user-name" class="mt-2 ml-6"
                    >이름을 정확히 입력해주세요</b-form-invalid-feedback
                  >
                </b-form-group>
                <b-form-group>
                  <b-form-input
                    v-model="consultRequestDto.phone"
                    size="lg"
                    placeholder="휴대폰번호('-' 제외)"
                    required
                    :state="userPhone"
                    id="user-phone"
                  ></b-form-input>
                  <b-form-invalid-feedback id="user-phone" class="mt-2 ml-6"
                    >휴대폰번호를 정확히 입력해주세요</b-form-invalid-feedback
                  >
                </b-form-group>
                <b-form-group>
                  <b-row no-gutters align-v="center" align-h="between">
                    <b-form-checkbox value="true" v-model="isPrivacyChecked"
                      >개인정보취금방침에 동의합니다(필수)</b-form-checkbox
                    >
                    <a
                      v-b-modal.privacy
                      class="btn-txt txt-small txt-gray txt-underline"
                      ><span class="txt-gray">더보기</span></a
                    >
                  </b-row>
                </b-form-group>
                <b-btn
                  size="xl"
                  variant="primary"
                  block
                  :disabled="!isConsultBtnDisabled"
                  @click="onConsultBtnClicked()"
                >
                  <span>
                    무료로 상담받아보세요<br />
                    <span class="txt-small"
                      >현재까지 상담완료한 창업자
                      {{ consultTotalCount }}명</span
                    ></span
                  >
                </b-btn>
              </b-form>
            </div>
          </div>
        </div>
      </header>
      <div class="article-content bg-white" ref="container">
        <b-row no-gutters>
          <b-col cols="12" xl="6">
            <section class="article-section pb-0" id="section-item">
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
                            >
                              <span>{{
                                !isChartVisible ? '확인하기' : '접기'
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
          <b-col cols="12" xl="6">
            <section class="article-section pb-0" id="section-recipe">
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
          <b-col cols="12" xl="6">
            <section class="article-section" id="section-operation">
              <div class="container">
                <header class="section-header">
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
                </header>
                <div class="section-content">
                  <b-tabs>
                    <b-tab title="배달앱 등록" active>
                      <div class="tab-container">
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
                    </b-tab>
                    <b-tab title="배달앱 광고"
                      ><div class="tab-container">
                        <div class="mockup-container">
                          <div class="phone-mockup02">
                            <div class="add-setting-container"></div>
                          </div>
                        </div>
                      </div>
                    </b-tab>
                    <b-tab title="매출 컨설팅">
                      <div class="tab-container">
                        <div class="report-container">
                          <div class="report-sample">
                            <img
                              src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_report_sample.png"
                              alt="분석 보고서 샘플"
                            />
                          </div>
                        </div>
                      </div>
                    </b-tab>
                    <b-tab title="홍보물 제공">
                      <div class="tab-container">
                        <div class="banner-container">
                          <div class="banner-sample">
                            <img
                              src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_banner_sample.png"
                              alt="출력물 샘플"
                            />
                          </div>
                        </div>
                      </div>
                    </b-tab>
                  </b-tabs>
                </div>
              </div>
            </section>
          </b-col>
          <b-col cols="12" xl="6">
            <section class="article-section pb-0">
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
                          >
                            <span>{{
                              !isKitchenVisible ? '확인하기' : '접기'
                            }}</span>
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
                            <h4 class="txt-small txt-white txt-bold">임대료</h4>
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
                          <div
                            class="col-6 txt-center txt-lightblue border-left"
                          >
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
          <b-col cols="12" lg="12">
            <section class="article-section">
              <header class="section-header">
                <router-link to="/">
                  <div class="d-block d-lg-none">
                    <b-img-lazy
                      src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/logo.svg"
                      alt="픽쿡"
                      class="w-20"
                    ></b-img-lazy>
                  </div>
                  <div class="d-none d-lg-block">
                    <b-img-lazy
                      src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/logo_w.svg"
                      alt="픽쿡"
                      class="w-20"
                    ></b-img-lazy>
                  </div>
                </router-link>
                <div class="row-box mt-8">
                  <h3>
                    <span class="txt-primary txt-huge"
                      >지금 바로 신청하세요!</span
                    >
                  </h3>
                  <p class="txt-primary">
                    아이템이 없어도, 공간이 없어도 <br />
                    조리 경험이나 운영 경험이 없어도 OK <br />
                    픽쿡이 모두 도와드리니까요!
                  </p>
                </div>
              </header>
            </section>
          </b-col>
        </b-row>
      </div>
    </article>
    <!-- 차트 분석 pc 모달 -->
    <b-modal id="analysis-detail" title="창업 아이템 추천" hide-footer>
      <div class="px-4">
        <RadarChart :chartData="chartData"></RadarChart>
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
    <!-- 개인정보 취급방침 모달 -->
    <b-modal id="privacy" title="개인정보 취급방침 동의" size="lg" hide-footer>
      <PrivacyContent />
    </b-modal>
    <!-- 하단 sticky 버튼 -->
    <transition name="slideInUp">
      <b-btn
        variant="blue"
        size="xl"
        squared
        id="btn-sticky"
        v-if="isVisibleStickyBtn"
        v-scroll-to="{ el: '.main-article' }"
      >
        <span>
          무료로 상담받아보세요<br />
          <span class="txt-small"
            >현재까지 상담완료한 창업자 {{ consultTotalCount }}명</span
          >
        </span>
      </b-btn>
    </transition>
    <b-btn
      variant="yellow"
      icon
      id="btn-kakao"
      :class="{ 'is-scrolled': isVisibleStickyBtn }"
    >
      카카오톡 상담
    </b-btn>
  </main>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { ConsultRequestDto } from '@/dto';
import { Component } from 'vue-property-decorator';
import ConsultResultV3Service from '@/services/consult-result-v3.service';
import { IsValidateHangeul, IsValidatePhone } from '@/core';
import RadarChart from '../_components/charts/RadarChart.vue';
import PrivacyContent from '../_components/agreement/PrivacyContent.vue';

@Component({
  name: 'Services',
  components: { RadarChart, PrivacyContent },
})
export default class Services extends BaseComponent {
  $refs!: {
    container: HTMLFormElement;
    topForm: HTMLFormElement;
    radarChart: HTMLCanvasElement;
    mySwiper: HTMLFormElement;
  };

  private consultRequestDto = new ConsultRequestDto();
  private consultTotalCount: any = null;
  private deposit = 9;
  private index = 0;
  private chartArray: any[] = [
    {
      data: [40, 60, 80, 60, 70],
    },
    {
      data: [50, 30, 40, 90, 30],
    },
    {
      data: [20, 70, 50, 30, 80],
    },
  ];
  private chartArrayData = this.chartArray[0];

  private isChartVisible = false;
  private isPrivacyChecked = true;
  private isVisibleStickyBtn = false;
  private headerBgOpacity = 0;

  private chartData: any = {
    datasets: [this.chartArrayData],
    labels: ['빅데이터 상권지수', '구매력', '창업비용', '조리경험', '운영경험'],
  };

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

  get userName() {
    return IsValidateHangeul(this.consultRequestDto.name);
  }

  // 휴대폰번호 유효성 체크
  get userPhone() {
    return IsValidatePhone(this.consultRequestDto.phone);
  }

  // 신청버튼 활성화 체크
  get isConsultBtnDisabled() {
    return this.userName && this.userPhone && this.isPrivacyChecked
      ? true
      : false;
  }

  updateChartData() {
    setInterval(() => {
      this.index++;
      this.chartArrayData = this.chartArray[this.index];
      if (this.index === this.chartArray.length) this.index = 0;
      // this.$root.$emit('updateData');
    }, 3000);
  }

  // 창업 아이템 분석 정보 더보기
  onClickAnalysisDetail() {
    setTimeout(() => {
      this.isChartVisible = !this.isChartVisible;
    }, 100);
    this.updateChartData();
  }

  // 공유주방 정보 더보기
  onClickKitchenDetail() {
    this.isKitchenVisible = !this.isKitchenVisible;
  }

  // 상담받기 버튼
  onConsultBtnClicked() {
    this.consultRequestDto.proformaConsultResultId = 0;
    ConsultResultV3Service.postConsult(this.consultRequestDto).subscribe(
      res => {
        if (res) {
          this.$bvToast.toast('상담신청이 완료되었습니다', {
            varient: 'success',
          });
        }
      },
    );
  }

  // 상담완료자 수
  getConsultTotalCount() {
    ConsultResultV3Service.getCounsultCount().subscribe(res => {
      if (res) {
        this.consultTotalCount = res.data;
      }
    });
  }

  // 스크롤 이벤트
  handleScroll() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const target = this.$refs.container;

    if (target) {
      const rect = target.getBoundingClientRect().top;
      if (rect < 0) {
        this.isVisibleStickyBtn = true;
        this.headerBgOpacity = 1;
      } else {
        this.isVisibleStickyBtn = false;
        this.headerBgOpacity =
          1 - (target.offsetTop - scrollTop) / target.offsetTop;
      }
    }
  }

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

  created() {
    this.getConsultTotalCount();
    window.addEventListener('scroll', this.handleScroll);
  }

  mounted() {
    this.swiper.on('slideChange', () => {
      this.onSwipe(this);
    });
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/common.scss';
[data-aos^='zoom'][data-aos^='zoom'] {
  transform: translateZ(0) scale(1.5);
}
[data-aos^='zoom'][data-aos^='zoom'].aos-animate {
  transform: translateZ(0) scale(1);
}
#service {
  #section-item {
    .bg-light {
      > .container {
        overflow: hidden;
      }
    }
    .mockup-container {
      position: relative;
      overflow: hidden;
      max-width: 28em;
      margin: 0 auto;
      margin-bottom: -10%;
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

  #section-operation {
    position: relative;
    overflow: hidden;
    > .container {
      position: relative;
    }
    .section-header {
      position: relative;
      z-index: 3;
    }

    .tabs {
      .nav-tabs {
        position: relative;
        border: 0;
        z-index: 2;
        max-width: 32em;
        margin: 0 auto;
        .nav-item {
          width: 50%;
          text-align: center;
          .nav-link {
            border: 0;
            border-radius: $border-radius;
            background-color: $light;
            box-shadow: $shadow-sm;
            margin: 0.5em 0.5em;
            padding: 1em 0.5em;
            &.active {
              background-color: $blue;
              color: $white;
              font-weight: $txt-bold;
            }
          }
        }
      }
      // .tab-content {
      //   > .tab-pane {
      //     position: absolute;
      //     left: 0;
      //     right: 0;
      //     bottom: 0;
      //     top: 0;
      //   }
      //   .tab-container {
      //     position: absolute;
      //     right: 0;
      //     bottom: 0;
      //     left: 0;
      //     max-width: 32em;
      //     margin: 0 auto;
      //   }
      // }
    }

    .active {
      .mockup-container {
        .app-list {
          .app-baemin {
            animation: touched 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s
              forwards;
          }
          animation: fadeOut 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2s
            forwards;
        }
        .app-intro {
          animation: fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 2.5s
            forwards;
        }
      }
      .hand-container {
        animation: slideInUp 0.6s ease-out forwards;
      }
      .report-container {
        .report-sample {
          animation: slideInUp 0.6s ease-out forwards;
        }
      }
      .banner-container {
        .banner-sample {
          animation: slideInUp 0.6s ease-out forwards;
        }
      }
      .add-setting-container {
        animation: fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
    }

    .report-container {
      margin-top: -1.5em;
      margin-bottom: -2.5em;
      .report-sample {
        img {
          width: 100%;
        }
      }
    }

    .banner-container {
      margin-left: -7em;
      margin-right: -7em;
      margin-bottom: -6em;
      margin-top: 1em;
      .banner-sample {
        img {
          width: 100%;
        }
      }
    }
    .add-setting-container {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_add_setting.png')
        no-repeat center center;
      background-size: contain;
      opacity: 0;
    }

    .mockup-container {
      max-width: 50%;
      margin: 0 auto;
      margin-bottom: -1.5em;
      margin-top: -1em;
    }
    .hand-container {
      position: absolute;
      left: 50%;
      transform: translateX(-7%);
      bottom: -2em;
      width: 60%;
      .hand {
        padding-bottom: 86.38%;
        background: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_hand.png')
          no-repeat center center;
        background-size: contain;
      }
    }

    .phone-mockup02 {
      position: relative;
      padding-bottom: 202.69%;
      background: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_phone_mockup02.png')
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

  .chart-container {
    max-width: 32em;
    margin: 0 auto;
  }

  .delivery-kitchen-container {
    .swiper-slide {
      width: 70%;
      img {
        width: 100%;
      }
    }
  }

  .main-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 10;
    padding: 1em 0;

    .container {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      h1 {
        font-size: $txt-medium;
        text-align: center;
        line-height: 1;
        img {
          width: 10em;
        }
      }
    }
  }
  .main-article {
    padding-bottom: 4em;
    .article-header {
      position: relative;
      background-color: $primary;
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/main/bg_graph.png');
      background-repeat: no-repeat;
      background-position: 0 calc(0% - 8em);
      padding: 10em 0 2.5em;
      h2 {
        .txt-ok {
          img {
            width: 2.5em;
          }
        }
      }
    }
    .article-content {
      > .row {
        [class^='col-'] {
          &:nth-child(odd) {
            .article-section {
              background-color: $light;
            }
          }
        }
      }
    }
    .article-section {
      padding: 3.5em 0;
      min-height: 15em;

      .section-header {
        text-align: center;
        h3 {
          font-size: 1.5rem;
          color: $black;
          font-weight: $txt-bold;
          strong {
            color: $primary;
            font-weight: $txt-bolder;
            &.txt-ok {
              img {
                width: 2.5em;
              }
            }
          }

          + p {
            margin-top: 1em;
          }
        }
        + .section-content {
          margin-top: 1.5em;
        }
      }
    }
  }
}

#btn-sticky {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 10;
}

#btn-kakao {
  width: 5em;
  height: 5em;
  border-radius: 50%;
  position: fixed;
  bottom: 1em;
  right: 1.5em;
  z-index: 10;
  transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  transform: translateY(0);
  border-color: #fae300;
  background-color: #fae300;
  background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/icon_kakao.svg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% auto;
  text-indent: -9999px;
  &.is-scrolled {
    transform: translateY(-5em);
  }
}
@media screen and (min-width: 1200px) {
  #service {
    .main-article {
      .article-content {
        > .row {
          .article-section {
            height: 100%;
            border: 1px solid $gray-100;
          }
          [class^='col-'] {
            &:nth-child(odd) {
              .article-section {
                background-color: $white;
              }
            }
            &:nth-child(1),
            &:nth-child(4) {
              .article-section {
                background-color: $light;
              }
            }
            &:nth-child(5) {
              .article-section {
                background-color: $darknavy;
                * {
                  color: $white !important;
                }
              }
            }
          }
        }
      }
    }

    #section-item .mockup-container {
      max-width: 16em;
      margin-bottom: -5em;
    }

    #section-recipe {
      height: 100%;
      .section-content {
        height: calc(100% - 7.5em);
      }
      .img-box {
        height: 100%;
      }
    }

    #section-operation {
      .mockup-container {
        max-width: 12em;
      }
      .hand-container {
        max-width: 16em;
      }
      .report-container {
        .report-sample {
          max-width: 24em;
          margin: 0 auto;
        }
      }
      .banner-container {
        .banner-sample {
          max-width: 40em;
          margin: 0 auto;
        }
      }
    }

    .delivery-kitchen-container {
      .swiper-slide {
        max-width: 20em;
      }
    }
  }
}
</style>
