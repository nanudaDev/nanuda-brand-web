<template>
  <article class="main-article">
    <header class="article-header">
      <div class="container">
        <h2 data-aos="fade-down" data-aos-duration="1000">
          픽쿡 플래너와 빅데이터 기반 <br />
          운영 플랜을 가게에 적용하고<br />
          성과를 창출해보세요
        </h2>
        <p data-aos="fade-up" data-aos-duration="1000">
          픽쿡의 전문성으로 비즈니스에 <br />새로운 가치를 더해드립니다.
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
        <header class="section-header">
          <div class="container">
            <h3 data-aos="fade-up" data-aos-duration="1000">
              데이터기반 <br />
              상권진단
            </h3>
            <p data-aos="fade-up" data-aos-duration="1000">
              빅데이터와 응답 결과를 기반으로 <br />상권의 소비 현황을 상세하게
              진단합니다.
            </p>
          </div>
        </header>
        <div class="section-content">
          <div class="container">
            <figure data-aos="fade-up" data-aos-duration="1000">
              <img
                src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/services_img01.png"
                alt=""
              />
            </figure>
          </div>
        </div>
      </section>
      <section class="article-section text-lg-center">
        <header class="section-header">
          <div class="container">
            <h3 data-aos="fade-up" data-aos-duration="1000">
              추천 메뉴 <br />
              운영 플래닝
            </h3>
            <p data-aos="fade-up" data-aos-duration="1000">
              상권 진단 결과로 추천하는 메뉴를 바로 운영할 수 <br />
              있도록 픽쿡플래너가 안내드립니다.
            </p>
          </div>
        </header>
        <div class="section-content">
          <div class="container">
            <figure data-aos="fade-up" data-aos-duration="1000">
              <img
                src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/services_img02.png"
                alt=""
              />
            </figure>
          </div>
        </div>
      </section>
      <section class="article-section text-lg-center">
        <header class="section-header">
          <div class="container">
            <h3 data-aos="fade-up" data-aos-duration="1000">
              교육<br />
              서비스
            </h3>
            <p data-aos="fade-up" data-aos-duration="1000">
              메뉴의 교육부터 운영까지 단계별 교육과 함께 <br />
              부가서비스를 제공하며 정기적 상권분석으로 <br />
              트렌드 메뉴 추천까지 픽쿡이 함께합니다.
            </p>
          </div>
        </header>
        <div class="section-content">
          <div class="container">
            <figure data-aos="fade-up" data-aos-duration="1000">
              <img
                src="https://kr.object.ncloudstorage.com/common-storage-pickcook/main/services_img03.png"
                alt=""
              />
            </figure>
          </div>
        </div>
      </section>
      <section class="article-section text-center py-5  bg-dark">
        <div class="container py-5">
          <h3 data-aos="fade-up" data-aos-duration="1000" class="txt-white">
            창업의 성공을 위한 첫걸음 <br />
            픽쿡을 지금 시작하세요
          </h3>
          <div
            class="btn-box text-center mt-5"
            data-aos="fade-up"
            data-aos-duration="2000"
          >
            <button
              class="btn btn-primary rounded-pill btn-lg shawdow"
              id="bottom-button"
              @click="startQuestions('service_page')"
            >
              <span>원하는 지역의 내 메뉴 찾기</span>
              <span class="icon icon-arrow-right"><BaseArrow /></span>
            </button>
          </div>
        </div>
      </section>
    </div>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'Services',
})
export default class Services extends BaseComponent {
  navbarHeight: any = 0;

  startQuestions(location?: string) {
    if (!location) location = 'header';
    this.$router.push('/question');
    this.$gtag.event(`go_to_question_${location}`, {
      description: '질문지로 이동',
    });
  }

  mounted() {
    const target = document.querySelector('.navbar');
    this.navbarHeight = target.getBoundingClientRect().height;
  }
}
</script>
