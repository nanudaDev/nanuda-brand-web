<template>
  <component :is="layout"></component>
</template>

<script lang="ts">
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
