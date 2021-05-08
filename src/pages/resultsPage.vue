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
    methods: {

    },
    data: function() {
      return {
        accuracy: 0.7,
        rocaucscore: 0.68,
        datasetName: 'MPCHI',
        algoName: 'UCLMR',
        train: '0.8'
      }
    }
  }
</script>

<style scoped>

</style>
