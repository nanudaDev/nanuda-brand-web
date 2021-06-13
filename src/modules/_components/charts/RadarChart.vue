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
