<template>
  <main id="register">
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
        <a href="tel:1800-5972" class="btn btn-sm btn-outline-white btn-tel">
          <b-icon icon="telephone-fill"></b-icon>
          <span class="ml-2">1800-5972</span>
        </a>
      </div>
    </header>
    <article class="main-article">
      <header class="article-header " ref="topForm">
        <div class="container">
          <div
            class="card rounded-lg px-6 py-8"
            data-aos="fade-up"
            data-duration="1000"
          >
            <template v-if="!isCompleted">
              <div class="title-box txt-center">
                <template v-if="fnbOwnerStatus == 'NEW_FNB_OWNER'">
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
                </template>
                <template v-else>
                  <h2 class="txt-huge txt-black txt-primary">
                    피크시간에<br />
                    주문이 없다면?<br />
                    <strong class="txt-primary txt-bolder">
                      픽쿡을 시작하세요!
                    </strong>
                  </h2>
                </template>
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
                      <b-form-checkbox
                        value="true"
                        v-model="isPrivacyChecked"
                        size="sm"
                        ><span class="txt-blue">개인정보취금방침</span>에
                        동의합니다(필수)</b-form-checkbox
                      >
                      <a
                        v-b-modal.privacy
                        class="btn-txt txt-small txt-gray txt-underline"
                        ><span class="txt-gray">더보기</span></a
                      >
                    </b-row>
                  </b-form-group>
                  <b-btn
                    size="lg"
                    variant="primary"
                    block
                    :disabled="!isConsultBtnDisabled"
                    @click="onConsultBtnClicked()"
                    id="btn-top-inquiry"
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
            </template>
            <template v-else>
              <div class="title-box txt-center">
                <b-img-lazy
                  src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/logo.svg"
                  alt="픽쿡"
                  class="w-20"
                ></b-img-lazy>
                <div class="row-box">
                  <h2 class="txt-primary txt-bold">
                    신청이 완료되었어요
                  </h2>
                  <p class="mt-2">
                    담당 플래너가 배정되는대로 <br />
                    입력해주신 연락처로 안내드릴게요.
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </header>
      <div class="article-content bg-white" ref="container">
        <template v-if="fnbOwnerStatus == 'NEW_FNB_OWNER'">
          <NewFnbOwner />
        </template>
        <template v-else>
          <CurFnbOwner />
        </template>
        <section class="article-section border-top">
          <header class="section-header">
            <b-img-lazy
              src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/logo.svg"
              alt="픽쿡"
              class="w-20"
            ></b-img-lazy>

            <div class="row-box mt-8">
              <h3>
                <span class="txt-primary txt-huge">지금 바로 신청하세요!</span>
              </h3>
              <p class="txt-primary">
                아이템이 없어도, 공간이 없어도 <br />
                조리 경험이나 운영 경험이 없어도 OK <br />
                픽쿡이 모두 도와드리니까요!
              </p>
            </div>
          </header>
        </section>
      </div>
    </article>
    <!-- 개인정보 취급방침 모달 -->
    <b-modal id="privacy" title="개인정보 취급방침 동의" size="lg" hide-footer>
      <PrivacyContent />
    </b-modal>
    <!-- 하단 sticky 버튼 -->
    <transition name="slideInUp">
      <b-btn
        variant="blue"
        size="lg"
        squared
        id="btn-sticky"
        v-if="isVisibleStickyBtn"
        v-scroll-to="{ el: '.main-article' }"
      >
        <span>
          무료로 상담받아보세요<br />
          <span class="txt-small"
            >현재까지 상담완료한 창업자
            <vue-odometer :value="consultTotalCountSticky"></vue-odometer>
            명</span
          >
        </span>
      </b-btn>
    </transition>
    <b-btn
      variant="yellow"
      icon
      id="btn-kakao"
      :class="{ 'is-scrolled': isVisibleStickyBtn }"
      @click="kakaoChat()"
    >
      카카오톡 상담
    </b-btn>
  </main>
</template>
<script lang="ts">
import axios from 'axios';
import BaseComponent from '@/core/base.component';
import { ConsultRequestDto, ProformaConsultResultV3CreateDto } from '@/dto';
import { Component } from 'vue-property-decorator';
import { IsValidateHangeul, IsValidatePhone } from '@/core';
import { FNB_OWNER } from '@/common';
import ConsultResultV3Service from '@/services/consult-result-v3.service';
import PrivacyContent from '../_components/agreement/PrivacyContent.vue';
import NewFnbOwner from './_components/NewFnbOwner.vue';
import CurFnbOwner from './_components/CurFnbOwner.vue';

@Component({
  name: 'Register',
  components: { PrivacyContent, NewFnbOwner, CurFnbOwner },
})
export default class Register extends BaseComponent {
  $refs!: {
    container: HTMLFormElement;
    topForm: HTMLFormElement;
    radarChart: HTMLCanvasElement;
    mySwiper: HTMLFormElement;
  };

  private consultRequestDto = new ConsultRequestDto();
  private consultTotalCount: any = null;
  private consultTotalCountSticky: any = null;
  private deposit = 9;

  private isPrivacyChecked = true;
  private isVisibleStickyBtn = false;
  private headerBgOpacity = 0;

  private isCompleted = false;

