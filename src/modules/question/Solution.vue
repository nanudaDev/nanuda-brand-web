<template>
  <div>
    <h3>Solution</h3>
    <div>
      <ResultRevenueChart />
    </div>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import ResultRevenueChart from '@/modules/_components/charts/ResultRevenueChart.vue';
@Component({
  name: 'Solution',
  components: { ResultRevenueChart },
})
export default class Solution extends BaseComponent {}
</script>

<style></style>
