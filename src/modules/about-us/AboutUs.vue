<template>
  <article class="main-article">
    <div class="container">
      회사소개
    </div>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'AboutUs',
})
export default class AboutUs extends BaseComponent {}
</script>
