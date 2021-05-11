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
    this.getCategories();
  },
  methods: {
    async getData(){
      try{
        // let formData = new FormData();
        // formData.append('model', this.algoName);
        // formData.append('ds_name', this.datasetName);
        // formData.append('percent', this.train);
        // const response = await this.axios.get(
        //     "http://127.0.0.1:5000/ActualVSPredict"
        // );
        // this.params.data = response.data;


        this.series = [{
          name: "",
          data: []
        }, {
          name: "",
          data: []
        }];

        this.series[0].name = "Actual";
        this.series[0].data.push(1002,280,346);

        this.series[1].name = "Predict";
        this.series[1].data.push(989, 349, 290);


      } catch (error) {
        console.log(error);
      }
    },
    async getCategories(){
      // let formData = new FormData();
      // formData.append('ds_name', this.datasetName);
      // const response = await this.axios.get(
      //     "http://localhost:3000/catagories/"+this.datasetName
      // );
      // this.params.data = response.data;

      this.chartOptions.xaxis.categories.push('Against', 'For', 'Observing');


    }
  }
}
</script>

<style scoped>

</style>