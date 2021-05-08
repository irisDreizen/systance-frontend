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
          width: 380,
          type: 'pie',
        },
        labels: [],
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
        //     "http://localhost:3000/results/labelPieChart",
        //     {
        //       params: {
        //         algoName: this.algoName,
        //         datasetName: this.datasetName,
        //         train: this.train
        //       },
        //     }
        // );
        // this.params.data = response.data;
        this.series.push(989, 349, 290);

        this.chartOptions.labels.push('Against (989)', 'Favor (349)', 'None (290)');




      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>