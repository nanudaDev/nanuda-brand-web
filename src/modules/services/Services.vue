<template>
  <article class="main-article">
    <div class="container">
      서비스 소개
    </div>
  </article>
</template>
<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';

@Component({
  name: 'Services',
})
export default class Services extends BaseComponent {}
</script>
