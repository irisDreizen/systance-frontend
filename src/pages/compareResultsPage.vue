<template>
  <div>
    <div class="page" id="chart">
      <h1 class="content_title">COMPARE THE RESULTS</h1>
      <div>
        <b-card-group deck>
          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info">PERFORMANCE</b-card-title>
            <compare-performance :algoNameArray="algoNameArray" :datasetName="datasetName"
                                 :train="train"></compare-performance>
          </b-card>

          <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
            <b-card-title class="bg-info">TRAIN VS TEST</b-card-title>
            <br>
            <train-test-donut-chart :algoName="this.algoNameArray[0]" :datasetName="datasetName" :train="train" class="col d-flex justify-content-center"></train-test-donut-chart>
          </b-card>

        </b-card-group>
      </div>

    </div>
  </div>
</template>


<script>
import comparePerformance from "../components/comparePerformance";
import trainTestDonutChart from "../components/trainTestDonutChart";

export default {
  name: "compareResultsPage",
  components: {
    comparePerformance,
    trainTestDonutChart
  },
  data: function () {
    return {
      datasetName: null,
      algoNameArray: null,
      train: null
    }
  },
  async created() {
    this.created();
  },
  methods: {
    created() {
      this.datasetName = this.$route.params.datasetName;
      this.algoNameArray = this.$route.params.algoNameArray;
      this.train = this.$route.params.train;
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

.content_title2 {
  font-family: 'Bradley Hand', cursive;
  font-size: 28px;
  text-align: center;
  margin-top: 18px;
  margin-bottom: 18px;
}

.page {
  margin-left: 10px;
  margin-right: 10px;
}

</style>