<template>
  <article class="main-article">
    <div class="video-wrapper" :class="isFnbVideo ? 'fnb' : ''">
      <div class="video-container">
        <!-- ?isFnbVideo=true 로 접속시 FNB 비디오 출력 -->
        <template v-if="!isMobile">
          <template v-if="!isFnbVideo">
            <video
              autoplay
              muted
              loop
              playsinline
              id="vid"
              ref="videoRef"
              class="video"
            >
              해당 브라우저는 video 태그를 지원하지 않습니다.
              <source
                src="https://kr.object.ncloudstorage.com/common-nanuda/video/main_video.mp4"
                type="video/webm"
              />
              <source
                src="https://kr.object.ncloudstorage.com/common-nanuda/video/main_video.mp4"
                type="video/mp4"
              />
            </video>
          </template>
          <template v-else>
            <video
              autoplay
              muted
              loop
              playsinline
              id="vid"
              ref="videoRef"
              class="video"
            >
              해당 브라우저는 video 태그를 지원하지 않습니다.
              <source
                src="https://kr.object.ncloudstorage.com/common-nanuda/video/main_video02.mp4"
                type="video/webm"
              />
              <source
                src="https://kr.object.ncloudstorage.com/common-nanuda/video/main_video02.mp4"
                type="video/mp4"
              />
            </video>
          </template>
        </template>
      </div>
      <div class="title-container">
        <div>
          <div class="symbol">
            <img src="@/assets/images/favicon.png" alt="" />
          </div>
          <span
            class="d-inline-block txt-sm txt-underline txt-white txt-bold mb-2 pb-2"
            >스마트하게 창업하기</span
          >
          <h2>실패없는 창업을<br />안내합니다</h2>
          <p>
            원하는 위치에서 무슨 메뉴로 창업해야 할지<br />
            빅데이터로 분석합니다.
          </p>
          <div class="btn-box">
            <button
              class="btn btn-primary rounded-pill btn-lg shawdow"
              id="top-button"
              @click="startQuestions()"
            >
              <span>원하는 지역의 내 메뉴 찾기</span>
              <span class="icon icon-arrow-right icon-align-right"
                ><BaseArrow
              /></span>
            </button>
          </div>
        </div>
      </div>
      <button
        class="btn-scroll-down"
        v-scroll-to="{ el: '#content-wrapper', offset: -navbarHeight }"
      >
        <BaseArrow />
      </button>
    </div>
    <div class="content-wrapper" id="content-wrapper">
      <section class="article-section section01">
        <div class="container">
          <header class="section-title">
            <h3 class="txt-primary" data-aos="fade-up" data-aos-duration="1000">
              픽쿡은 파트너사와 함께 <br />
              여러분의 창업을 안내합니다
            </h3>
          </header>
          <div class="section-content">
            <div class="row align-items-center">
              <div
                class="col-6 col-md-6 col-lg-3"
                v-for="n in 10"
                :key="n"
                data-aos="fade-up"
                data-aos-duration="1000"
                :data-aos-delay="`${50 * n}`"
              >
                <div class="shadow-sm rounded text-center my-2">
                  <img
                    :src="
                      require(`@/assets/images/partner_${
                        n < 10 ? '0' + n : n
                      }.png`)
                    "
                    style="width:100%"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section section02 bg-light">
        <div class="container">
          <header class="section-title">
            <h3 data-aos="fade-up" data-aos-duration="1000">
              1분만 투자하면 <br />
              나에게 맞는 창업을 딱!
            </h3>
          </header>
          <div
            class="section-content"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div class="row no-gutters align-items-center">
              <div class="col-12 col-lg-6">
                <div class="search-box">
                  <p class="search-keyword">
                    서울시 {{ locationText }}
                    <span class="cursor"></span>
                  </p>
                  <span class="icon icon-search"><BaseSearch /></span>
                </div>
                <div class="tag-box">
                  <div
                    class="row-box"
                    v-for="(list, index) in tagList"
                    :key="index"
                  >
                    <div class="tags">
                      <span
                        v-for="(tag, index2) in list.items"
                        :key="index2"
                        class="tag"
                        ref="tagRef"
                        :class="{
                          'is-active': index2 === list.posX[currentIdx] - 1,
                        }"
                        >{{ tag.text }}
                      </span>
                      <span
                        class="tag is-selected"
                        :style="{
                          left: 25 * (list.posX[currentIdx] - 1) + '%',
                        }"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-6">
                <div class="mockup-box text-center">
                  <div class="mockup-card rounded-10 shadow">
                    <swiper :options="swiperOption" ref="mySwiper">
                      <swiper-slide>
                        <figure>
                          <img src="@/assets/images/main_section02_img01.jpg" />
                        </figure>
                      </swiper-slide>
                      <swiper-slide>
                        <figure>
                          <img src="@/assets/images/main_section02_img02.jpg" />
                        </figure>
                      </swiper-slide>
                      <swiper-slide>
                        <figure>
                          <img src="@/assets/images/main_section02_img03.jpg" />
                        </figure>
                      </swiper-slide>
                    </swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section section03">
        <div class="container">
          <div class="row">
            <div
              class="col-12 col-xl-4 pb-5 mb-5 pb-lg-0 mb-lg-0 d-md-flex d-xl-block align-items-center"
            >
              <header class="section-title col-12 col-md-6 col-xl-12">
                <h3
                  class="txt-primary"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  픽쿡은 빅데이터로 <br />
                  시간대별 적정 메뉴를 알려줍니다
                </h3>
                <p data-aos="fade-up" data-aos-duration="1500">
                  창업의 메뉴부터 배달 전략까지 <br />
                  분석하여 실패 없는 창업을 이끕니다.
                </p>
              </header>
              <div
                class="section-content col-12 col-md-6 col-xl-12"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <figure class="img-box text-center">
                  <img src="@/assets/images/main_section03_img01.png" />
                </figure>
              </div>
            </div>
            <div
              class="col-12 col-xl-4 pb-5 mb-5 pb-lg-0 mb-lg-0 d-md-flex flex-row-reverse d-xl-block align-items-center"
            >
              <header class="section-title col-12 col-md-6 col-xl-12">
                <h3
                  class="txt-primary"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  지역에 맞게 고객이 원하는 <br />
                  서비스를 딱 맞게 제공합니다
                </h3>
                <p data-aos="fade-up" data-aos-duration="1500">
                  메뉴/브랜드 교육부터 디자인, 마케팅까지 <br />
                  고객에 맞는 서비스를 제공합니다.
                </p>
              </header>
              <div
                class="section-content col-12 col-md-6 col-xl-12 "
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <figure class="img-box text-center">
                  <img src="@/assets/images/main_section03_img02.png" />
                </figure>
              </div>
            </div>
            <div
              class="col-12 col-xl-4 pb-5 mb-5 pb-lg-0 mb-lg-0 d-md-flex d-xl-block align-items-center"
            >
              <header class="section-title col-12 col-md-6 col-xl-12">
                <h3
                  class="txt-primary"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  픽쿡 플래너가 <br />
                  효율적인 창업을 안내합니다
                </h3>
                <p data-aos="fade-up" data-aos-duration="1500">
                  메뉴 교육부터 판매 운영까지<br />
                  픽쿡 플래너가 음식점 창업을 안내합니다.
                </p>
              </header>
              <div
                class="section-content col-12 col-md-6 col-xl-12"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <figure class="img-box text-center">
                  <img src="@/assets/images/main_section03_img03.png" />
                </figure>
              </div>
            </div>
          </div>
          <div
            class="section-content"
            data-aos="fade-up"
            data-aos-duration="2500"
          >
            <div class="btn-box text-center mt-5">
              <button
                class="btn btn-primary rounded-pill btn-lg shawdow"
                id="bottom-button"
                @click="$router.push('/services')"
              >
                <span>서비스 더 알아보기</span>
                <span class="icon icon-arrow-right"><BaseArrow /></span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section section04 bg-light">
        <header class="section-title">
          <h3 class="txt-primary" data-aos="fade-up" data-aos-duration="1000">
            픽쿡은 장소에 맞는 <br />
            메뉴와 운영 방법을 안내합니다
          </h3>
        </header>
        <div
          class="section-content"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          <b-tabs align="center">
            <b-tab title="진단하기" active>
              <div class="img-box">
                <div class="mask-box">
                  <img
                    :src="require(`@/assets/images/main_section04_img01.png`)"
                  />
                </div>
              </div>
              <div class="txt-box">
                <p>
                  간단한 설문을 통해 창업지역과 <br />
                  현재 상황을 진단할 수 있어요.
                </p>
              </div>
            </b-tab>
            <b-tab title="결과보기">
              <div class="img-box">
                <div class="mask-box">
                  <img
                    :src="require(`@/assets/images/main_section04_img02.png`)"
                  />
                </div>
              </div>
              <div class="txt-box">
                <p>
                  빅데이터로 분석된 고객, 경쟁사, 시간대별 <br />
                  소비메뉴를 세부적으로 확인하세요.
                </p>
              </div>
            </b-tab>
            <b-tab title="추천받기">
              <div class="img-box">
                <div class="mask-box">
                  <img
                    :src="require(`@/assets/images/main_section04_img03.png`)"
                  />
                </div>
              </div>
              <div class="txt-box">
                <p>
                  창업지역에 딱 맞는 시간대별 메뉴와 <br />
                  운영 방법을 추천 받으세요.
                </p>
              </div>
            </b-tab>
            <b-tab title="신청하기">
              <div class="img-box">
                <div class="mask-box">
                  <img
                    :src="require(`@/assets/images/main_section04_img04.png`)"
                  />
                </div>
              </div>
              <div class="txt-box">
                <p>
                  픽쿡플래너를 통해 자신에게 <br />
                  딱 맞는 창업을 시작해보세요.
                </p>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </section>
      <section class="article-section section05">
        <div class="container">
          <header class="section-title">
            <h3 data-aos="fade-up" data-aos-duration="1000">
              창업의 성공을 위한 첫걸음 <br />
              픽쿡을 지금 시작하세요
            </h3>
          </header>
          <div
            class="section-content"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div class="btn-box text-center">
              <button
                class="btn btn-primary rounded-pill btn-lg shawdow"
                id="bottom-button"
                @click="startQuestions('bottom')"
              >
                <span>원하는 지역의 내 메뉴 찾기</span>
                <span class="icon icon-arrow-right"><BaseArrow /></span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <transition name="slideInUp">
      <button
        v-if="isStickyBtnVisible"
        class="position-fixed fixed-bottom text-center p-4 btn btn-lg btn-primary btn-block rounded-0"
        id="sticky-button"
        @click="startQuestions('sticky_bottom')"
      >
        원하는 지역의 내 메뉴 찾기
      </button>
    </transition>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import debounce from 'lodash/debounce';

