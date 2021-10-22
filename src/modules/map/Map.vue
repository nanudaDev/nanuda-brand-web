<template>
  <naver-maps
    :height="height"
    :width="width"
    :mapOptions="mapOptions"
    @load="onLoad"
    @dragend="onDrag"
    @zoom_changed="onZoomChanged"
    @init_stylemap="onInitStyleMap"
  >
    <naver-info-window
      class="info-window"
      @load="onWindowLoad"
      :isOpen="info"
      :marker="marker"
    >
      <div class="info-window-container" v-if="marker">
        <h1>hello</h1>
      </div>
    </naver-info-window>
    <naver-marker
      :key="i"
      v-for="(marker, i) in showingMarkers"
      :lat="marker.position.y"
      :lng="marker.position.x"
      @click="onMarkerClicked"
    />
  </naver-maps>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import Vue from 'vue/types/umd';
import sosang from '@/assets/test-data/sosangoingin.json';
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
  private sosang = sosang.data;
  private showingMarkers = [];
  private mapOptions = {
    lat: 37,
    lng: 127,
    zoom: 10,
    minZoom: 6,
    maxZoom: 20,
  };
  private heatmapCoords = [
    new window.naver.maps.visualization.WeightedLocation(37.01, 127.01),
    new window.naver.maps.visualization.WeightedLocation(37.01, 127.02),
    new window.naver.maps.visualization.WeightedLocation(37.02, 127.01),
  ];
  // private heatmapCoords: any = [];
  private markers: any = [];
  private heatMap = null;

  updateMarkers() {
    const mapBounds = this.map.getBounds();
    this.showingMarkers = this.markers.filter(e => {
      const position = e.getPosition();
      // console.log('position', position);
      if (mapBounds.hasLatLng(position)) return true;
    });
  }
  startHeatMap() {
    this.heatMap = new window.naver.maps.visualization.HeatMap({
      map: this.map.map,
      data: this.heatmapCoords,
      colorMap: window.naver.maps.visualization.SpectrumStyle.HOT,
    });
  }

  onLoad(vue: any) {
    console.log('naver', window.naver);

    this.map = vue;
    this.sosang.forEach(e => {
      const position = new window.naver.maps.LatLng(e[5], e[4]);

      const marker = new window.naver.maps.Marker({
        map: this.map,
        position: position,
        zIndex: 100,
      });
      this.markers.push(marker);
      // this.heatmapCoords.push(position);
    });
  }
  onWindowLoad(that: any) {
    console.log('that', that);
  }
  onMarkerClicked(event: any) {
    this.info = false;
    this.$nextTick(() => {
      this.info = true;
    });

    this.marker = event.overlay;
  }
  onZoomChanged(zoomLevel: number) {
    console.log('on zoom changed vue', zoomLevel);
    this.updateMarkers();
  }
  onDrag() {
    this.updateMarkers();
    this.info = false;
  }
  onInitStyleMap() {
    this.startHeatMap();
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
