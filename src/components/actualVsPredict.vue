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
          categories: []
        },
      },
    }
  },
  mounted(){
    this.update();
  },
  methods: {
    async update(){
      try{
        // const response = await this.axios.get(
        //     "http://localhost:3000/results/actualVsPredict",
        //     {
        //       params: {
        //         algoName: this.algoName,
        //         datasetName: this.datasetName,
        //         train: this.train
        //       },
        //     }
        // );
        // this.params.data = response.data;


        this.series = [{
          name: "Actual",
          data: [1002, 280, 346]
        }, {
          name: "Predict",
          data: [989, 349, 290]
        }];

        this.chartOptions.xaxis.categories.push('Against', 'For', 'Observing');


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>