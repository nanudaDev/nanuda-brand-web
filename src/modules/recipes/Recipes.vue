<template>
  <article class="video-container">
    <b-row>
      <b-col cols="12" lg="8">
        <div class="video-wrapper">
          <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            customEventName="customstatechangedeventname"
            @play="onPlayerPlay($event)"
            @pause="onPlayerPause($event)"
            @ready="playerReadied"
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
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Recipes',
})
export default class Recipes extends BaseComponent {
  $refs!: {
    videoPlayer: any;
  };

  private playerOptions = {
    muted: false,
    language: 'kr',
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

  private chapterList = [
    {
      title: '01 재료 새척',
      time: 17,
    },
    {
      title: '02 재료 손질',
      time: 148,
    },
    {
      title: '03 재료 조리',
      time: 300,
    },
  ];

  get player() {
    return this.$refs.videoPlayer.player;
  }

  onPlayerPlay(player: any) {
    console.log('onPlayerPlay');
  }

  onPlayerPause(player: any) {
    console.log('onPlayerPause');
  }

  playerStateChanged(playerCurrentState: any) {
    console.log('playerStateChanged');
  }

  playerReadied(player: any) {
    console.log('the player is readied', player);
  }

  mounted() {
    console.log('this is current player instance object', this.player);
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
