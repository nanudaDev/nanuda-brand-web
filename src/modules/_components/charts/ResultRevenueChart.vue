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
  components: { ChartDataLabels },
})
export default class ResultRevenueChart extends Vue {
  public renderChart!: (chartData: any, options?: any) => void;
  private gradient: any;

  mounted(): void {
    // Overwriting base render method with actual data.

    const canvas = document.getElementById('line-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, '#f49080');

    const gradientFill = ctx.createLinearGradient(0, 0, 0, 500);
    gradientFill.addColorStop(0, 'rgba(103,186,208,1)');
    gradientFill.addColorStop(1, 'rgba(11,83,141,1)');

    this.renderChart(
      {
        labels: ['', '최저매출', '내 매출', '평균매출', '최고매출', ''],
        datasets: [
          {
            backgroundColor: gradientFill,
            data: [700, 900, 1200, 1400, 1600, 1800],
            pointRadius: [0, 5, 15, 5, 5, 0],
            pointHoverRadius: [0, 5, 20, 5, 5, 0],
            pointBackgroundColor: [
              '#C4C4C4',
              '#C4C4C4',
              '#004D8A',
              '#C4C4C4',
              '#C4C4C4',
              '#C4C4C4',
            ],
          },
        ],
      },
      {
        plugins: {
          datalabels: {
            backgroundColor: 'transparent',
            anchor: 'end',
            align: 'top',
            offset: '15',
            font: {
              size: 12,
            },
            formatter: (value: any, context: any) => {
              console.log('context', context);

              if (context.dataIndex == 0) {
                return null;
              } else if (context.dataIndex == 5) {
                return null;
              } else {
                return `${value} 만원`;
              }
            },
          },
        },
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
                fontSize: 15,
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
