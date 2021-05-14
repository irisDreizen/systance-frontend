<template>
  <div>
    <div id="chart">
      <h1 class="content_title">Results Dashboard</h1>
      <div>
        <b-card-group deck class="card">
          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Info" class="text-center">
            <b-card-text><b>Dataset: </b>{{datasetName}}, <b>Algorithm: </b>{{algoName}}</b-card-text>
          </b-card>

          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Accuracy" class="text-center">
            <b-card-text>{{accuracy}}</b-card-text>
          </b-card>

          <b-card border-variant="info"  header-bg-variant="info" bg-variant="Light" text-variant="black" header="ROC-AUC Score" class="text-center">
            <b-card-text>{{rocaucscore}}</b-card-text>
          </b-card>
        </b-card-group>
      </div>
    <br>
      <div>
        <b-card-group deck>
          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Statistics" class="text-center">
            <StatisticsTable :algoName="algoName" :datasetName="datasetName" :train="train"></StatisticsTable>
          </b-card>

          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Confusion Matrix" class="text-center">
            <ConfusionMatrix :algoName="algoName" :datasetName="datasetName" :train="train"></ConfusionMatrix>
          </b-card>

        </b-card-group>
      </div>
      <br>
      <div>
        <b-card-group deck>
          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="ROC Curve" class="text-center">
            <ROCCurve :algoName="algoName" :datasetName="datasetName" :train="train"></ROCCurve>
          </b-card>

          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Actual vs Predict" class="text-center">
            <actual-vs-predict :algoName="algoName" :datasetName="datasetName" :train="train"></actual-vs-predict>
          </b-card>

          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Train vs Test" class="text-center">
            <train-test-donut-chart :algoName="algoName" :datasetName="datasetName" :train="train"></train-test-donut-chart>
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
  }
  .card {
    background-color: rgba(0, 0, 0, 0.1);;
  }
  .black {
    background-color: black;
  }

</style>
