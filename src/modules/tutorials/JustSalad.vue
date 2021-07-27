<template>
  <article class="video-container" @keyup="keyup($event)">
    <b-row>
      <b-col cols="12" lg="8">
        <div class="video-wrapper">
          <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
          >
          </video-player>
        </div>
      </b-col>
      <b-col cols="12" xl="4">
        <div class="chapter-list">
          <div
            v-for="(chapter, index) in chapterList"
            :key="index"
            class="border p-4 my-4 bg-white"
            @click="onMoveChapter(chapter.time)"
          >
            <b-badge>{{ chapter.time | secondsToMinutesTransformer }}</b-badge>
            <span class="ml-2">{{ chapter.title }}</span>
          </div>
        </div>
      </b-col>
    </b-row>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

@Component({
  name: 'JustSalad',
  components: {
    videoPlayer,
  },
})
export default class JustSalad extends BaseComponent {
  private chapterList = [
    {
      title: '01 재료 새척',
      time: 16,
    },
    {
      title: '02 재료 손질',
      time: 85,
    },
    {
      title: '03 재료 조리',
      time: 298,
    },
    {
      title: '04 재료 담기',
      time: 484,
    },
  ];

  private playerOptions = {
    controlBar: {
      volumePanel: { inline: true },
    },
    autoplay: false,
    language: 'en',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [
      {
        type: 'video/mp4',
        src:
          'https://kr.object.ncloudstorage.com/common-storage-pickcook/recipes/recipe_just_salad.mp4',
      },
    ],
    poster:
      'https://kr.object.ncloudstorage.com/common-storage-pickcook/recipes/recipe_just_salad_thumb.jpg',
  };

  get player() {
    return (this.$refs.videoPlayer as any).player;
  }

  onMoveChapter(time: number) {
    this.player.currentTime(time);
    this.player.play();
  }

  skipNext() {
    console.log('skip next');
    const time = 10;
    this.player.cache_.currentTime !== 0
      ? (this.player.cache_.currentTime += time)
      : 1;
    this.player.currentTime(this.player.cache_.currentTime);
    this.player.play();
  }

  keyup(key?: any) {
    console.log(key);
    const vol = 0.1; //1 stands for 100% volume, each increase or decrease 0.1
    const time = 10; //unit second, each increase or decrease 10 seconds
    // press up
    if (key.keyCode == 38) {
      this.player.cache_.lastVolume !== 1
        ? (this.player.cache_.lastVolume += vol)
        : 1;
      this.player.volume(this.player.cache_.lastVolume);
    }
    // press down
    if (key.keyCode == 40) {
      this.player.cache_.lastVolume !== 0
        ? (this.player.cache_.lastVolume -= vol)
        : 1;
      this.player.volume(this.player.cache_.lastVolume);
    }
    // Press the left button
    if (key.keyCode == 37) {
      this.player.cache_.currentTime !== 0
        ? (this.player.cache_.currentTime -= time)
        : 1;
      this.player.currentTime(this.player.cache_.currentTime);
    }
    // right click
    if (key.keyCode == 39) {
      this.player.cache_.currentTime !== this.player.cache_.duration
        ? (this.player.cache_.currentTime += time)
        : 1;
      this.player.currentTime(this.player.cache_.currentTime);
    }
  }

  mounted() {
    document.addEventListener('keyup', this.keyup);
  }

  beforeDestroy() {
    document.removeEventListener('keyup', this.keyup);
  }
}
</script>
<style lang="scss">
.video-container {
  padding: 4em;
  background: #f5f5f5;
  .video-wrapper {
    position: relative;
    .video-player {
      padding-bottom: 56.25%;
      .video-js {
        position: absolute;
        width: 100% !important;
        height: 100% !important;
      }
    }
  }
}
</style>
