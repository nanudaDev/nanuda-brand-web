<template>
  <article class="main-article">
    <div class="video-wrapper">
      <div class="video-container">
        <video autoplay muted loop id="vid" ref="videoRef" class="video">
          해당 브라우저는 video 태그를 지원하지 않습니다.
          <source
            :src="require('@/assets/video/main_video.mp4')"
            type="video/webm"
          />
          <source
            :src="require('@/assets/video/main_video.mp4')"
            type="video/mp4"
          />
        </video>
      </div>
      <div class="title-container">
        <div>
          <h2>실패없는 창업을<br />안내합니다.</h2>
          <div class="btn-box">
            <button class="btn btn-primary rounded-pill btn-lg shawdow">
              <span>브랜드 진단</span>
              <span class="icon icon-arrow-right"><BaseArrow /></span>
            </button>
          </div>
        </div>
      </div>
      <button
        class="btn-scroll-down"
        v-scroll-to="{ el: '#content-wrapper', offset: -60 }"
      >
        <BaseArrow />
      </button>
    </div>
    ""
    <div class="content-wrapper" id="content-wrapper">
      <section class="article-section section01">
        <div class="container">
          <header class="section-title">
            <h3
              class="text-primary"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              픽쿡은 다양한 제휴사와 <br />
              함께하고 있습니다.
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
        <header class="section-title">
          <h3 class="text-primary" data-aos="fade-up" data-aos-duration="1000">
            픽쿡과 함께하면 <br />
            창업이 쉬워집니다
          </h3>
          <p data-aos="fade-up" data-aos-duration="1500">
            예비 혹은 기존 사장님의 상황을 파악하여 <br />적합한 창업 플랜을
            추천드립니다
          </p>
        </header>
        <div
          class="section-content"
          data-aos="fade-up"
          data-aos-duration="2000"
        >
          <b-tabs align="center">
            <b-tab title="진단하기" active>
              <div class="img-box">
                <div class="mask-box">
                  <img
                    :src="require(`@/assets/images/main_section02_img01.png`)"
                  />
                </div>
              </div>
              <div class="txt-box">
                <p>
                  상권의 시간대별 소비현황과 <br />현재 상황을 세부적으로
                  분석합니다.
                </p>
              </div>
            </b-tab>
            <b-tab title="분석하기">
              <div class="img-box">
                <div class="mask-box">
                  <img
                    :src="require(`@/assets/images/main_section02_img02.png`)"
                  />
                </div>
              </div>
              <div class="txt-box">
                <p>
                  입력한 위치 검색으로 고객, <br />경쟁사, 잘팔리는 업종을
                  진단합니다.
                </p>
              </div>
            </b-tab>
            <b-tab title="추천하기">
              <div class="img-box">
                <div class="mask-box">
                  <img
                    :src="require(`@/assets/images/main_section02_img03.png`)"
                  />
                </div>
              </div>
              <div class="txt-box">
                <p>
                  각자의 조건의 맞는 <br />외식운영 포트폴리오를 제공합니다.
                </p>
              </div>
            </b-tab>
            <b-tab title="실행하기">
              <div class="img-box">
                <div class="mask-box">
                  <img
                    :src="require(`@/assets/images/main_section02_img04.png`)"
                  />
                </div>
              </div>
              <div class="txt-box">
                <p>
                  교육부터 관리까지 한 번에 <br />체계적으로 성장할 수 있도록
                  안내합니다.
                </p>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </section>
      <section class="article-section section03">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-4 py-4">
              <header class="section-title">
                <h3
                  class="text-primary"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  빅데이터를 활용한 <br />
                  전문적인 상권 및 매출 분석
                </h3>
                <p data-aos="fade-up" data-aos-duration="1500">
                  빅데이터를 통한 지역에 맞는 <br />추천 창업을 통한 실패없는
                  창업
                </p>
              </header>
              <div
                class="section-content"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <figure class="img-box text-center">
                  <img src="@/assets/images/main_section03_img01.png" />
                </figure>
              </div>
            </div>
            <div class="col-12 col-lg-4 py-4">
              <header class="section-title">
                <h3
                  class="text-primary"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  전문가 상담을 통해 <br />
                  효율적인 창업을 시작하세요
                </h3>
                <p data-aos="fade-up" data-aos-duration="1500">
                  픽쿡만의 노하우로 효율적이고 <br />
                  안전한 창업을 안내
                </p>
              </header>
              <div
                class="section-content"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <figure class="img-box text-center">
                  <img src="@/assets/images/main_section03_img02.png" />
                </figure>
              </div>
            </div>
            <div class="col-12 col-lg-4 py-4">
              <header class="section-title">
                <h3
                  class="text-primary"
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  레시피 연구소에서 <br />
                  탄생되는 맛있는 음식
                </h3>
                <p data-aos="fade-up" data-aos-duration="1500">
                  픽쿡만의 전문적인 레시피 연구를 통해 <br />
                  맛있고 가성비 좋은 음식 개발
                </p>
              </header>
              <div
                class="section-content"
                data-aos="fade-up"
                data-aos-duration="2000"
              >
                <figure class="img-box text-center">
                  <img src="@/assets/images/main_section03_img03.png" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section section04 bg-light">
        <div class="container">
          <header class="section-title">
            <h3 data-aos="fade-up" data-aos-duration="1000">
              지역별로 쉽게 찾는 <br />
              나에게 맞는 창업 분석
            </h3>
          </header>
          <div
            class="section-content"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <figure class="img-box text-center"></figure>
          </div>
        </div>
      </section>
      <section class="article-section section05">
        <div class="container">
          <header class="section-title">
            <h3 data-aos="fade-up" data-aos-duration="1000">
              픽쿡이 제공하는 솔루션을<br />
              상담을 통해 자세히 알아보세요
            </h3>
          </header>
          <div
            class="section-content"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <div class="btn-box text-center">
              <button class="btn btn-primary rounded-pill btn-lg shawdow">
                <span>상담하기</span>
                <span class="icon icon-arrow-right"><BaseArrow /></span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
    <a
      href=""
      class="position-fixed fixed-bottom text-center p-4 bg-primary text-white"
    >
      나의 창업상태 진단하기
    </a>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
