<template>
  <article class="main-article">
    <div class="video-wrapper">
      <div class="video-container">
        <video
          autoplay
          playsInline
          videoHeight
          poster=""
          loop
          id="main-video"
          ref="videoRef"
          class="video"
        >
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
          <h2>목표 달성에 도달하는 것에 <br />이보다 더 쉬울 수 없어요</h2>
          <p>
            상권분석, 교육, 메뉴얼, 전략, 다양한 교차 창업까지<br />
            한 번에 해결 가능합니다.
          </p>
        </div>
      </div>
    </div>
    <div class="content-wrapper">
      <section class="article-section">
        <div class="container">
          <header class="section-title">
            <h3>
              NND 플랜은 000,000,000개의 <br />
              다양한 제휴 브랜드와 함께 하고 있습니다
            </h3>
          </header>
          <div class="section-content">
            <div class="row align-items-center">
              <div class="col-xs-12 col-md-6 col-lg-3" v-for="n in 8" :key="n">
                <div class="bg-secondary text-center p-4 my-3">
                  {{ n + 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section bg-light pb-0">
        <header class="section-title">
          <span class="d-block mb-2">NANUDA BRAND</span>
          <h3>
            예비 혹은 기존 사장님의 상황을 파악하여 <br />적합한 창업 플랜을
            추천해드립니다
          </h3>
        </header>
        <div class="section-content">
          <div class="section-content-container py-5">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-xs-12 col-lg-6">
                  <figure>
                    <img
                      src="https://www.searchpng.com/wp-content/uploads/2018/12/iPhone-Wireframe-715x715.png"
                      alt=""
                    />
                  </figure>
                </div>
                <div class="col-xs-12 col-lg-6">
                  <div>
                    <h4>상권분석을 통한 메뉴 추천</h4>
                    <p class="mt-2">
                      부가 설명 부가 설명 부가 설명 부가 설명 부가 설명 부가
                      설명 부가 설명 부가 설명 부가 설명 부가 설명 부가 설명
                      부가 설명 부가 설명 부가 설명 부가 설명 부가 설명
                    </p>
                    <div class="mt-4">
                      <button
                        class="btn btn-outline-primary btn-lg rounded-pill"
                      >
                        더 알아보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section-content-container py-5 bg-white">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-xs-12 col-lg-6 order-md-2">
                  <figure>
                    <img
                      src="https://www.searchpng.com/wp-content/uploads/2018/12/iPhone-Wireframe-715x715.png"
                      alt=""
                    />
                  </figure>
                </div>
                <div class="col-xs-12 col-lg-6 order-md-1">
                  <div>
                    <h4>상권분석을 통한 메뉴 추천</h4>
                    <p class="mt-2">
                      부가 설명 부가 설명 부가 설명 부가 설명 부가 설명 부가
                      설명 부가 설명 부가 설명 부가 설명 부가 설명 부가 설명
                      부가 설명 부가 설명 부가 설명 부가 설명 부가 설명
                    </p>
                    <div class="mt-4">
                      <button
                        class="btn btn-outline-primary btn-lg rounded-pill"
                      >
                        더 알아보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section-content-container py-5 bg-light">
            <div class="container">
              <div class="row my-3">
                <div class="col-xs-12 col-md-4">
                  <figure>
                    <img src="https://i.stack.imgur.com/y9DpT.jpg" alt="" />
                  </figure>
                </div>
                <div class="col-xs-12 col-md-8">
                  <div class="py-2">
                    <h4>타이틀</h4>
                    <p class="mt-2">
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명
                    </p>
                  </div>
                </div>
              </div>
              <div class="row my-3">
                <div class="col-xs-12 col-md-4">
                  <figure>
                    <img src="https://i.stack.imgur.com/y9DpT.jpg" alt="" />
                  </figure>
                </div>
                <div class="col-xs-12 col-md-8">
                  <div class="py-2">
                    <h4>타이틀</h4>
                    <p class="mt-2">
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명
                    </p>
                  </div>
                </div>
              </div>
              <div class="row my-3">
                <div class="col-xs-12 col-md-4">
                  <figure>
                    <img src="https://i.stack.imgur.com/y9DpT.jpg" alt="" />
                  </figure>
                </div>
                <div class="col-xs-12 col-md-8">
                  <div class="py-2">
                    <h4>타이틀</h4>
                    <p class="mt-2">
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명
                    </p>
                  </div>
                </div>
              </div>
              <div class="row my-3">
                <div class="col-xs-12 col-md-4">
                  <figure>
                    <img src="https://i.stack.imgur.com/y9DpT.jpg" alt="" />
                  </figure>
                </div>
                <div class="col-xs-12 col-md-8">
                  <div class="py-2">
                    <h4>타이틀</h4>
                    <p class="mt-2">
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명 설명 설명 설명
                      설명 설명 설명 설명 설명 설명 설명 설명
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section-content-container py-5 bg-white">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-xs-12 col-lg-6 order-md-2">
                  <figure>
                    <img
                      src="https://www.searchpng.com/wp-content/uploads/2018/12/iPhone-Wireframe-715x715.png"
                      alt=""
                    />
                  </figure>
                </div>
                <div class="col-xs-12 col-lg-6 order-md-1">
                  <div>
                    <h4>상권분석을 통한 메뉴 추천</h4>
                    <p class="mt-2">
                      부가 설명 부가 설명 부가 설명 부가 설명 부가 설명 부가
                      설명 부가 설명 부가 설명 부가 설명 부가 설명 부가 설명
                      부가 설명 부가 설명 부가 설명 부가 설명 부가 설명
                    </p>
                    <div class="mt-4">
                      <button
                        class="btn btn-outline-primary btn-lg rounded-pill"
                      >
                        더 알아보기
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="article-section border-top">
        <div class="container">
          <header class="section-title">
            <h3>
              NND 창업 플랜을 통해 원하는 목표에 도달하세요
            </h3>
          </header>
          <div class="section-content">
            <figure class="text-center">
              <img src="https://i.stack.imgur.com/y9DpT.jpg" alt="" />
            </figure>
            <div class="text-center mt-4">
              <button class="btn btn-primary btn-lg rounded-pill">
                NND 창업 플랜 신청하기
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import Component from 'vue-class-component';
@Component({
  name: 'Main',
})
export default class Main extends BaseComponent {
  playVideo() {
    // const audioPlayer: HTMLVideoElement = document.getElementById('man-video');
    // audioPlayer.play();
  }
  mounted() {
    this.playVideo();
  }
}
</script>
<style lang="scss">
.video-wrapper {
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
      font-size: 48px;
      font-weight: bold;
    }
    p {
      font-size: 20px;
      margin-top: 16px;
    }
  }
}
.article-section {
  padding: 4em 0;
  .section-title {
    text-align: center;
    .title-en {
      display: block;
      font-weight: bold;
      margin-bottom: 8px;
    }
    + .section-content {
      margin-top: 48px;
    }
  }
}
</style>
