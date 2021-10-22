<template>
  <component :is="layout"></component>
</template>

<script lang="ts">
declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}
import { Component } from 'vue-property-decorator';
import BaseComponent from './core/base.component';

@Component({
  name: 'App',
})
export default class App extends BaseComponent {
  get layout() {
    return this.$route.meta.layout;
  }
}
</script>
