<template>
  <div>
    <div id="chart">
      <apexchart type="bar" height="600" width="600" :options="chartOptions" :series="series"></apexchart>
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
      series: null,
      chartOptions: {
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: [],
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      fill: {
        opacity: 1
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40
      }
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
          console.log(responseData)


          if(i == 0) {
            // temp[0].name = 'ACTUAL';
            this.chartOptions.xaxis.categories.push('ACTUAL');
            // temp[0].data = responseData[0]['Actual'];
            for(var t = 0; t < responseData[1]['categories'].length; t++){
              temp[t] = {
                name: "",
                data: []
              }
            }

            for(var p = 0; p < responseData[0]['Actual'].length; p++){
              temp[p].data.push(responseData[0]['Actual'][p])
            }

            for(var j = 0; j < responseData[1]['categories'].length; j++){
              temp[j].name = responseData[1]['categories'][j];
              // this.chartOptions.xaxis.categories.push(responseData[1]['categories'][j]);
            }
          }

          // temp[i+1].name = this.algoNameArray[i].toUpperCase();
          this.chartOptions.xaxis.categories.push(this.algoNameArray[i].toUpperCase());

          for(var s = 0; s < responseData[0]['Predict'].length; s++){
            temp[s].data.push(responseData[0]['Predict'][s])
          }
          // temp[i+1].data = responseData[0]['Predict'];
        }
        console.log(temp)
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