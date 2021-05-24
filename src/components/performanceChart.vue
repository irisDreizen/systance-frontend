<template>
  <div id="chart">
    <apexchart width="490" type="bar" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  name: "performanceChart",
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
          categories: [ "Accuracy",
            "Roc-Auc Score",
            "Precision",
            "Recall",
            "F-score"]
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


        let formData = new FormData();
        formData.append('model', this.algoName);
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


        for (var i = 1; i < table.length; i++) {
          totalPrecision += parseFloat(table[i][1]);
          totalRecall += parseFloat(table[i][2]);
          totalFScore += parseFloat(table[i][3]);
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

        this.series = [{
          data: newData
        }]

        // var datasets =  [
        //   {
        //     label: "# of Votes",
        //     data: null,
        //     backgroundColor: [
        //       "rgba(255, 99, 132, 0.2)",
        //       "rgba(54, 162, 235, 0.2)",
        //       "rgba(255, 206, 86, 0.2)",
        //       "rgba(75, 192, 192, 0.2)",
        //       "rgba(153, 102, 255, 0.2)",
        //     ],
        //     borderColor: [
        //       "rgba(255,99,132,1)",
        //       "rgba(54, 162, 235, 1)",
        //       "rgba(255, 206, 86, 1)",
        //       "rgba(75, 192, 192, 1)",
        //       "rgba(153, 102, 255, 1)",
        //     ],
        //     borderWidth: 1
        //   }
        // ]
        // datasets[0].data = []
        // datasets[0].data.push(5)
        // console.log(datasets)


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>