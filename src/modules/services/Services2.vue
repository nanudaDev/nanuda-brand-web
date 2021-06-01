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
        <a
          href="tel:1800-5972"
          class="btn btn-sm btn-outline-white rounded-pill btn-tel"
        >
          <b-icon icon="telephone-fill"></b-icon>
          <span class="ml-2">1800-5972</span>
        </a>
      </div>
    </header>
    <article class="main-article bg-light">
      <header class="article-header" ref="topForm">
        <div class="container">
          <div
            class="card rounded-lg p-6"
            data-aos="fade-up"
            data-duration="1000"
          >
            <div class="title-box txt-center">
              <h2 class="txt-huge txt-black txt-bold">
                <strong class="txt-primary txt-bolder">
                  배달창업, 참 쉽다<i>!</i></strong
                >
              </h2>
              <p class="mt-2">
                창업이 처음이라도 준비중이라도 <br />
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
                    <b-btn size="sm" variant="white" v-b-modal.privacy
                      >더 보기</b-btn
                    >
                  </b-row>
                </b-form-group>
                <b-btn
                  size="lg"
                  variant="primary"
                  block
                  :disabled="!isConsultBtnDisabled"
                  @click="onConsultBtnClicked()"
                >
                  <span>
                    무료로 상담받아보세요<br />
                    <span class="txt-mini"
                      >현재까지 상담완료한 창업자 120명</span
                    ></span
                  >
                </b-btn>
              </b-form>
            </div>
          </div>
        </div>
      </header>
      <div class="article-content bg-white" ref="container">
        <section class="article-section">
          <div class="container">
            <header class="section-header">
              <h3>
                창업 아이템이 없어도<strong class="txt-ok"
                  ><b-img-lazy
                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/txt_ok.svg"
                    alt="OK"
                    data-aos="zoom-out"
                    data-duration="500"
                    data-delay="1000"
                /></strong>
              </h3>
              <p>
                창업자의 다양한 세부 조건을<br />
                상권 빅데이터 시스템으로 세밀하게 분석하여<br />
                상권에 맞는 확실한 아이템을 알려드립니다.
              </p>
            </header>
            <div class="section-content">
              <RadarChart :chartData="chartData" />
            </div>
          </div>
        </section>
        <section class="article-section">
          <div class="container">
            <header class="section-header">
              <h3>
                창업 아이템이 없어도<strong class="txt-ok"
                  ><b-img-lazy
                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/txt_ok.svg"
                    alt="OK"
                    data-aos="zoom-out"
                    data-duration="500"
                    data-delay="1000"
                /></strong>
              </h3>
            </header>
            <div class="section-content">
              내용
            </div>
          </div>
        </section>
        <section class="article-section">
          <div class="container">
            <header class="section-header">
              <h3>
                창업 아이템이 없어도<strong class="txt-ok"
                  ><b-img-lazy
                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/txt_ok.svg"
                    alt="OK"
                    data-aos="zoom-out"
                    data-duration="500"
                    data-delay="1000"
                /></strong>
              </h3>
            </header>
            <div class="section-content">
              내용
            </div>
          </div>
        </section>
        <section class="article-section">
          <div class="container">
            <header class="section-header">
              <h3>
                창업 아이템이 없어도<strong class="txt-ok"
                  ><b-img-lazy
                    src="https://kr.object.ncloudstorage.com/common-storage-pickcook/services/txt_ok.svg"
                    alt="OK"
                    data-aos="zoom-out"
                    data-duration="500"
                    data-delay="1000"
                /></strong>
              </h3>
            </header>
            <div class="section-content">
              내용
            </div>
          </div>
        </section>
      </div>
    </article>
    <!-- 개인정보 취급방침 모달 -->
    <b-modal id="privacy" title="개인정보 취급방침 동의"> </b-modal>
    <!-- 하단 sticky 버튼 -->
    <transition name="slideInUp">
      <b-btn
        variant="blue"
        size="lg"
        squared
        id="btn-sticky"
        v-if="isVisibleStickyBtn"
      >
        <span>
          무료로 상담받아보세요<br />
          <span class="txt-mini">현재까지 상담완료한 창업자 120명</span>
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

@Component({
  name: 'Services',
  components: { RadarChart },
})
export default class Services extends BaseComponent {
  private consultRequestDto = new ConsultRequestDto();

  private isPrivacyChecked = true;
  private isVisibleStickyBtn = false;
  private headerBgOpacity = 0;
  private chartData: any = {
    datasets: [
      {
        data: [19, 17, 15, 6, 16],
      },
    ],
    labels: ['빅데이터 상권지수', '구매력', '창업비용', '조리경험', '운영경험'],
  };

  $refs!: {
    container: HTMLFormElement;
    topForm: HTMLFormElement;
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

  created() {
    window.addEventListener('scroll', this.handleScroll);
    console.log();
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
  .main-header {
    position: fixed;
    top: 0;
    left: 0;
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
    .article-header {
      position: relative;
      background-color: $primary;
      background-image: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/main/bg_graph.png');
      background-repeat: no-repeat;
      background-position: 0 calc(0% - 8em);
      padding: 10em 0 2.5em;
    }
    .article-section {
      padding: 3.5em 0;
      min-height: 15em;
      &:nth-child(even) {
        background-color: $light;
      }
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
          margin-top: 2.5em;
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
    transform: translateY(-4em);
  }
}
</style>
