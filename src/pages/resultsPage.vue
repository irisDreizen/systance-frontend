<template>
  <div>
    <div id="chart">
      <h1>Results</h1>
      <div>
        <b-card-group deck>
          <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Information" class="text-center">
            <b-card-text>Dataset: {{datasetName}}, Algorithm: {{algoName}}</b-card-text>
          </b-card>

          <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Accuracy" class="text-center">
            <b-card-text>{{accuracy}}</b-card-text>
          </b-card>

          <b-card border-variant="info" bg-variant="Light" text-variant="black" header="ROC-AUC Score" class="text-center">
            <b-card-text>{{rocaucscore}}</b-card-text>
          </b-card>
        </b-card-group>
      </div>
    <br>
      <div>
        <b-card-group deck>
          <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Statistics" class="text-center">
            <StatisticsTable :algoName="algoName" :datasetName="datasetName" :train="train"></StatisticsTable>
          </b-card>

          <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Confusion Matrix" class="text-center">
            <ConfusionMatrix :algoName="algoName" :datasetName="datasetName" :train="train"></ConfusionMatrix>
          </b-card>

        </b-card-group>
      </div>
      <br>
      <div>
        <b-card-group deck>
          <b-card border-variant="info" bg-variant="Light" text-variant="black" header="ROC Curve" class="text-center">
            <ROCCurve :algoName="algoName" :datasetName="datasetName" :train="train"></ROCCurve>
          </b-card>

          <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Actual vs Predict" class="text-center">
            <actual-vs-predict :algoName="algoName" :datasetName="datasetName" :train="train"></actual-vs-predict>
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

  export default {
    name: "results",
    components: {
      StatisticsTable,
      ROCCurve,
      actualVsPredict,
      ConfusionMatrix
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


        } catch (error) {
          console.log(error);
        }
      }
    }
  }
</script>

<style scoped>

</style>
