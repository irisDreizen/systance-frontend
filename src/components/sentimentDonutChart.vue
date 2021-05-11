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
  mounted(){
    this.update();
  },
  methods: {
    async update(){
      try{
        // let formData = new FormData();
        // formData.append('ds_name', this.datasetName);
        // const response = await this.axios.get(
        //     "http://127.0.0.1:5000/get_positive_negative" + ds_name
        // );

        //this.params.data = response.data;
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