@Component({
  name: 'Main',
})
export default class Main extends BaseComponent {
  $refs!: {
    mySwiper: HTMLFormElement;
    tagRef: HTMLFormElement;
  };
  navbarHeight: any = 0;
  private isFnbVideo = false;
  private currentIdx = 0;
  private tagList: any = [
    {
      posX: [2, 2, 3],
      items: [
        {
          text: '아침',
        },
        {
          text: '점심',
        },
        {
          text: '저녁',
        },
        {
          text: '야식',
        },
      ],
    },
    {
      posX: [2, 1, 3],
      items: [
        {
          text: '한식',
        },
        {
          text: '분식',
        },
        {
          text: '치킨',
        },
        {
          text: '피자',
        },
      ],
    },
    {
      posX: [3, 2, 3],
      items: [
        {
          text: '　',
        },
        {
          text: '홀',
        },
        {
          text: '배달',
        },
        {
          text: '　',
        },
      ],
    },
  ];

  private isStickyBtnVisible = false;
  private locationText = '';
  private locationArray = ['강남구 논현동', '영등포구 여의동', '관악구 신림동'];
  private swiperOption: any = {
    slidesPerView: 1,
    loop: true,
    grabCursor: false,
    allowTouchMove: false,
    speed: 700,
    autoplay: {
      delay: 3000,
    },
  };

