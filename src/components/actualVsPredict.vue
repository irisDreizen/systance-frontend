<template>
  <div>
    <div id="chart">
      <apexchart type="bar" height="430" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "actualVsPredict",
  components: {
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      series: [{
        name: "Actual",
        data: [1002, 280, 346]
      }, {
        name: "Predict",
        data: [989, 349, 290]
      }],
      chartOptions: {
        chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ['Against', 'For', 'Observing'],
        },
      },
    }
  }
}
</script>

<style scoped>

</style>