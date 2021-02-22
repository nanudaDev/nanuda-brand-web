<template>
  <nav id="nav" class="sticky-nav-header navbar navbar-expand-lg navbar-light">
    <div class="nav-logo px-4">
      <h1>
        <router-link to="/">NND BRAND</router-link>
      </h1>
    </div>
    <button class="navbar-toggler collapsed bg-white" type="button">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-nav navbar-collapse collapse">
      <div v-for="item in items" :key="item.meta.title" class="navbar-nav-item">
        <router-link :to="item.path">{{ item.meta.title }}</router-link>
      </div>
    </div>
  </nav>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { componentRoutes } from '@/router/modules';

import { Component } from 'vue-property-decorator';

@Component({
  name: 'NavBar',
})
export default class NavBar extends BaseComponent {
  private items = componentRoutes;
}
</script>
<style lang="scss">
.sticky-nav-header {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 5em;
  padding: 0 40px;
  z-index: 99;
  color: #fff;
  .navbar-nav {
    .navbar-nav-item {
      font-size: 16px;
      font-weight: bold;
      margin: 0 1em;
    }
  }
}
</style>
