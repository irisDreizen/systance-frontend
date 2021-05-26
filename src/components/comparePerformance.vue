<template>
  <div id="chart">
    <apexchart type="bar" height="600" width="600" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "comparePerformance",
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
          categories: ["Accuracy", "Roc-Auc Score", "Precision", "Recall", "F-score"],
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
        this.series = []
        for(var i = 0; i < this.algoNameArray.length; i++) {

          let formData = new FormData();
          formData.append('model', this.algoNameArray[i]);
          formData.append('ds_name', this.datasetName);
          formData.append('percent', this.train);

          const response = await this.axios.post(
              "http://127.0.0.1:5000/resultsModelDataset", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              },
          );
          var response_data = response.data;
          var newData = []
          newData.push(response_data['accuracy'])
          newData.push(response_data['rocaucscore'])


          const response2 = await this.axios.post(
              "http://127.0.0.1:5000/statisticsTable", formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              },
          );

          var table = response2.data['data'];

          var totalPrecision = 0;
          var totalRecall = 0;
          var totalFScore = 0;


          for (var k = 1; k < table.length; k++) {
            totalPrecision += parseFloat(table[k][1]);
            totalRecall += parseFloat(table[k][2]);
            totalFScore += parseFloat(table[k][3]);
          }

          var numOfLabels = parseFloat(table.length - 1)

          totalPrecision = totalPrecision / numOfLabels;
          totalRecall = totalRecall / numOfLabels;
          totalFScore = totalFScore / numOfLabels;

          var prec = totalPrecision.toFixed(2);
          var recall = totalRecall.toFixed(2);
          var fscore = totalFScore.toFixed(2);

          newData.push(parseFloat(prec))
          newData.push(parseFloat(recall))
          newData.push(parseFloat(fscore))
          var s = [{
                  name: this.algoNameArray[i].toUpperCase(),
                  data: newData
          }]

          this.series.push(s[0])
        }

        // this.series = [{
        //   data: newData
        // }]

        // {
        //   name: 'UCLMR',
        //       data: [0.6, 0.58, 0.4, 0.41, 0.42]
        // }, {
        //   name: 'TAN',
        //       data: [0.52, 0.53, 0.4, 0.41, 0.42]
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