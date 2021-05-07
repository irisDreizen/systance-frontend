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
  props: {
    algoName: {
      type: String,
      required: true
    },
    datasetName: {
      type: String,
      required: true
    },
    train: {
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
  },
  mounted(){
    this.update();
  },
  methods: {
    async update(){
      try{
        // const response = await this.axios.get(
        //     "http://localhost:3000/results/trainTest",
        //     {
        //       params: {
        //         algoName: this.algoName,
        //         datasetName: this.datasetName,
        //         train: this.train
        //       },
        //     }
        // );
        // this.params.data = response.data;
        this.series.push(1073, 460);

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>