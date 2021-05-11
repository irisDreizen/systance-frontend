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
    this.getData();
  },
  methods: {
    async getData(){
      try{
        let formData = new FormData();
        formData.append('model', this.algoName);
        formData.append('ds_name', this.datasetName);
        formData.append('percent',this.train);
        const response = await this.axios.post(
            "http://127.0.0.1:5000/ActualVSPredict",formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                },
        );


        var responseData = response.data;

        console.log(responseData)


        this.series = [{
          name: "",
          data: []
        }, {
          name: "",
          data: []
        }];

        this.series[0].name= 'Actual';
        this.series[0].data= responseData[0]['Actual'];


        this.series[1].name= 'Predict';
        this.series[1].data= responseData[0]['Predict'];

        //
        // const response_c = await this.axios.get(
        //         "http://127.0.0.1:5000/catagories/"+this.datasetName
        // );
        // // this.params.data = response.data;
        //
        // console.log(this.datasetName)
        //
        // var responseData_c = responseData['']
        //
        // console.log(responseData_c['categories'])


        for(var i = 0; i < responseData[1]['categories'].length; i++){
          this.chartOptions.xaxis.categories.push(responseData[1]['categories'][i]);
        }

        console.log(this.chartOptions.xaxis.categories)

        // for(var i = 0; i < this.series[0]['data'].length; i++){
        //   this.series[0].data.push(this.series[0]['data'][i])
        // }
        //
        // this.series[1].name = responseData[1]['name'];
        //
        // for(var j = 1; i < this.series[1]['data'].length; j++){
        //   this.series[1].data.push(this.series[1]['data'][j])
        // }

        // this.series[1].name = "Predict";
        // this.series[1].data.push(989, 349, 290);

        // this.series[0].name = "Actual";
        // this.series[0].data.push(1002,280,346);
        //
        // this.series[1].name = "Predict";
        // this.series[1].data.push(989, 349, 290);


      } catch (error) {
        console.log(error);
      }
    }





  }
}
</script>

<style scoped>

</style>