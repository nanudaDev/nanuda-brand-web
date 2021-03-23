<template>
  <article class="main-article">
    <header class="article-header">
      <div class="container">
        <h2>
          픽쿡 플래너와 빅데이터 기반 <br />
          운영 플랜을 가게에 적용하고<br />
          성과를 창출해보세요
        </h2>
        <p>픽쿡의 전문성으로 비즈니스에 <br />새로운 가치를 더해드립니다.</p>
      </div>
    </header>
    <div class="article-content">
      <section class="article-section text-lg-center">
        <div class="container">
          <header class="section-header">
            <h3>
              데이터기반 <br />
              상권진단
            </h3>
            <p>
              빅데이터와 응답 결과를 기반으로 상권의 소비 현황을 <br />
              상세하게 진단합니다.
            </p>
          </header>
          <div class="section-content">
            <figure>
              <img src="@/assets/images/services_img01.png" alt="" />
            </figure>
          </div>
        </div>
      </section>
      <section class="article-section text-lg-center pt-0">
        <div class="container">
          <header class="section-header">
            <h3>
              추천 메뉴 <br />
              운영 플래닝
            </h3>
            <p>
              상권 진단 결과로 추천하는 메뉴를 바로 운영할 수 <br />
              있도록 픽쿡플래너가 안내드립니다.
            </p>
          </header>
          <div class="section-content">
            <figure>
              <img src="@/assets/images/services_img02.png" alt="" />
            </figure>
          </div>
        </div>
      </section>
      <section class="article-section text-lg-center pt-0 pb-0">
        <div class="container">
          <header class="section-header">
            <h3>
              교육<br />
              서비스
            </h3>
            <p>
              메뉴의 교육부터 운영까지 단계별 교육과 함께 <br />
              부가서비스를 제공하며 정기적 상권분석으로 <br />
              트렌드 메뉴 추천까지 픽쿡이 함께합니다.
            </p>
          </header>
          <div class="section-content">
            <figure>
              <img src="@/assets/images/services_img03.png" alt="" />
            </figure>
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
export default class Services extends BaseComponent {}
</script>
