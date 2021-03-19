<template>
  <article class="main-article">
    <header class="article-header">
      <div class="container">
        <h2>
          상권 분석 시스템을 토대로 <br />
          실패 없는 창업을 안내합니다
        </h2>
        <p>
          픽쿡은 창업자가 원하는 지역에 <br />
          예상 방문객, 예상 매출액등을 <br />
          미리 살펴 창업의 성장에 함께합니다.
        </p>
      </div>
    </header>
    <div class="article-content">
      <section class="article-section text-lg-center">
        <div class="container">
          <header class="section-header">
            <h3>
              창업할 때 <br />
              가장 중요한 것은 <br class="d-lg-none" />
              고객입니다
            </h3>
          </header>
          <div class="section-content">
            <p>
              픽쿡은 고객이 어떤 것을 선호하는지, 어떻게 소비하는지,
              <br />그리고 어떻게 변화하는지에 대한 상권 정보를 제공하고
              <br />그변화에 맞는 메뉴와 솔루션을 드립니다. <br />그고객이
              선호하는 메뉴를 추가하여 매출을 올리세요.
            </p>
          </div>
        </div>
      </section>
      <section class="article-section text-lg-center pt-0">
        <div class="container">
          <header class="section-header">
            <h3>
              원하는 메뉴와 <br />
              부가서비스를 <br class="d-lg-none" />
              한 번에
            </h3>
          </header>
          <div class="section-content">
            <p>
              픽쿡은 사장님의 운영상황을 상권 정보와 함께 분석하여 <br />
              조리가 쉽고 식자재 비용이 낮은 메뉴를 제공합니다. <br />
              추가 인력 없이 원하시는 메뉴와 부가서비스를 <br />
              픽쿡에서 한 번에 이용하세요.
            </p>
          </div>
        </div>
      </section>
      <section class="article-section text-lg-center">
        <div class="container">
          <!-- TODO: 리뷰 이름 , 운영 수정 필요 -->
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
              <div class="review-box">
                <div class="info-box row-box">
                  <div class="img-box">
                    <img src="@/assets/images/icon_logo_symbol.svg" alt="" />
                  </div>
                  <div class="txt-box">
                    이지원 예비사장님 <br />
                    <strong>논현동 한식 운영</strong>
                  </div>
                </div>
                <div class="cont-box row-box">
                  <p>
                    픽쿡은 사장님의 운영상황을 상권 정보와 함께 분석하여
                    <br class="d-xl-none" />
                    조리가 쉽고 식자재 비용이 낮은 메뉴를 제공합니다.
                    <br class="d-xl-none" />
                    추가 인력 없이 원하시는 메뉴와 부가서비스를
                    <br class="d-xl-none" />
                    픽쿡에서 한 번에 이용하세요.
                  </p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="review-box">
                <div class="info-box row-box">
                  <div class="img-box">
                    <img src="@/assets/images/icon_logo_symbol.svg" alt="" />
                  </div>
                  <div class="txt-box">
                    이지원 예비사장님 <br />
                    <strong>논현동 한식 운영</strong>
                  </div>
                </div>
                <div class="cont-box row-box">
                  <p>
                    맨처음 창업할 때부터 이 서비스가 있었다면 좀 더 잘 만들
                    수<br class="d-xl-none" />
                    있었을텐데.. 상권도 모르고 가게 열어서 이제 메뉴 바꾸면서<br
                      class="d-xl-none"
                    />
                    홍보물을 바꾸고 있네요. 정말 필요한 서비스 감사합니다!
                  </p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="review-box">
                <div class="info-box row-box">
                  <div class="img-box">
                    <img src="@/assets/images/icon_logo_symbol.svg" alt="" />
                  </div>
                  <div class="txt-box">
                    이지원 예비사장님 <br />
                    <strong>논현동 한식 운영</strong>
                  </div>
                </div>
                <div class="cont-box row-box">
                  <p>
                    한식을 매장 운영하는데 배달은 픽쿡이 안내한 파스타를<br
                      class="d-xl-none"
                    />
                    판매하고 있습니다. 만들기가 쉬워서 직원들도 곧 잘합니다.<br
                      class="d-xl-none"
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
}
</script>
