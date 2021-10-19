<template>
  <div id="app" class="app-mypage">
    <nav-bar :class="{ 'is-scrolled': isScrolled }"></nav-bar>
    <div id="appContent">
      <main :id="$route.name === 'main' ? 'main' : 'sub'">
        <router-view :key="$route.fullPath"></router-view>
      </main>
    </div>
    <app-footer></app-footer>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import AppFooter from '../AppFooter/AppFooter.layout.vue';
import NavBar from '../NavBar/NavBar.layout.vue';

@Component({
  name: 'MainLayout',
  components: {
    NavBar,
    AppFooter,
  },
})
export default class MainLayout extends BaseComponent {}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
#app {
  &.app-mypage {
    #nav {
      + #appContent {
        margin-top: 3.375em;
      }
    }
    .main-article {
      padding: 3.375em 0;
    }
  }
}
</style>
