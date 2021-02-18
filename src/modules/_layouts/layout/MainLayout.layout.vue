<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div id="app-main" :class="`app-${$route.name}`">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import NavBar from '../NavBar/NavBar.layout.vue';

@Component({
  name: 'MainLayout',
  components: {
    NavBar,
  },
})
export default class MainLayout extends BaseComponent {}
</script>
<style lang="scss">
#app-main {
  padding: 3em 0;
  &.app-main {
    padding: 0;
  }
}
</style>
