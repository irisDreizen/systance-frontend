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
        const response = await this.axios.get(
            "http://127.0.0.1:5000/labelPieChart/" + this.datasetName
        );

        var responseData = response.data;

        for(var i = 0; i < responseData['series'].length; i++){
          this.series.push(responseData['series'][i]);
        }

        for(var j = 0; j < responseData['labels'].length; j++){
          this.chartOptions.labels.push(responseData['labels'][j]);
        }

        // this.series.push(989, 349, 290);
        //
        // this.chartOptions.labels.push('Against (989)', 'Favor (349)', 'None (290)');

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>