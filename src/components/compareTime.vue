<template>
  <div id="chart">
    <apexchart width="490" type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "compareTime",
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
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        },
        yaxis: {
          title: {
            text: 'minutes'
          }
        },
      },
      series: [{
        name: 'series-1',
        data: []
      }]
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {

        var time;
        var data = []

        for(var i = 0; i < this.algoNameArray.length; i++) {
          this.chartOptions.xaxis.categories.push(this.algoNameArray[i])

          let formData = new FormData();
          formData.append('model', this.algoNameArray[i]);
          formData.append('ds_name', this.datasetName);
          formData.append('percent', this.train);

          const response = await this.axios.post(
              "http://127.0.0.1:5000/getTime", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              },
          );
          time = parseFloat(response.data);
          time = time.toFixed(3);
          data.push(time)
        }


        this.series = [{
          data: data
        }]


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>