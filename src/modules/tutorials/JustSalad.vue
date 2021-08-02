<template>
  <article
    class="video-container"
    :class="{ 'is-active': isVisibleChapter }"
    @contextmenu="onStopCtx($event)"
  >
    <div class="video-wrapper">
      <transition name="fadeIn">
        <div class="video-title" v-if="!isPlaying">
          <h1>저스트샐러드 레시피</h1>
        </div>
      </transition>
      <video-player
        class="video-player-box"
        ref="videoPlayer"
        :options="playerOptions"
        :playsinline="true"
        :controls="true"
        @play="onPlayerPlay($event)"
        @ended="onPlayerEnded($event)"
        @pause="onPlayerPause($event)"
        @loadeddata="onPlayerLoadeddata($event)"
      >
      </video-player>
      <div class="btn-controller">
        <transition name="fadeIn" mode="out-in">
          <div class="btn-controll" v-if="!isStart">
            <div class="btn-start"></div>
          </div>
        </transition>
        <transition name="fadeIn" mode="out-in">
          <div class="btn-controll" v-if="isEnded">
            <div class="btn-restart"></div>
          </div>
        </transition>
      </div>
      <div class="btn-controller">
        <transition name="fadeOutZoomIn">
          <div class="btn-controll btn-start-pause" v-if="isVideoClicked">
            <div class="btn-start" v-if="isPlaying"></div>
            <div class="btn-pause" v-if="!isPlaying"></div>
          </div>
        </transition>
      </div>
    </div>
    <div class="chapter-wrapper">
      <div class="chapter-list-box">
        <div class="chapter-title">
          <div>
            <span class="en-title">JUST SALAD N JUICE</span>
            <h2>레시피 목차</h2>
          </div>
        </div>
        <div class="chapter-list">
          <div
            v-for="(chapterArr, index) in chapterList"
            :key="index"
            class="row-box"
          >
            <div
              class="card rounded"
              v-for="(chapter, childIndex) in chapterArr"
              :key="childIndex"
            >
              <span class="sub-head yoongothic"
                >Chapter {{ index > 8 ? index + 1 : `0${index + 1}` }}
                {{ chapterArr.length > 1 ? `- ${childIndex + 1}` : null }}
              </span>
              <h3 class="headline">
                {{ chapter.title }}
              </h3>

              <div v-if="chapter.trackList" class="track-container">
                <div
                  v-for="(track, trackIndex) in chapter.trackList"
                  :key="trackIndex"
                  class="track-list"
                  :class="
                    chapter.trackList[trackIndex].time < currentTime &&
                    currentTime <
                      (chapter.trackList.length - 1 > trackIndex
                        ? chapter.trackList[trackIndex + 1].time
                        : chapterList[index].length - 1 > childIndex
                        ? chapterList[index][childIndex + 1].trackList[0].time
                        : chapterList.length - 1 > index
                        ? chapterList[index + 1][0].trackList[0].time
                        : totalTime)
                      ? 'is-active'
                      : null
                  "
                  @click="onMoveChapter(track.time)"
                >
                  <span class="track-title">{{ track.subject }}</span>
                  <span class="track-time">
                    <b-icon icon="play-circle-fill" class="icon"></b-icon>
                    <span class="yoongothic txt-tiny ml-2">{{
                      track.time | secondsToMinutesTransformer
                    }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span @click="onToggleChapter()" class="btn-toggle-chapter">
        <span class="icon"><BaseArrow /></span>
        <span class="is-blind"> {{ !isVisibleChapter ? '열기' : '닫기' }}</span>
      </span>
    </div>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component, Watch } from 'vue-property-decorator';
import 'video.js/dist/video-js.css';
import { videoPlayer } from 'vue-video-player';

