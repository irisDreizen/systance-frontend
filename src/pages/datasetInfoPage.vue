<template>
<div>
  <h1>{{datasetName}} Dataset Dashboard</h1>
  <div>
    <b-card-group deck>
      <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Information" class="text-center">
        <b-card-text>{{datasetInfo}}</b-card-text>
      </b-card>

      <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Number of records" class="text-center">
        <b-card-text>{{numOfRecords}}</b-card-text>
      </b-card>

      <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Size of dataset" class="text-center">
        <b-card-text>{{size}}</b-card-text>
      </b-card>

    </b-card-group>
  </div>
  <br>
  <div>
    <b-card-group deck>
      <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Data Sample (first 5 rows)" class="text-center">
        <data-sample-table :datasetName="datasetName" ></data-sample-table>
      </b-card>
    </b-card-group>
  </div>
  <br>
  <div>
    <b-card-group deck>
      <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Label Distribution" class="text-center">
        <labelPieChart :datasetName="datasetName"></labelPieChart>
      </b-card>

      <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Topic Distribution" class="text-center">
        <topics-chart :datasetName="datasetName" ></topics-chart>
      </b-card>

    </b-card-group>
  </div>
  <br>
  <div>
    <b-card-group deck>
      <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Train vs Test" class="text-center">
        <train-test-donut-chart :datasetName="datasetName"></train-test-donut-chart>
      </b-card>

      <b-card border-variant="info" bg-variant="Light" text-variant="black" header="Sentiment Distribution" class="text-center">
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
import trainTestDonutChart from "../components/trainTestDonutChart";
import dataSampleTable from "../components/dataSampleTable";

export default {
  name: "datasetInfo",
  components: {
    labelPieChart,
    sentimentDonutChart,
    trainTestDonutChart,
    topicsChart,
    dataSampleTable
  },
  data: function () {
    return {
      datasetName: null,
      datasetInfo: null,
      numOfRecords: null,
      size: '283 KB',
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


        // let formData = new FormData();
        // formData.append('ds_name', this.datasetName);
        //     "http://127.0.0.1:5000/datasetInfo/"+ this.datasetName
        // );
        // this.params.data = response.data;
        this.datasetInfo = "This dataset contains health-related online news articles. The data provided contains" +
            " instances of: tweets, id, target and stance,\n\n where stance is one of  the following: favor, against, none.";
        this.numOfRecords = 1553;


      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>