  // get proform id
  private ipAddress = '';
  private fnbOwnerStatus = 'NEW_FNB_OWNER';
  private proformaConsultResultV3CreateDto = new ProformaConsultResultV3CreateDto();

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
    ConsultResultV3Service.postConsult(this.consultRequestDto).subscribe(
      res => {
        if (res) {
          this.isCompleted = true;
          // this.$bvToast.toast('상담신청이 완료되었습니다', {
          //   varient: 'success',
          // });
          // this.$analytics.fbq.event('SubmitApplication');
          this.$gtag.event('complete_application', {
            description: '신청 완료',
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
        setTimeout(() => {
          this.consultTotalCountSticky = this.consultTotalCount;
        }, 1000);
      } else {
        this.isVisibleStickyBtn = false;
        this.headerBgOpacity =
          1 - (target.offsetTop - scrollTop) / target.offsetTop;
      }
    }
  }

  // get fnb owner status
  getFnbOwnerStatus() {
    const urlQuery = location.search;
    const params = Object.fromEntries(new URLSearchParams(urlQuery));
    if (urlQuery) {
      this.fnbOwnerStatus = params.fnbOwnerStatus;
    }
    this.$gtag.event(`user_type_${params.fnbOwnerStatus}`);
  }

  // get proformar id
  getProformaId() {
    this.proformaConsultResultV3CreateDto.ipAddress = this.ipAddress;
    this.proformaConsultResultV3CreateDto.fnbOwnerStatus = this.fnbOwnerStatus;
    ConsultResultV3Service.getProformaId(
      this.proformaConsultResultV3CreateDto,
    ).subscribe(res => {
      if (res) {
        this.consultRequestDto.proformaConsultResultId = res.data.id;
        console.log(this.consultRequestDto.proformaConsultResultId);
      }
    });
  }

  kakaoChat() {
    window.Kakao.Channel.chat({
      channelPublicId: '_rxlgjs',
    });
  }

  created() {
    this.getFnbOwnerStatus();
    this.getConsultTotalCount();
    window.addEventListener('scroll', this.handleScroll);
  }

  mounted() {
    axios.get('https://api.ipify.org?format=json').then(res => {
      this.ipAddress = res.data.ip;
      this.getProformaId();
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
#btn-top-inquiry {
  &:hover {
    border-color: $lightblue;
    background-color: $lightblue;
  }
}

// btn toggle
.btn-toggle {
  .icon {
    width: 0.875em;
    transform: rotate(0);
    transform-origin: center center;
    transition: transform 0.4s ease;
    margin-left: 0.5em;
  }
  &.is-active {
    .icon {
      transform: rotate(-180deg);
    }
  }
  &:hover {
    .icon {
      fill: $white !important;
    }
  }
}
.speech-bubble-box {
  position: relative;
  box-shadow: 0.125em -0.25em 0.25em rgba(0, 0, 0, 0.05);
  margin: 0 -1.25em;
  &:before {
    position: absolute;
    top: -0.75em;
    left: 50%;
    transform: translateX(-50%) rotate(-45deg) skew(-15deg, -15deg);
    display: block;
    content: '';
    width: 2em;
    height: 2em;
    background: white;
    box-shadow: 0.125em -0.25em 0.25em rgba(0, 0, 0, 0.05);
  }
}
#register {
  h4 {
    line-height: 1.3;
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
          &:nth-child(1),
          &:nth-child(4) {
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
      overflow: hidden;

      .section-header {
        text-align: center;
        h3 {
          font-size: 1.5rem;
          color: $black;
          font-weight: $txt-bold;
          line-height: 1.5;
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

  // 탭 스타일
  .tabs {
    .nav-tabs {
      position: relative;
      border: 0;
      z-index: 2;
      max-width: 32em;
      margin: 0 auto;
      padding: 0 1.25em;
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
  }

  // mockup common
  .mockup-container {
    max-width: 50%;
    margin: 1em auto 0;
  }

  .phone-mockup02 {
    position: relative;
    padding-bottom: 202.69%;
    background: url('https://kr.object.ncloudstorage.com/common-storage-pickcook/services/img_phone_mockup02.png')
      no-repeat center center;
    background-size: contain;
  }

  .report-container {
    margin-top: -1.5em;
    margin-bottom: -2.5em;
    .report-sample {
      text-align: center;
      img {
        // width: 100%;
        margin: 0 auto;
      }
    }
  }

  .banner-container {
    margin-left: -7em;
    margin-right: -7em;
    margin-bottom: -6em;
    margin-top: 1em;
    .banner-sample {
      text-align: center;
      img {
        // width: 100%;
        margin: 0 auto;
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

  .chart-container {
    max-width: 32em;
    margin: 0 auto;
  }

  #section-operation {
    position: relative;
    overflow: hidden;

    &.is-start {
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

        .app-ad-container {
          .app-img {
            &.app-baemin {
              animation: app-baemin 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)
                forwards;
            }
            &.app-coupang {
              animation: app-coupang 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)
                0.2s forwards;
            }
            &.app-yogiyo {
              animation: app-yogiyo 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95)
                0.4s forwards;
            }
          }
        }

        @keyframes app-baemin {
          to {
            left: 80%;
          }
        }
        @keyframes app-coupang {
          to {
            left: 20%;
            top: 35%;
          }
        }
        @keyframes app-yogiyo {
          to {
            left: 25%;
            top: 65%;
          }
        }
      }
    }

    > .container {
      position: relative;
    }
    .section-header {
      position: relative;
      z-index: 3;
    }

    // 탭 - 배달앱 광고
    .app-ad-container {
      position: relative;
      .mockup-container {
        .phone-mockup02 {
          z-index: 1;
        }
      }
      .app-img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 20%;
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
  #register {
    .main-article {
      .article-content {
        > .row {
          .article-section {
            height: 100%;
            border-bottom: 1px solid $gray-100;
          }
          [class^='col-'] {
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
      .app-ad-container {
        max-width: 32em;
        margin: 0 auto;
        .app-img {
          max-width: 5em;
        }
      }
    }
  }
}
</style>