  get swiper() {
    return this.$refs.mySwiper.$swiper;
  }

  private handleDebouncedScroll: {
    (this: Window, ev: Event): any;
    (this: Window, ev: Event): any;
  } = null;

  onTypeWriter(text: string, idx: number, callback: TimerHandler) {
    if (idx < text.length) {
      this.locationText = text.substring(0, idx + 1);
      setTimeout(() => {
        this.onTypeWriter(text, idx + 1, callback);
      }, 100);
    } else if (typeof callback == 'function') {
      setTimeout(callback, 3000);
    }
  }

  onStartTextAnimation(idx: number) {
    if (typeof this.locationArray[idx] == 'undefined') {
      setTimeout(() => {
        this.onStartTextAnimation(0);
      }, 1000);
    }
    if (idx < this.locationArray.length) {
      this.onTypeWriter(this.locationArray[idx], 0, () => {
        this.onStartTextAnimation(idx + 1);
      });
    }
  }

  onSwipe(varuable: any) {
    let idx = varuable.swiper.activeIndex - 1;
    if (idx > 2) {
      idx = 0;
    }
    return (this.currentIdx = idx);
  }

  handleScroll() {
    const topBtnoffsetTop = document
      .getElementById('top-button')
      .getBoundingClientRect().top;
    const bottomBtnOffsetTop = document
      .getElementById('bottom-button')
      .getBoundingClientRect().top;
    const winHeight = window.innerHeight;
    if (
      topBtnoffsetTop - this.navbarHeight < 0 &&
      bottomBtnOffsetTop - (winHeight - this.navbarHeight) > 0
    ) {
      this.isStickyBtnVisible = true;
    } else {
      this.isStickyBtnVisible = false;
    }
  }

