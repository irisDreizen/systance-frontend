<template>
  <div>
    <div id="chart">
      <apexchart v-if="type=='topic'" type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
      <div v-else>
        <p>This dataset is not topic based, it is headline based. That means that the data was taken from articles, and the dataset includes article headlines and article bodies. Topic based datasets are mainly tweets from Twitter that all discuss a specific topic.</p>
      </div>
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
    type: {
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
        const response = await this.axios.get(
            "http://127.0.0.1:5000/get_topics_and_number/" + this.datasetName
        );
        var responseData = response.data;

        for(var i = 0; i < responseData['categories'].length; i++){
          this.chartOptions.xaxis.categories.push(responseData['categories'][i])
        }

        this.series = [{
          data: null
        }, ];

        this.series[0]['data'] = responseData['data'];


        // this.series = [{
        //   data: [44, 55, 41, 17, 15]
        // }, ];
        // this.chartOptions.xaxis.categories.push('Atheism', 'Abortion', 'Guns', 'Trump', 'Hilary Clinton');

      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>