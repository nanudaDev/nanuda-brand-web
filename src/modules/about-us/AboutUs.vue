<template>
  <article class="main-article">
    <header class="article-header">
      <div class="container">
        <h2 data-aos="fade-down" data-aos-duration="1000">
          빅데이터 상권분석으로 <br />실패 없는 창업을 시작하세요
        </h2>
        <p data-aos="fade-up" data-aos-duration="1000">
          픽쿡은 창업자가 원하는 지역의 <br />고객 정보부터 시간에 따른 매출
          변화를<br />분석하여 확실한 창업아이템을 안내드려요
        </p>
        <button
          class="btn-scroll-down"
          v-scroll-to="{ el: '#content-wrapper', offset: -navbarHeight }"
        >
          <span class="icon icon-white"><BaseArrow /></span>
        </button>
      </div>
    </header>
    <div class="article-content" id="content-wrapper">
      <section class="article-section text-lg-center">
        <div class="container">
          <header
            class="section-header"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h3>
              창업할 때 <br />
              가장 중요한 것은 <br class="d-lg-none" />
              무엇일까요?
            </h3>
          </header>
          <div
            class="section-content"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <p>
              <strong>바로 고객이에요.</strong><br />픽쿡은 상권의 고객이 어떤
              메뉴를 선호하고, <br />어떻게 소비하는지 꼼꼼하게 분석해요.
            </p>
            <p>
              빠르게 변화하는 상권의 트렌드는<br />고객이 소비하는 정보에서
              확인할 수 있어요.
            </p>
          </div>
        </div>
      </section>
      <section class="article-section text-lg-center pt-0">
        <div class="container">
          <header
            class="section-header"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h3>픽쿡은 확실한 창업아이템과<br />운영 솔루션을 제공해요.</h3>
          </header>
          <div
            class="section-content"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <p>
              픽쿡은 고객 분석을 바탕으로<br />상권에서 우수한 창업 메뉴를
              추천하고 있어요.
            </p>

            <p>
              또한 픽쿡의 솔루션은 가장 낮은 비용으로<br />효율적인 창업을
              시작하는 방법을 제공해요.
            </p>

            <p>
              월 30만원의 메뉴 솔루션부터<br />꼼꼼한 관리까지 해주는
              케어플러스까지 필요한 것만 골라 시작할 수 있어요.
            </p>
          </div>
        </div>
      </section>
      <section class="article-section text-lg-center">
        <div class="container">
          <!-- TODO: 리뷰 이름  -->
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
              <div
                class="review-box"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="0"
              >
                <div class="info-box row-box">
                  <div class="img-box">
                    <img src="@/assets/images/about_us_review_01.png" alt="" />
                  </div>
                  <div class="txt-box">
                    이지원 사장님 <br />
                    <strong>논현동 한식 운영</strong>
                  </div>
                </div>
                <div class="cont-box row-box">
                  <p>
                    창업 초기부터 픽쿡에 가입했습니다.
                    <br class="d-none d-sm-block d-xl-none" />
                    좋은 아이템만 골라서 초간단 레시피로 3일만에 메뉴를
                    <br class="d-none d-sm-block d-xl-none" />
                    모두 배웠습니다. 공유주방에서 지금 운영하는데
                    <br class="d-none d-sm-block d-xl-none" />
                    주문이 많아서 힘드네요. 행복한 고민입니다.
                  </p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div
                class="review-box"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="300"
              >
                <div class="info-box row-box">
                  <div class="img-box">
                    <img src="@/assets/images/about_us_review_02.png" alt="" />
                  </div>
                  <div class="txt-box">
                    박지홍 사장님 <br />
                    <strong>망원동 치킨 운영</strong>
                  </div>
                </div>
                <div class="cont-box row-box">
                  <p>
                    맨처음 창업할 때부터 이 서비스가 있었다면 좀 더 잘 만들
                    수<br class="d-none d-sm-block d-xl-none" />
                    있었을텐데.. 상권도 모르고 가게 열어서 이제 메뉴 바꾸면서<br
                      class="d-none d-sm-block d-xl-none"
                    />
                    홍보물을 바꾸고 있네요. 정말 필요한 서비스 감사합니다!
                  </p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div
                class="review-box"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="600"
              >
                <div class="info-box row-box">
                  <div class="img-box">
                    <img src="@/assets/images/about_us_review_03.png" alt="" />
                  </div>
                  <div class="txt-box">
                    전지연 사장님 <br />
                    <strong>성수동 분식 운영</strong>
                  </div>
                </div>
                <div class="cont-box row-box">
                  <p>
                    한식을 매장 운영하는데 배달은 픽쿡이 안내한 파스타를<br
                      class="d-none d-sm-block d-xl-none"
                    />
                    판매하고 있습니다. 만들기가 쉬워서 직원들도 곧 잘합니다.<br
                      class="d-none d-sm-block d-xl-none"
                    />
                    여름에 한 번 더 이용하려고 합니다.
                  </p>
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </section>
    </div>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'AboutUs',
})
export default class AboutUs extends BaseComponent {
  navbarHeight: any = 0;
  private swiperOption: any = {
    slidesPerView: 1,
    loop: true,
    grabCursor: false,
    allowTouchMove: true,
    speed: 700,
    autoplay: {
      delay: 5000,
    },
    breakpoints: {
      1200: {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  };

  mounted() {
    const target = document.querySelector('.navbar');
    this.navbarHeight = target.getBoundingClientRect().height;
  }
}
</script>