  startQuestions(location?: string) {
    if (!location) location = 'header';
    this.$router.push('/question');
    this.$gtag.event(`go_to_question_${location}`, {
      description: '질문지로 이동',
    });
  }

  created() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  }

  mounted() {
    // TODO :  나중에 util 함수로 옮기기
    const urlQuery = location.search;
    const params = Object.fromEntries(new URLSearchParams(urlQuery));
    if (urlQuery) {
      if (params.isFnbVideo) {
        this.isFnbVideo = true;
      } else {
        this.isFnbVideo = false;
      }
    }

    const target = document.querySelector('.navbar');
    this.navbarHeight = target.getBoundingClientRect().height;
    this.onStartTextAnimation(0);
    this.swiper.on('slideChange', () => {
      this.onSwipe(this);
    });
  }
}
</script>
<style lang="scss">
.app-main {
  .video-wrapper {
    position: relative;
    background-position: center center;
    background-size: cover;
    .video-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100vh;
      &:after {
        display: block;
        content: '';
        background-color: rgba(0, 0, 0, 0.35);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 3;
      }
      video {
        object-fit: cover;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100vh;
        z-index: 2;
      }
      img {
        position: absolute;
        left: 0;
        bottom: 0;
        object-fit: cover;
        height: 100%;
      }
    }
    .title-container {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: #fff;
      text-align: center;
      .symbol {
        img {
          width: 3.5em;
        }
      }
      h2 {
        font-size: 2.1875em;
        font-weight: bold;
        line-height: 1.3;
      }
      p {
        font-size: 1.25em;
        margin-top: 1em;
      }
      .btn-box {
        margin-top: 5em;
      }
    }
    .btn-scroll-down {
      position: absolute;
      bottom: 2.5em;
      left: 50%;
      margin-left: -0.75em;
      z-index: 10;
      animation: animated-mouse 1s ease-in-out infinite;
      svg {
        width: 1.5em;
        height: 1.5em;
        fill: white;
      }
    }
  }
  .article-section {
    padding: 5em 0;
    .section-title {
      text-align: center;
      h3 {
        font-size: 1.5em;
        font-weight: bold;
        line-height: 1.4;

        + p {
          font-size: 1em;
          margin-top: 1.25em;
        }
      }
      .title-en {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5em;
      }
      + .section-content {
        margin-top: 3em;
      }
    }

    &.section04 {
      .tabs {
        position: relative;
        .nav-tabs {
          position: absolute;
          bottom: 5.625em;
          left: 0;
          right: 0;
          border: 0;
          .nav-item {
            .nav-link {
              position: relative;
              border: 0;
              background: 0;
              color: #acacac;
              font-size: 1em;
              padding: 0.625em 0;
              margin: 0 1em;
              outline: none !important;
              &.active {
                font-weight: 800;
                color: #2140a3;
                &:before {
                  display: block;
                  content: '';
                  position: absolute;
                  bottom: 0;
                  left: 0;
                  width: 100%;
                  height: 0.25em;
                  background: #2140a3;
                  border-radius: 1.5em;
                }
              }
            }
          }
        }
        .tab-content {
          .tab-pane {
            &.active {
              .mask-box {
                img {
                  animation: slideInUp 0.6s ease-out forwards;
                }
              }
            }
          }
          .img-box {
            text-align: center;
            max-width: 25em;
            margin: 0 auto;
            .mask-box {
              position: relative;
              padding-bottom: 96%;
              overflow: hidden;

              img {
                position: absolute;
                bottom: -20%;
                left: 0;
                width: 100%;
              }
            }
          }
          .txt-box {
            text-align: center;
            margin-top: 5.625em;
            p {
              font-size: 1.125em;
            }
          }
        }
      }
    }

    &.section05 {
      .section-title {
        h3 {
          font-size: 1.5em;
          font-weight: 400;
          line-height: 1.4;
        }
      }
    }

    .search-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border: 1px solid #707070;
      border-radius: 2.5em;
      width: 18em;
      height: 2.875em;
      font-weight: 500;
      padding: 0 1.25em;
      margin: 0 auto;

      .search-keyword {
        font-size: 1.25em;
      }

      .icon-search {
        fill: #707070;
      }

      .cursor {
        margin-left: 0.05em;
        border-right: 0.05em solid;
        animation: caret 1s steps(1) infinite;
      }
    }

    .tag-box {
      margin: 2.5em auto;
      .row-box {
        margin-top: 1em;
      }
      .tags {
        position: relative;
        display: flex;
        justify-content: center;
        max-width: 20em;
        margin: 0 auto;
        .tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 25%;
          height: 1.875em;
          font-size: 1em;
          color: #707070;
          z-index: 2;
          transition: all 1s ease;

          &.is-active {
            color: #fff;
            font-weight: 500;
          }

          &.is-selected {
            position: absolute;
            top: 0;
            background: #004d8a;
            border-radius: 2.5em;
            z-index: 1;
          }
        }
      }
    }

    .mockup-box {
      .mockup-card {
        width: 17.5em;
        max-width: 280px;
        overflow: hidden;
        margin: 0 auto;
        border-radius: 1.25em;
        .swiper-container {
          border-radius: 1.25em;
          overflow: hidden;
        }
        figure {
          img {
            display: block;
            width: 100%;
          }
        }
      }
    }
  }

  @media screen and (min-width: 1200px) {
    .article-section {
      &.section03 {
        .container {
          max-width: 1400px;
        }
      }
      &.section04 {
        .tabs {
          .tab-content {
            .img-box {
              max-width: 428px;
            }
          }
        }
      }
    }
  }
}
@keyframes caret {
  50% {
    border-color: transparent;
  }
}

@keyframes slideInUp {
  0% {
    bottom: -20%;
  }
  100% {
    bottom: 0;
  }
}
</style>
