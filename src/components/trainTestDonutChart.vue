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
        let formData = new FormData();
        formData.append('model', 'UCLMR');
        formData.append('ds_name', this.datasetName);
        formData.append('percent',70);
        // const response = await this.axios.post(
        //     "http://127.0.0.1:5000/train_test_records",formData, {
        //           headers: {
        //             'Content-Type': 'multipart/form-data'
        //           }
        //         },
        // );

        // this.series.push(1073, 460);

        // var responseData = response.data;
        //
        // console.log(responseData)
        // for(var i = 0; i < responseData['series'].length; i++){
        //   this.series.push(responseData['series'][i]);
        // }


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>