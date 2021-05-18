<template>
  <div class="container">
    <header class="article-header">
      <span data-aos="fade-in" data-aos-duration="1500"
        ><router-link to="/"
          ><img
            src="@/assets/images/logo_w.svg"
            alt="픽쿡"
            class="logo-w"/></router-link
      ></span>
      <h2 data-aos="fade-in" data-aos-duration="1500">
        신청이 완료되었어요
      </h2>
      <p data-aos="fade-in" data-aos-duration="1500">
        담당 플래너가 배정되는대로 <br />
        입력해주신 연락처로 안내드릴게요.
      </p>
      <div
        class="btn-box text-center"
        data-aos="fade-in"
        data-aos-duration="1000"
      >
        <b-btn variant="light" pill size="xl" class="shadow" @click="restart()">
          처음으로
        </b-btn>
      </div>
      <div class="row-box mt-4">
        <router-link to="/" class="txt-sm txt-underline"
          >픽쿡에 대해 더 알아보기
        </router-link>
      </div>
    </header>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';

import { Component } from 'vue-property-decorator';
@Component({
  name: 'Complete',
})
export default class Complete extends BaseComponent {
  restart() {
    this.$root.$emit('restart');
  }
}
</script>

<style></style>
