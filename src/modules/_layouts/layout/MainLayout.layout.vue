<template>
  <div id="app" :class="{ 'is-scrolled': isScrolled }">
    <nav-bar></nav-bar>
    <div id="app-main" :class="`app-${$route.name}`">
      <router-view></router-view>
      <footer id="footer">
        <div class="container">
          <span class="footer-logo">PEAKCOOK</span>
          <div>
            <h4>운영시간</h4>
            <p>10:00 ~ 19:00</p>
            <p>서울특별시 서초구 서초대로 396, 19층(서초동, 강남빌딩)</p>
          </div>
          <div class="mt-2">
            <p>Copyright. 2020 PEAKCOOK. All Right Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
    <div id="app-sticky-bar">
      <div class="inner-container"></div>
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import NavBar from '../NavBar/NavBar.layout.vue';
import debounce from 'lodash/debounce';

@Component({
  name: 'MainLayout',
  components: {
    NavBar,
  },
})
export default class MainLayout extends BaseComponent {
  private isScrolled = false;
  private handleDebouncedScroll: {
    (this: Window, ev: Event): any;
    (this: Window, ev: Event): any;
  } = null;

  handleScroll() {
    if (window.scrollY > 0) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  created() {
    this.handleDebouncedScroll = debounce(this.handleScroll, 100);
    window.addEventListener('scroll', this.handleDebouncedScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleDebouncedScroll);
  }
}
</script>
<style lang="scss" scoped>
#app {
  #nav {
    background-color: transparent;
    transition: background-color 0.4s ease;
  }
  &.is-scrolled {
    #nav {
      background-color: black;
    }
  }
}
#app-main {
  padding: 3em 0;

  &.app-main {
    padding: 0;
  }

  #footer {
    padding: 1em 0;
    background-color: black;
    color: #fff;
    padding: 1em 0;
  }
}
</style>
