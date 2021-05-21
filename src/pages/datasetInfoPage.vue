<template>
<div class="centered_content">
  <h1 class="content_title">{{datasetName}} DATASET DASHBOARD</h1>
  <div>
    <b-card-group deck>
      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
        <b-card-title class="bg-info">INFORMATION</b-card-title>
        <b-card-text style="font-size: 20px">{{datasetInfo}} <br><br> Number of records: {{numOfRecords}}</b-card-text>
      </b-card>

      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
        <b-card-title class="bg-info">LABEL DISTRIBUTION</b-card-title>
          <labelPieChart class="container" :datasetName="datasetName"></labelPieChart>
      </b-card>
    </b-card-group>
  </div>
  <br>
  <div>
    <b-card-group deck>
      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
        <b-card-title class="bg-info">DATA SAMPLE</b-card-title>
        <data-sample-table :datasetName="datasetName" ></data-sample-table>
      </b-card>
    </b-card-group>
  </div>
  <br>
  <div>
    <b-card-group deck>


      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
        <b-card-title class="bg-info">TOPIC DISTRIBUTION</b-card-title>
        <topics-chart style="align: center" :datasetName="datasetName" :type="type"></topics-chart>
      </b-card>
      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" class="text-center">
        <b-card-title class="bg-info">SENTIMENT DISTRIBUTION</b-card-title>
        <br>
        <br>
        <sentiment-donut-chart  class="container" :datasetName="datasetName" ></sentiment-donut-chart>
      </b-card>

    </b-card-group>
  </div>
  <br>
  <br>
</div>
</template>

<script>
import labelPieChart from "../components/labelPieChart";
import sentimentDonutChart from "../components/sentimentDonutChart";
import topicsChart from "../components/topicsChart";
import dataSampleTable from "../components/dataSampleTable";

export default {
  name: "datasetInfo",
  components: {
    labelPieChart,
    sentimentDonutChart,
    topicsChart,
    dataSampleTable
  },
  data: function () {
    return {
      datasetName: null,
      datasetInfo: null,
      numOfRecords: null,
      type: null,
    }
  },
  async created() {
    this.created();
  },
  methods: {
    async created() {
      try {
        this.datasetName = this.$route.params.datasetName;
        //this.datasetName = "MPCHI";

        const response = await this.axios.get(
                "http://127.0.0.1:5000/dataSetInfo/"+ this.datasetName
        );
        this.datasetName = this.datasetName.toUpperCase()
        var response_data = response.data;
        this.datasetInfo = response_data['datasetInfo']
        this.numOfRecords = response_data['numOfRecords']
        this.type = response_data['type']



        // this.datasetInfo = "This dataset contains health-related online news articles. The data provided contains" +
        //     " instances of: tweets, id, target and stance,\n\n where stance is one of  the following: favor, against, none.";
        // this.numOfRecords = 1553;
        //this.type = "topic";


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
    margin-top: 18px;
    margin-bottom: 18px;
  }
  .centered_content{
    margin: 20px;
    text-align: center;
  }
  .container {
    display: flex;
    justify-content: center;
  }

</style>