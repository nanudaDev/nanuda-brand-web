<template>
  <article
    class="video-container"
    :class="{ 'is-active': isVisibleChapter }"
    @keyup.stop.prevent="keyup($event)"
  >
    <div class="video-wrapper">
      <video-player
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        :controls="true"
        @loadeddata="onPlayerLoadeddata($event)"
      >
      </video-player>
    </div>
    <div class="d-block d-lg-none">
      <div class="chapter-title">
        <div>
          <h2>저스트 샐러드 레시피</h2>
          <p>
            수강 기한 : 무제한 <br />
            <span>강의 수 : {{ chapterList.length }}강</span>
            <span class="mx-2">|</span>
            <span>시간 :{{ totalTime }}분</span>
          </p>
        </div>
      </div>
    </div>
    <div class="chapter-wrapper">
      <div class="d-block d-lg-none">
        <div class="chapter-handle" @click="onToggleChanpter()">
          <span class="handle-bar"></span>
        </div>
      </div>
      <div class="d-none d-lg-block">
        <div class="chapter-title">
          <div>
            <h2>저스트 샐러드 레시피</h2>
            <p>
              수강 기한 : 무제한 <br />
              <span>강의 수 : {{ chapterList.length }}강</span>
              <span class="mx-2">|</span>
              <span>시간 :{{ totalTime }}분</span>
            </p>
          </div>
        </div>
      </div>
      <div class="chapter-list">
        <div
          v-for="(chapter, index) in chapterList"
          :key="index"
          class="border p-4 my-4 bg-light d-flex justify-content-between"
          @click="onMoveChapter(chapter.time)"
        >
          <span class="ml-2">{{ chapter.title }}</span>
          <b-badge variant="primary">{{
            chapter.time | secondsToMinutesTransformer
          }}</b-badge>
        </div>
      </div>
    </div>
    <span
      @click="onToggleChanpter()"
      class="btn btn-sm  btn-outline-white btn-toggle-chapter"
      >{{ !isVisibleChapter ? '열기' : '닫기' }}</span
    >
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
  private isVisibleChapter = true;
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
      volumePanel: true,
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

  private totalTime = 0;
  onPlayerLoadeddata(event?: EventTarget) {
    if (this.player.cache_) {
      this.totalTime = this.player.cache_.duration;
    }
  }

  onToggleChanpter() {
    this.isVisibleChapter = !this.isVisibleChapter;
  }

  onMoveChapter(time: number) {
    this.player.currentTime(time);
    this.player.play();
  }

  keyup(key?: any) {
    const vol = 0.1;
    const time = 10;

    // press up
    if (key.keyCode === 38) {
      this.player.cache_.lastVolume !== 1
        ? (this.player.cache_.lastVolume += vol)
        : 1;
      this.player.volume(this.player.cache_.lastVolume);
    }

    // press down
    if (key.keyCode === 40) {
      this.player.cache_.lastVolume !== 0
        ? (this.player.cache_.lastVolume -= vol)
        : 1;
      this.player.volume(this.player.cache_.lastVolume);
    }

    // Press the left button
    if (key.keyCode === 37) {
      this.player.cache_.currentTime !== 0
        ? (this.player.cache_.currentTime -= time)
        : 1;
      this.player.currentTime(this.player.cache_.currentTime);
    }

    // right click
    if (key.keyCode === 39) {
      this.player.cache_.currentTime !== this.player.cache_.duration
        ? (this.player.cache_.currentTime += time)
        : 1;
      this.player.currentTime(this.player.cache_.currentTime);
    }

    // Press the space bar button
    if (key.keyCode === 32) {
      if (!this.player.paused()) {
        this.player.pause();
      } else {
        this.player.play();
      }
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
@import '@/assets/scss/common.scss';
.video-container {
  display: flex;
  overflow: hidden;
  flex-wrap: wrap;
  .video-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #000;
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    .video-player {
      position: relative;
      width: 100%;
      height: inherit;
      .video-js {
        position: absolute;
        width: 100% !important;
        height: 100% !important;
        .vjs-big-play-button {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .chapter-wrapper {
    position: relative;
    width: 0;
    height: 100vh;
    overflow: hidden;
    z-index: 5;
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    // transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    // transform: translate(100%, 0);

    .chapter-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: $primary;
      border-bottom: 1px solid $border-color;
      border-top-right-radius: 1em;
      border-top-left-radius: 1em;
      height: 3em;
      .handle-bar {
        display: block;
        width: 4em;
        height: 0.5em;
        background-color: $white;
        border-radius: 1em;
      }
    }
    .chapter-title {
      position: relative;
      z-index: 2;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 8em;
      background-color: $primary;
      color: $white;
      padding: 1.25em;
      box-shadow: $shadow;
      h2 {
        font-size: $txt-large;
        font-weight: $txt-bold;
      }
      p {
        font-size: $txt-small;
        margin-top: 1em;
      }
    }
    .chapter-list {
      padding: 1.25em;
      height: calc(100% - 8em);
      background-color: #fff;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
  .btn-toggle-chapter {
    position: absolute;
    right: 1.25em;
    top: 1.25em;
    z-index: 5;
  }

  &.is-active {
    .video-wrapper {
      width: calc(100% - 500px);
    }
    .chapter-wrapper {
      width: 500px;
      // transform: translate(0, 0);
      .chapter-handle {
        background-color: $white;
        .handle-bar {
          background-color: $border-color;
        }
      }
    }
  }
}
@media screen and (max-width: 992px) {
  .video-container {
    flex-direction: column;
    .video-wrapper {
      width: 100% !important;
      height: 54vw;
    }
    .chapter-wrapper {
      position: fixed;
      width: 100% !important;
      bottom: 0;
      height: 75vh;
      box-shadow: 0 -0.5em 0.25em rgba(0, 0, 0, 0.05);
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform: translate(0, calc(100% - 3em));
      .chapter-list {
        height: calc(100% - 3em);
      }
    }
    &.is-active {
      .chapter-wrapper {
        transform: translate(0, 0);
      }
    }
  }
}
</style>
