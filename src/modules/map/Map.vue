<template>
  <naver-maps
    :height="height"
    :width="width"
    :mapOptions="mapOptions"
    @load="onLoad"
    @dragstart="info = false"
    @zoom_changed="info = false"
  >
    <naver-info-window
      class="info-window"
      @load="onWindowLoad"
      :isOpen="info"
      :marker="marker"
    >
      <div class="info-window-container" v-if="marker">
        <h1>{{ `x: ${marker.position.x} y: ${marker.position.y}` }}</h1>
      </div>
    </naver-info-window>
    <naver-marker
      :lat="37"
      :lng="127"
      @click="onMarkerClicked"
      @load="onMarkerLoaded"
    />
    <naver-marker
      :lat="37.2"
      :lng="127.4"
      @click="onMarkerClicked"
      @load="onMarkerLoaded"
    />
  </naver-maps>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
@Component({
  name: 'Map',
})
export default class Map extends BaseComponent {
  private width = 1400;
  private height = 800;
  private info = false;
  private marker: any = null;
  private count = 1;
  private map: any = null;
  private isCTT = false;
  private mapOptions = {
    lat: 37,
    lng: 127,
    zoom: 10,
  };
  onLoad(vue: any) {
    console.log('onLoad');
    console.log('vue', vue);
    this.map = vue;

    console.log('this.map', this.map);
  }
  onWindowLoad(that: any) {
    console.log('that', that);
  }
  onMarkerClicked(event: any) {
    console.log('event', event);
    this.info = false;
    this.$nextTick(() => {
      this.info = true;
    });

    this.marker = event.overlay;
  }
  onMarkerLoaded(vue: any) {
    console.log('vue', vue);
    this.marker = vue.marker;
    console.log(' vue.marker', vue.marker);
  }
}
</script>

<style scoped>
.info-window-container {
  padding: 10px;
  width: 300px;
  height: 100px;
}
</style>
