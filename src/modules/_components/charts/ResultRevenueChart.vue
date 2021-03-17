<script lang="ts">
// CommitChart.ts
import BaseComponent from '@/core/base.component';
import Vue from 'vue';
import { Bar, Line, mixins } from 'vue-chartjs';
import { Component } from 'vue-property-decorator';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  extends: Line, // this is important to add the functionality to your component
  mixins: [mixins.reactiveProp],
})
export default class ResultRevenueChart extends Vue {
  public renderChart!: (chartData: any, options?: any) => void;
  mounted(): void {
    // Overwriting base render method with actual data.
    this.renderChart(
      {
        labels: ['', '최저매출', '내 매출', '평균매출', '최고매출', ''],
        datasets: [
          {
            backgroundColor: '#f87979',
            data: [700, 900, 1200, 1400, 1600, 1800],
            pointRadius: [0, 5, 20, 5, 5, 0],
            pointBackgroundColor: [
              '#f87979',
              '#f87979',
              'black',
              '#f87979',
              '#f87979',
              '#f87979',
            ],
          },
        ],
      },
      {
        plugins: [ChartDataLabels],
        layout: {
          padding: {
            // Any unspecified dimensions are assumed to be 0
            top: 35,
          },
        },
        tooltips: {
          enabled: false,
          showAllTooltips: true,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                padding: -410,
                fontSize: 20,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: [
                  'white',
                  'white',
                  'black',
                  'white',
                  'white',
                  'white',
                ],
                min: 200,
                max: 2000,
                beginAtZero: true,
                display: false,
              },
              gridLines: {
                display: false,
              },
            },
          ],
        },
      },
    );
  }
}
</script>

<style></style>
