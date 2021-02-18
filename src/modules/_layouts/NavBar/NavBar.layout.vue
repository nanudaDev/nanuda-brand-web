<template>
  <nav id="nav">
    <div class="nav-logo">
      <h1>
        <router-link to="/">NND BRAND</router-link>
      </h1>
    </div>
    <div class="nav-list">
      <ul>
        <li v-for="item in items" :key="item.meta.title">
          <router-link :to="item.path">{{ item.meta.title }}</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { routes } from '@/router';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'NavBar',
})
export default class NavBar extends BaseComponent {
  private items = routes;
}
</script>
<style lang="scss">
#nav {
  display: flex;
  align-items: center;
  padding: 2em;
  overflow: hidden;
  border-bottom: 1px solid #dcdcdc;
  .nav-logo {
    font-size: 2em;
    font-weight: bold;
    margin-right: 1em;
  }
  .nav-list {
    li {
      float: left;
      a {
        color: #000;
        margin: 0 1em;
      }
    }
  }
}
</style>
