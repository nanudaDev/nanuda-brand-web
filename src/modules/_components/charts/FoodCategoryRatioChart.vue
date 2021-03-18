<script lang="ts">
// CommitChart.ts
import BaseComponent from '@/core/base.component';
import Vue from 'vue';
import { Doughnut, mixins } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  extends: Doughnut, // this is important to add the functionality to your component
  mixins: [mixins.reactiveProp],
  components: { ChartDataLabels },
})
export default class FoodCategoryRatioChart extends Vue {
  public renderChart!: (chartData: any, options?: any) => void;
  @Prop() private readonly data: any;
  mounted(): void {
    // Overwriting base render method with actual data.
    this.renderChart(this.data, {
      plugins: {
        datalabels: {
          labels: {
            index: {
              align: 'end',
              anchor: 'center',
              // color: function(ctx: any) {
              //   return ctx.dataset.backgroundColor;
              // },
              font: { size: 18 },
              formatter: function(value: any, ctx: any) {
                return `${ctx.chart.data.labels[ctx.dataIndex]}
 ${value}%`;
              },
              backgroundColor: 'white',
            },
          },
          borderRadius: 100,
          borderWidth: 1,
          borderColor: 'gray',
          padding: 20,
          font: {
            weight: 'bold',
          },
          color: 'blue',
        },
      },
      tooltips: {
        enabled: false,
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    });
  }
}
</script>

<style></style>
