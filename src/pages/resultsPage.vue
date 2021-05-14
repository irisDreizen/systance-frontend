<template>
  <div>
    <div class="page" id="chart">
      <h1 class="content_title">Results Dashboard</h1>
      <div>
        <b-card-group deck class="card">
          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info"> Information</b-card-title>
            <b-card-text style="font-size: 20px"><b>Dataset: </b>{{datasetName}}, <b>Algorithm: </b>{{algoName}}</b-card-text>
          </b-card>

          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info"> Accuracy</b-card-title>
            <b-card-text style="font-size: 20px">{{accuracy}}</b-card-text>
          </b-card>

          <b-card border-variant="info"  header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info"> ROC-AUC Score</b-card-title>
            <b-card-text style="font-size: 20px">{{rocaucscore}}</b-card-text>
          </b-card>


        </b-card-group>
      </div>
    <br>
      <div>
        <b-card-group deck>
          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info"> Statistics</b-card-title>
            <StatisticsTable :algoName="algoName" :datasetName="datasetName" :train="train"></StatisticsTable>
          </b-card>

          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info"> Confusion Matrix</b-card-title>
            <ConfusionMatrix :algoName="algoName" :datasetName="datasetName" :train="train"></ConfusionMatrix>
          </b-card>

        </b-card-group>
      </div>
      <br>
      <div>
        <b-card-group deck>
          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info"> ROC Curve</b-card-title>
            <ROCCurve :algoName="algoName" :datasetName="datasetName" :train="train"></ROCCurve>
          </b-card>

          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info">Actual vs Predict</b-card-title>
            <actual-vs-predict :algoName="algoName" :datasetName="datasetName" :train="train"></actual-vs-predict>
          </b-card>


        </b-card-group>
        <br>
        <b-card-group>
          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info">Train vs Test</b-card-title>
            <train-test-donut-chart :algoName="algoName" :datasetName="datasetName" :train="train" class="col d-flex justify-content-center"></train-test-donut-chart>
          </b-card>
        </b-card-group>

      </div>
    <br>
      <br>
    </div>
  </div>
</template>

<script>
  import StatisticsTable from "../components/StatisticsTable";
  import ROCCurve from "../components/ROCCurve";
  import ConfusionMatrix from "../components/ConfusionMatrix";
  import actualVsPredict from "../components/actualVsPredict";
  import trainTestDonutChart from "../components/trainTestDonutChart";

  export default {
    name: "results",
    components: {
      StatisticsTable,
      ROCCurve,
      actualVsPredict,
      ConfusionMatrix,
      trainTestDonutChart
    },
    data: function () {
      return {
        accuracy: null,
        rocaucscore: null,
        datasetName: null,
        algoName: null,
        train: null
      }
    },
    async created() {
      this.created();
    },
    methods: {
      async created() {
        try {
          this.datasetName = this.$route.params.datasetName;
          this.algoName = this.$route.params.algoName;
          this.train = this.$route.params.train;

          let formData = new FormData();
          formData.append('model', this.algoName);
          formData.append('ds_name', this.datasetName);
          formData.append('percent', this.train);
          const response = await this.axios.post(
              "http://127.0.0.1:5000/resultsModelDataset",formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data'
                    }
                  },
          );
          var response_data = response.data;
          this.accuracy = response_data['accuracy']
          this.rocaucscore = response_data['rocaucscore']

          // this.accuracy = 0.7
          // this.rocaucscore = 0.68

        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>

<style scoped>

  .content_title {
    font-family: 'Bradley Hand', cursive;
    font-weight: bold;
    font-size: 50px;
    text-align: center;
    margin-top: 18px;
    margin-bottom: 18px;
  }
  .page {
    margin-left: 10px;
    margin-right: 10px;
  }

</style>
