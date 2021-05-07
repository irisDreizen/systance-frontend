<template>
  <div>
    <div id="chart">
      <apexchart type="donut" width="380" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "trainTestDonutChart",
  components: {
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      series: [1073, 460],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        labels: ['Train', 'Test'],
        plotOptions: {
          pie: {
            startAngle: -90,
            endAngle: 90,
            offsetY: 10
          }
        },
        grid: {
          padding: {
            bottom: -80
          }
        },
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>