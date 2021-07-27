<template>
  <div>
    <article class="main-article">
      저스트 샐러드 튜토리얼
    </article>
    <b-row>
      <b-col cols="12" lg="6">
        <div class="player">
          <video-player
            class="vjs-custom-skin"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
          >
          </video-player>
        </div>
      </b-col>
      <b-col cols="12" lg="6">
        <b-row>
          <button @click="onBtnClicked(10)">10초로 이동</button>
        </b-row>
        <b-row>
          <button @click="onBtnClicked(60)">60초로 이동</button>
        </b-row>
        <b-row>
          <button @click="onBtnClicked(120)">120초로 이동</button>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import 'video.js/dist/video-js.css';

import { videoPlayer } from 'vue-video-player';

@Component({
  name: 'JustSalad',
  components: { videoPlayer },
})
export default class JustSalad extends BaseComponent {
  private playerOptions = {
    height: '360',
    autoplay: false,
    // muted: true,
    language: 'en',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [
      {
        type: 'video/mp4',
        // mp4
        src:
          'https://kr.object.ncloudstorage.com/common-storage-pickcook/recipes/recipe_just_salad.mp4',
        // webm
        // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
      },
    ],
    poster:
      'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg',
  };
  get player() {
    return (this.$refs.videoPlayer as any).player;
  }

  onBtnClicked(second: number) {
    this.player.currentTime(second);
  }
}
</script>
