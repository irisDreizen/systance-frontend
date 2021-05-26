<template>
  <div>
    <div id="chart">
      <apexchart type="bar" height="600" width="800" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "compareActualPredict",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    algoNameArray: {
      type: Array,
      required: true
    },
    datasetName: {
      type: String,
      required: true
    },
    train: {
      type: Number,
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
    this.getData();
  },
  methods: {
    async getData(){
      try{
        var responseData = ""
        this.series = []
        var temp = []

        for(var t = 0; t <= this.algoNameArray.length; t++){
          temp[t] = {
               name: "",
               data: []
             }
        }

        for(var i = 0; i < this.algoNameArray.length; i++) {
          let formData = new FormData();
          formData.append('model', this.algoNameArray[i]);
          formData.append('ds_name', this.datasetName);
          formData.append('percent', this.train);
          const response = await this.axios.post(
              "http://127.0.0.1:5000/ActualVSPredict", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              },
          );
          responseData = response.data;


          if(i == 0) {
            temp[0].name = 'ACTUAL';
            temp[0].data = responseData[0]['Actual'];

            for(var j = 0; j < responseData[1]['categories'].length; j++){
              this.chartOptions.xaxis.categories.push(responseData[1]['categories'][j]);
            }
          }

          temp[i+1].name = this.algoNameArray[i].toUpperCase();
          temp[i+1].data = responseData[0]['Predict'];
        }
        for(var k = 0; k < temp.length; k++){
          this.series.push(temp[k])
        }


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>