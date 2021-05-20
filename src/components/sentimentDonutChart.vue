<template>
  <div>
    <div id="chart">
      <apexchart type="donut" width="500" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "sentimentDonutChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    datasetName: {
      type: String,
      required: true
    },
  },
  data: function () {
    return {
      series: [],
      chartOptions: {
        chart: {
          type: 'donut',
        },
        labels: ['Positive', 'Negative', 'Neutral'],
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
  },
  created(){
    this.update();
  },
  methods: {
    async update(){
      try{
        // const response = await this.axios.get(
        //     "http://127.0.0.1:5000/get_positive_negative/" + this.datasetName
        // );
        //
        // var responseData = response.data;
        //
        // for(var i = 0; i < responseData['series'].length; i++){
        //   this.series.push(responseData['series'][i])
        // }

        this.series.push(63, 38, 12);

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>