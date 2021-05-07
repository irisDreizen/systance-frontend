<template>
  <div>
    <div id="chart">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "topicsChart",
  components: {
    apexchart: VueApexCharts,
  },
  data: function () {
    return {
      series: [{
        data: [44, 55, 41, 17, 15]
      }, ],
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
          categories: ['Atheism', 'Abortion', 'Guns', 'Trump', 'Hilary Clinton'],
        },
      },
    }
  }
}
</script>

<style scoped>

</style>