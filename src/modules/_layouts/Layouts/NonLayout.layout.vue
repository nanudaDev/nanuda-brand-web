<template>
  <div id="app" :class="`app-${$route.name}`">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'NonLayout',
})
export default class NonLayout extends BaseComponent {}
</script>
