<template>
  <div>
    <div id="chart">
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "topicsChart",
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
          categories: [],
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
        // let formData = new FormData();
        // formData.append('ds_name', this.datasetName);
        // const response = await this.axios.get(
        //     "http://127.0.0.1:5000/get_topics_and_number" + ds_name
        // );
        // this.params.data = response.data;
        this.series = [{
          data: [44, 55, 41, 17, 15]
        }, ];
        this.chartOptions.xaxis.categories.push('Atheism', 'Abortion', 'Guns', 'Trump', 'Hilary Clinton');




      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>