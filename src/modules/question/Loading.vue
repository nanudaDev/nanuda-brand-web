<template>
  <div class="loading-progress-layer">
    <div class="loading-container">
      <div class="text-center">
        <vue-ellipse-progress
          :progress="loadingProgress"
          color="#ffffff"
          empty-color="#ffffff"
          :size="180"
          thickness="5"
          empty-thickness="3"
          line-mode="out 5"
          animation="default 700 1000"
          font-size="3rem"
          font-color="#ffffff"
        >
          <span slot="legend-value">%</span>
        </vue-ellipse-progress>
      </div>
      <div class="mt-4 text-center">
        <p class="txt-large txt-white">
          <template v-if="loadingProgress < 91">
            분석이 진행되고 있어요 <br />
            응답하신 내용과 빅데이터로 <br />상권에 딱 맞는 창업 아이템을
            알려드릴게요
          </template>
          <template v-else>
            거의 완료되었어요 <br />
            이제 결과를 보여드릴게요
          </template>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';

import { Component } from 'vue-property-decorator';
@Component({
  name: 'Loading',
})
export default class Loading extends BaseComponent {
  private loadingProgress = 0;

  mounted() {
    this.loadingProgress = 0;
    const countStart = setInterval(() => {
      if (this.loadingProgress < 79) {
        this.loadingProgress += 5;
      }
    }, 20);

    const countUp = setInterval(() => {
      if (this.loadingProgress < 100) {
        this.loadingProgress++;
      }
    }, 650);

    const countEnd = setInterval(() => {
      if (this.loadingProgress > 96 && this.loadingProgress < 100) {
        this.loadingProgress++;
      }
    }, 400);
  }
}
</script>

<style></style>
