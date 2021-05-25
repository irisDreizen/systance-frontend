<template>
  <div id="chart">
    <apexchart type="bar" height="600" width="550" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "compareFscore",
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
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        console.log(this.algoNameArray)
        this.series = []
        for(var i = 0; i < this.algoNameArray.length; i++) {

          let formData = new FormData();
          formData.append('model', this.algoNameArray[i]);
          formData.append('ds_name', this.datasetName);
          formData.append('percent', this.train);

          const response2 = await this.axios.post(
              "http://127.0.0.1:5000/statisticsTable", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              },
          );

          var table = response2.data['data'];

          var newData = []
          var temp = 0

          for (var k = 1; k < table.length; k++) {
            temp = parseFloat(table[k][3])
            newData.push(temp.toFixed(2))
          }


          var s = [{
            name: this.algoNameArray[i],
            data: newData
          }]
          console.log(s)
          console.log(s[0])
          this.series.push(s[0])
          console.log(this.series)


        }
        for (var j = 1; j < table.length; j++) {
          this.chartOptions.xaxis.categories.push(table[j][0].toUpperCase())
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