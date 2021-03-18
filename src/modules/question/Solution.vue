<template>
  <div>
    <h3>Solution</h3>
    <div>
      <ResultRevenueChart />
    </div>
    <div style="margin-top: 5rem">
      <FoodCategoryRatioChart :data="data" />
    </div>
  </div>
</template>

<script lang="ts">
import BaseComponent from '@/core/base.component';
import { Component } from 'vue-property-decorator';
import ResultRevenueChart from '@/modules/_components/charts/ResultRevenueChart.vue';
import FoodCategoryRatioChart from '@/modules/_components/charts/FoodCategoryRatioChart.vue';
@Component({
  name: 'Solution',
  components: { ResultRevenueChart, FoodCategoryRatioChart },
})
export default class Solution extends BaseComponent {
  private data = {
    labels: ['한식', '분식'],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ['red', 'blue'],
      },
    ],
  };
}
</script>

<style></style>
