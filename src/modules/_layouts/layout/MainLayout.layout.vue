<template>
  <div id="app" :class="{ 'is-scrolled': isScrolled }">
    <nav-bar></nav-bar>
    <div id="app-main" :class="`app-${$route.name}`">
      <router-view></router-view>
      <footer id="footer">
        <div class="container">
          <p class="text-secondary">NND BRAND 2021</p>
        </div>
      </footer>
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
<style lang="scss">
#app-main {
  padding: 3em 0;
  &.is-scrolled {
    #nav {
      background-color: black;
    }
  }

  &.app-main {
    padding: 0;
  }

  #footer {
    background-color: black;
    padding: 1em 0;
  }
}
</style>