@Component({
  name: 'JustSalad',
  components: {
    videoPlayer,
  },
})
export default class JustSalad extends BaseComponent {
  private totalTime = 0;
  private isStart = false;
  private isEnded = false;
  private isPlaying = false;
  private isVideoClicked = false;
  private isVisibleChapter = true;
  private currentTime = 0;
  private timeInterval: any = null;
  private chapterList = [
    [
      {
        title: '재료 세척',
        trackList: [
          {
            subject: '재료 세척 방법',
            time: 16,
          },
          {
            subject: '채소 소독 방법',
            time: 79,
          },
        ],
      },
    ],
    [
      {
        title: '재료 손질',
        trackList: [
          {
            subject: '재료 컷팅 및 손질 방법',
            time: 84,
          },
        ],
      },
    ],
    [
      {
        title: '재료 조리',
        trackList: [
          {
            subject: '조리 방법(삶기, 볶기, 굽기, 튀기기)',
            time: 298,
          },
        ],
      },
    ],
    [
      {
        title: '재료 담기',
        trackList: [
          {
            subject: '버섯 샐러드',
            time: 483,
          },
          {
            subject: '리코타 샐러드',
            time: 538,
          },
          {
            subject: '두부병아리콩 샐러드',
            time: 565,
          },
          {
            subject: '닭가슴살 샐러드',
            time: 594,
          },
          {
            subject: '콥 샐러드',
            time: 614,
          },
          {
            subject: '콩고기 샐러드',
            time: 641,
          },
          {
            subject: '구운 연어스테이크 샐러드',
            time: 665,
          },
        ],
      },
      {
        title: '드레싱',
        trackList: [
          {
            subject: '드레싱 만드는 방법 및 담기',
            time: 683,
          },
        ],
      },
    ],
    [
      {
        title: '배달 포장',
        trackList: [
          {
            subject: '배달용 포장 방법',
            time: 695,
          },
        ],
      },
    ],
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
  // private player = (this.$refs.videoPlayer as any).player;

  onPlayerLoadeddata(event?: EventTarget) {
    if (this.player.cache_) {
      this.totalTime = this.player.cache_.duration;
    }
  }

  onPlayerPlay(event?: EventTarget) {
    this.isStart = true;
    this.isPlaying = true;
    this.isEnded = false;
    this.onPlayerClicked();
  }

  onPlayerEnded(event?: EventTarget) {
    this.isEnded = true;
  }

  onPlayerPause(event?: EventTarget) {
    this.isPlaying = false;
    this.onPlayerClicked();
  }

  onPlayerClicked(event?: EventTarget) {
    if (this.isStart) {
      this.isVideoClicked = true;
      setTimeout(() => {
        this.isVideoClicked = false;
      }, 1000);
    }
  }

  onToggleChapter() {
    this.isVisibleChapter = !this.isVisibleChapter;
  }

  onMoveChapter(time: number) {
    this.player.currentTime(time);
    this.player.play();
  }

  onKeyup(key?: any) {
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

  onKeydown(key?: any) {
    // disableclick F12
    if (key.keyCode == 123) {
      key.preventDefault();
      key.returnValue = false;
    }
  }

  onStopCtx(event?: any) {
    // disable mouse right click
    event.preventDefault();
  }

  handleDebouncedResizing() {
    const screenWith = window.innerWidth;

    if (screenWith <= 992) {
      this.isVisibleChapter = true;
    }
  }

  created() {
    window.addEventListener('resize', this.handleDebouncedResizing);
  }

  mounted() {
    this.timeInterval = setInterval(() => {
      this.currentTime = this.player.cache_.currentTime;
    }, 300);
    this.player.on('touchstart', (event: any) => {
      if (event.target.tagName === 'VIDEO') {
        if (!this.player.paused()) {
          this.player.pause();
        } else {
          this.player.play();
        }
      }
    });
    this.handleDebouncedResizing();
    document.addEventListener('keyup', this.onKeyup);
    document.addEventListener('keydown', this.onKeydown);
  }

  beforeDestroy() {
    document.removeEventListener('keyup', this.onKeyup);
    document.removeEventListener('keydown', this.onKeydown);
    window.addEventListener('resize', this.handleDebouncedResizing);
    clearInterval(this.timeInterval);
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
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #000;
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    .video-title {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      padding: 16px 16px;
      color: #fff;
      z-index: 2;
      @include gradientBlack;
      h1 {
        font-size: 20px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .video-player {
      position: relative;
      width: 100%;
      height: inherit;
      margin-top: 0;
      .video-js {
        position: absolute;
        width: 100% !important;
        height: 100% !important;
        .vjs-big-play-button {
          display: none;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .btn-controller {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 80px;
      height: 80px;
      transform: translate(-50%, -50%);
      z-index: 2;
      user-select: none;
      pointer-events: none;
      .btn-controll {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.4);
        font-size: 40px;
        color: #fff;

        &.btn-start-pause {
          opacity: 0;
        }

        .btn-start {
          &:before {
            font-family: 'VideoJS';
            content: '\f101';
            vertical-align: middle;
          }
        }
        .btn-pause {
          &:before {
            font-family: 'VideoJS';
            content: '\f103';
            vertical-align: middle;
          }
        }

        .btn-restart {
          &:before {
            font-family: 'VideoJS';
            content: '\f116';
            vertical-align: middle;
          }
        }
      }
    }
  }
  .chapter-wrapper {
    position: relative;
    width: 0;
    transition: width 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    .chapter-list-box {
      position: relative;
      padding: 32px 24px;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      height: 100vh;
      z-index: 5;
      background-color: #f5f5f5;

      .chapter-title {
        color: $black;
        padding-left: 8px;
        h2 {
          font-size: 20px;
          font-weight: 700;
        }
        .en-title {
          font-size: 10px;
          font-weight: 500;
        }
      }
      .chapter-list {
        margin-top: 24px;
      }
    }

    .btn-toggle-chapter {
      display: flex;
      align-items: center;
      position: absolute;
      right: 100%;
      top: 50%;
      transform: translate(30px, -50%);
      z-index: 4;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #f5f5f5;
      box-shadow: -4px 4px 0.25em rgba(0, 0, 0, 0.05);
      padding-left: 8px;
      .icon {
        transform: rotate(90deg);
        width: 16px;
        fill: #8c8c8c;
      }
    }
  }

  .card {
    padding: 20px 16px;
    box-shadow: $shadow-sm;
    .sub-head {
      font-size: 12px;
      font-weight: 700;
      color: $black;
    }
    .headline {
      font-size: 20px;
      font-weight: 700;
      color: $black;
      margin-top: 4px;
    }
    .track-container {
      margin-top: 8px;
      .track-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 24px 0;
        cursor: pointer;

        + .track-list {
          border-top: 1px solid #e0e0e0;
        }
        &:last-child {
          padding-bottom: 8px;
        }
        .track-title {
          font-size: 16px;
          font-weight: 400;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          padding-right: 4px;
        }
        .track-time {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          .icon {
            color: #8c8c8c;
          }
        }
        &:hover,
        &.is-active {
          color: $blue;
          .icon {
            color: $blue;
          }
        }
      }
    }
  }

  &.is-active {
    .video-wrapper {
      width: calc(100% - 400px);
    }
    .chapter-wrapper {
      width: 400px;
      .btn-toggle-chapter {
        .icon {
          transform: rotate(-90deg);
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
      .video-title {
        h1 {
          font-size: 3vw;
        }
      }
    }
    .chapter-wrapper {
      width: 100% !important;
      height: calc(100vh - 54vw);
      transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform: translate(0, calc(100% - 3em));
      .chapter-list-box {
        padding: 24px 16px;
        height: 100%;
      }

      .card {
        .sub-head {
          font-size: 10px;
        }
        .headline {
          font-size: 16px;
        }
        .track-container {
          .track-list {
            &:last-child {
              padding-bottom: 8px;
            }
            .track-title {
              font-size: 14px;
            }
            .track-time {
              font-size: 12px;
            }
          }
        }
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
