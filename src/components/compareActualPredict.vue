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
        console.log(this.algoNameArray)
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
            this.series = [{
              name: "",
              data: []
            }, {
              name: "",
              data: []
            }, {
              name: "",
              data: []
            }];

            this.series[0].name = 'ACTUAL';
            this.series[0].data = responseData[0]['Actual'];

            for(var j = 0; i < responseData[1]['categories'].length; j++){
              this.chartOptions.xaxis.categories.push(responseData[1]['categories'][j]);
            }
          }


          this.series[i+1].name = this.algoNameArray[i] + ' PREDICT';
          this.series[i+1].data = responseData[0]['Predict'];
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