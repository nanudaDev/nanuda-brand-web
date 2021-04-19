<template>
  <div id="app" :class="`app-${$route.name}`">Site in construction</div>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'SiteInConstructionLayout',
})
export default class SiteInConstructionLayout extends BaseComponent {}
</script>
<style lang="scss" scoped></style>
