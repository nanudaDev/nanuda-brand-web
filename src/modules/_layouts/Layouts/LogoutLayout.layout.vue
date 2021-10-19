<template>
  <router-view :key="$route.fullPath"></router-view>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import { Route } from 'vue-router';

@Component({
  name: 'LogoutLayout',
})
export default class MainLayout extends BaseComponent {
  created() {
    this.$router.back();
  }
}
</script>
