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
        <h1>{{ infoContent }}</h1>
      </div>
    </naver-info-window>
    <naver-marker
      :key="i"
      v-for="(marker, i) in showingMarkers"
      :lat="marker.position.y"
      :lng="marker.position.x"
      @click="onMarkerClicked($event, marker)"
    />
    <!-- <naver-circle
      v-if="marker"
      :lat="marker.position.y"
      :lng="marker.position.x"
      :radius="500"
    /> -->
    <naver-rectangle :south="36" :north="36.05" :west="126" :east="126.05" />
  </naver-maps>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import Vue from 'vue/types/umd';
import sosang from '@/assets/test-data/sosangoingin.json';
import sangkwon from '@/assets/test-data/sangkwon.json';
@Component({
  name: 'Map',
})
export default class Map extends BaseComponent {
  private width = 1400;
  private height = 800;
  private info = false;
  private infoContent = '';
  private marker: any = null;
  private count = 1;
  private map: any = null;
  private isCTT = false;
  private sosang = sosang.data;
  private showingMarkers = [];
  private zoomLevel = 10;
  private mapOptions = {
    lat: 37,
    lng: 127,
    zoom: this.zoomLevel,
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
  private sangkwon = sangkwon;
  private circle = null;
  private spotNearStores: any = [];

  updateMarkers() {
    console.log('updateMarkers');

    if (this.zoomLevel > 14) {
      const mapBounds = this.map.getBounds();
      console.log('mapBounds', mapBounds);
      this.showingMarkers = this.markers.filter(e => {
        const position = e.getPosition();
        // console.log('position', position);
        if (mapBounds.hasLatLng(position)) return true;
      });
    } else {
      this.showingMarkers = [];
    }
  }
  startHeatMap() {
    this.heatMap = new window.naver.maps.visualization.HeatMap({
      map: this.map.map,
      data: this.heatmapCoords,
      colorMap: window.naver.maps.visualization.SpectrumStyle.HOT,
    });
  }
  removeNearStores() {
    this.spotNearStores.forEach(e => {
      e.setMap(null);
    });
    this.spotNearStores = [];
  }

  onLoad(vue: any) {
    console.log('naver', window.naver);

    this.map = vue;
    this.sangkwon.forEach(e => {
      const position = new window.naver.maps.LatLng(
        e.spotLatitude,
        e.spotLongitude,
      );
      if (e.storeCount > 4) {
        const marker = new window.naver.maps.Marker({
          map: this.map,
          position: position,
          title: e.spotId,
          zIndex: 100,
        });
        this.markers.push(marker);
      }

      // this.heatmapCoords.push(position);
    });
    console.log('sangkwon', sangkwon);

    this.updateMarkers();
  }
  onWindowLoad(that: any) {
    console.log('that', that);
  }
  onMarkerClicked(event: any, marker: any) {
    console.log('event', event);
    console.log('marker', marker);
    this.info = false;
    this.$nextTick(() => {
      this.info = true;
    });
    this.removeNearStores();
    this.marker = event.overlay;
    const spot = sangkwon.find(e => e.spotId == marker.title);

    this.infoContent = `${spot.spotId}`;

    // this.circle.setMap(this.marker.position);
    if (this.circle) this.circle.setMap(null);
    this.circle = new window.naver.maps.Circle({
      map: this.map.map,
      radius: 500,
      center: this.marker.position,
      fillColor: 'navy',
      fillOpacity: 0.1,
    });

    if (spot.store.length > 0) {
      spot.store.forEach(e => {
        const marker = new window.naver.maps.Marker({
          map: this.map,
          position: new window.naver.maps.LatLng(
            e.storeLatitude,
            e.storeLongitude,
          ),
          title: e.storeId,
          zIndex: 100,
        });
        this.spotNearStores.push(marker);
      });
    }
    console.log('spotNearStores', this.spotNearStores);

    this.spotNearStores.forEach(e => {
      e.setMap(this.map.map);
    });
  }
  onZoomChanged(zoomLevel: number) {
    console.log('on zoom changed vue', zoomLevel);
    this.zoomLevel = zoomLevel;
    this.updateMarkers();
  }
  onDrag() {
    this.updateMarkers();
    this.removeNearStores();
    this.info = false;
    if (this.circle) this.circle.setMap(null);
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
