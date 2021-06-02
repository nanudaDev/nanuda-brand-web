<script lang="ts">
import Vue from 'vue';
import { Radar, mixins } from 'vue-chartjs';
import { Component, Prop, Watch } from 'vue-property-decorator';
const { reactiveProp } = mixins;
@Component({
  extends: Radar,
  mixins: [reactiveProp],
})
export default class RadarChart extends Vue {
  public renderChart!: (chartData: any, options?: any) => void;
  @Prop() private chartData: any;

  onRenderChart() {
    const canvas = document.getElementById('radar-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradientStroke = 'rgba(11,83,141,1)';
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 500);
    gradientFill.addColorStop(0, 'rgba(103,186,208,0.25)');
    gradientFill.addColorStop(1, 'rgba(11,83,141,0.25)');

    this.chartData.datasets[0].borderColor = gradientStroke;
    this.chartData.datasets[0].backgroundColor = gradientFill;

    this.renderChart(this.chartData, {
      animation: {
        easing: 'easeInOutBack',
      },
      tooltips: {
        enabled: false,
        showAllTooltips: true,
      },
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: false,
      },
      scale: {
        pointLabels: {
          // fontSize: 16,
        },
        ticks: {
          beginAtZero: true,
          max: 100,
          stepSize: 20,
          showLabelBackdrop: false,
          callback: () => {
            return '';
          },
        },
      },
    });
  }

  mounted(): void {
    this.onRenderChart();
    this.$root.$on('updateData', () => {
      this.onRenderChart();
    });
  }
}
</script>