import BaseArrow from '@/modules/_components/svg/BaseArrow.vue';

@Component({
  name: 'Main',
  components: {
    BaseArrow,
  },
})
export default class Main extends BaseComponent {}
</script>
<style lang="scss">
.video-wrapper {
  position: relative;
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
    }
    video {
      object-fit: cover;
      position: absolute;
      top: 0;
      z-index: -10;
      width: 100%;
      height: 100vh;
    }
  }
  .title-container {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    color: #fff;
    text-align: center;
    h2 {
      font-size: 2em;
      font-weight: bold;
      line-height: 1.3;
    }
    p {
      font-size: 20px;
      margin-top: 16px;
    }
    .btn-box {
      margin-top: 10em;
      .btn {
        width: 214px;
        height: 60px;
        font-size: 24px;
        font-weight: 600;
      }
      .icon {
        fill: #fff;
        margin-left: 0.5em;
        transform: rotate(-90deg);
      }
    }
  }
  .btn-scroll-down {
    position: absolute;
    bottom: 40px;
    left: 50%;
    margin-left: -12px;
    z-index: 10;
    animation: animated-mouse 1s ease-in-out infinite;
    svg {
      width: 24px;
      height: 24px;
      fill: white;
    }
  }
}
.article-section {
  padding: 4em 0;
  .section-title {
    text-align: center;
    h3 {
      font-size: 25px;
      font-weight: bold;

      + p {
        font-size: 16px;
        margin-top: 20px;
      }
    }
    .title-en {
      display: block;
      font-weight: bold;
      margin-bottom: 8px;
    }
    + .section-content {
      margin-top: 48px;
    }
  }

  &.section02 {
    .tabs {
      position: relative;
      .nav-tabs {
        position: absolute;
        bottom: 90px;
        left: 0;
        right: 0;
        border: 0;
        .nav-item {
          .nav-link {
            position: relative;
            border: 0;
            background: 0;
            color: #acacac;
            font-size: 17px;
            padding: 10px 0;
            margin: 0 10px;
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
                height: 4px;
                background: #2140a3;
                border-radius: 20px;
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
          max-width: 400px;
          margin: 0 auto;
          .mask-box {
            position: relative;
            padding-bottom: 125%;
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
          margin-top: 90px;
          p {
            font-size: 18px;
          }
        }
      }
    }
  }

  &.section05 {
    .section-title {
      h3 {
        font-size: 20px;
        font-weight: 400;
      }
    }
    .btn-box {
      .btn {
        width: 214px;
        height: 60px;
        font-size: 24px;
        font-weight: 600;
      }
    }
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

@keyframes animated-mouse {
  0% {
    opacity: 0;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(15px);
    -ms-transform: translateY(15px);
    transform: translateY(15px);
  }
}
</style>
