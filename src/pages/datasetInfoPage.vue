<template>
<div class="centered_content">
  <h1 class="content_title">  {{datasetName}} Dataset Dashboard</h1>
  <div>
    <b-card-group deck class="card">
      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Information" class="text-center">
        <b-card-text>{{datasetInfo}}</b-card-text>
      </b-card>

      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Number of records" class="text-center">
        <b-card-text>{{numOfRecords}}</b-card-text>
      </b-card>
    </b-card-group>
  </div>
  <br>
  <div>
    <b-card-group deck>
      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Data Sample (first 5 rows)" class="text-center">
        <data-sample-table :datasetName="datasetName" ></data-sample-table>
      </b-card>
    </b-card-group>
  </div>
  <br>
  <div>
    <b-card-group deck>
      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Label Distribution" class="text-center">
        <labelPieChart :datasetName="datasetName"></labelPieChart>
      </b-card>

      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Topic Distribution" class="text-center">
        <topics-chart :datasetName="datasetName" :type="type"></topics-chart>
      </b-card>
      <b-card border-variant="info" header-bg-variant="info" bg-variant="Light" text-variant="black" header="Sentiment Distribution" class="text-center">
        <sentiment-donut-chart :datasetName="datasetName" ></sentiment-donut-chart>
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
        //this.datasetName = this.$route.params.datasetName;
        this.datasetName = "MPCHI";

        const response = await this.axios.get(
                "http://127.0.0.1:5000/dataSetInfo/"+ this.datasetName
        );

        var response_data=response.data;
        this.datasetInfo=response_data['datasetInfo']
        this.numOfRecords=response_data['numOfRecords']

        // this.datasetInfo = "This dataset contains health-related online news articles. The data provided contains" +
        //     " instances of: tweets, id, target and stance,\n\n where stance is one of  the following: favor, against, none.";
        // this.numOfRecords = 1553;
        this.type = "topic";


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
  }
  .centered_content{
    margin: 20px;
    text-align: center;
  }
  .card {
    background-color: rgba(0, 0, 0, 0.1);;
  }

</style>