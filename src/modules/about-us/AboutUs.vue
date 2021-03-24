<template>
  <article class="main-article">
    <header class="article-header">
      <div class="container">
        <h2 data-aos="fade-down" data-aos-duration="1000">
          상권 분석 시스템을 토대로 <br />
          실패 없는 창업을 안내합니다
        </h2>
        <p data-aos="fade-up" data-aos-duration="1000">
          픽쿡은 창업자가 원하는 지역에 <br />
          예상 방문객, 예상 매출액등을 <br />
          미리 살펴 창업의 성장에 함께합니다.
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
              고객입니다
            </h3>
          </header>
          <div
            class="section-content"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <p>
              픽쿡은 여러분의 가게가 위치한 곳의 고객이 <br />
              어떤 것을 선호하는지, 어떻게 소비하는지를 분석하고
              <br />제공합니다. 빠르게 변화하는 내 상권의 트렌드를 가장 <br />
              빠르게 알 수 있습니다.
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
            <h3>픽쿡은 가장 필요한메뉴와 <br />서비스를 드립니다</h3>
          </header>
          <div
            class="section-content"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <p>
              픽쿡은 고객과 상권 정보를 바탕으로 공정이 쉽고<br />
              비용율이 낮은 메뉴를 제공합니다. <br />
              픽쿡의 솔루션은 가장 낮은 비용으로 가장 높은<br />
              효과를 지향합니다.
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
