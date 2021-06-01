<script lang="ts">
import Vue from 'vue';
import { Radar, mixins } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';
import ChartDataLabels from 'chartjs-plugin-datalabels';
@Component({
  extends: Radar, // this is important to add the functionality to your component
  //   mixins: [mixins.reactiveProp],
  components: { ChartDataLabels },
})
export default class RadarChart extends Vue {
  public renderChart!: (chartData: any, options?: any) => void;
  @Prop() private readonly chartData: any;

  mounted(): void {
    const canvas = document.getElementById('radar-chart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    const gradientStrokeMale = 'rgba(11,83,141,1)';
    const gradientFillMale = ctx.createLinearGradient(0, 0, 0, 500);
    gradientFillMale.addColorStop(0, 'rgba(103,186,208,0.25)');
    gradientFillMale.addColorStop(1, 'rgba(11,83,141,0.25)');

    this.chartData.datasets[0].borderColor = gradientStrokeMale;
    this.chartData.datasets[0].backgroundColor = gradientFillMale;

    this.renderChart(this.chartData, {
      animation: {
        easing: 'easeInOutBack',
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
      scaleOverride: true,
      scaleSteps: 4,
      scaleStepWidth: 5,
      scaleStartValue: 0,
    });
  }
}
</script>
