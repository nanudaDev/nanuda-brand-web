<template>
  <div class="container">
    <h2>예약 완료</h2>
    <h3>예약 정보~~~~~~~~~~~~~~~</h3>

    <b-btn>돌아가기</b-btn>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';

import { Component, Vue } from 'vue-property-decorator';
@Component({
  name: 'ReservSuccess',
})
export default class ReservSuccess extends BaseComponent {}
</script>

<style>
.container {
  margin-top: 10rem;
  width: 400px;
}
</style>
