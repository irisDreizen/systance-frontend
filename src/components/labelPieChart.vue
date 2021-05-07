<template>
  <div>
    <div id="chart">
      <apexchart type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "labelPieChart",
  components: {
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      series: [989, 349, 290],
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Against (989)', 'Favor (349)', 'None (290)'],
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